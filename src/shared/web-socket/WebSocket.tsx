import { WS_BASE } from "../../config";
import { useDispatch } from "react-redux";
import React, {createContext} from "react";
import {SESSION_TOKEN} from "./localStorage";
import {createGameRequest, joinGameRequest, leaveGameRequest, loginRequest} from "./actions";
import {useToasts} from "react-toast-notifications";

const WebSocketContext = createContext(null);

export { WebSocketContext }
const WARNINGS = {
    MAX_PLAYER_LIMIT: (event:any) => "Le nombre de joueurs maximum ("+event.maxNbPlayer+") pour la partie est déjà atteint",
    NOT_ENOUGH_PLAYERS: (event:any) => "La partie ne peut pas commencer sans un minimum de joueurs ("+event.minNbPlayer+")",
    GAME_ALREADY_STARTED: (event:any) => "La partie "+ event.gameName +" a déjà commencée :(",
    GAME_ALREADY_EXISTS: (event:any) => "La partie "+event.gameName+" existe déjà",
};
const SYSTEM_ERRORS = {
    PARAMETER_MISSING: (event:any) => "Le param "+event.parameter+" est manquant à l'action " + event.action,
    INVALID_JSON_SYNTAX: (event:any) => "Syntaxe JSON invalide : "+event.data,
    NO_SUCH_ACTION: (event:any) => "L'action "+event.action +" est inconnue",
    NO_SUCH_LOGGED_PLAYER:  (event:any) => "L'utilisateur de sessionToken "+event.sessionToken +" est inconnu"

};
export default function ( {children}:any ) {
    let socket:any;
    let ws:any;
    const { addToast } = useToasts();
    const dispatch = useDispatch();
    const send = (message: any) => {
        message.sessionToken = localStorage.getItem(SESSION_TOKEN);
        console.log("EMIT EVENT:", message);
        socket.send(JSON.stringify(message));
    };

    const login = (username: string) => {
        send(loginRequest(username));
    };
    const logout = () => {
        localStorage.removeItem(SESSION_TOKEN);
    };
    const createGame = (name: string) => {
        send(createGameRequest(name))
    };
    const joinGame = (gameName: string) => {
        send(joinGameRequest(gameName));
    };
    const leaveGame = (gameName: string) => {
        send(leaveGameRequest(gameName))
    };

    if (!socket) {
        console.log('CONNECTING TO WS :', WS_BASE);
        socket = new WebSocket(WS_BASE);
        console.log('SOCKET:', socket);

        socket.onmessage = (message:any) => {
            const parsed = JSON.parse(message.data);
            console.log("ONMESSAGE:", parsed);
            if (Object.keys(WARNINGS).includes(parsed.event)) {
                // @ts-ignore
                addToast(WARNINGS[parsed.event](parsed), {appearance: 'warning'});
            } else if (Object.keys(SYSTEM_ERRORS).includes(parsed.event)) {
                // @ts-ignore
                addToast(WARNINGS[parsed.event](parsed), {appearance: 'error'});
            } else {
                dispatch({type: parsed.event, data: parsed});
            }
        };
        socket.onclose = (message:any) => {
            console.log("ONCLOSE:", message)
        };
        socket.onopen = (message:any) => {
            console.log("ONOPEN:", message)
        };

        ws = {
            socket: socket,
            login,
            logout,
            createGame,
            joinGame,
            leaveGame
        }
    }
    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    )
}
