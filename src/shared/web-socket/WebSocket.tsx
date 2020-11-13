import { WS_BASE } from "../../config";
import { useDispatch } from "react-redux";
import React, {createContext} from "react";
import {SESSION_TOKEN} from "./localStorage";
import {createGameRequest, loginRequest} from "./actions";

const WebSocketContext = createContext(null);

export { WebSocketContext }

export default function ( {children}:any ) {
    let socket:any;
    let ws:any;

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

    if (!socket) {
        console.log('CONNECTING TO WS :', WS_BASE);
        socket = new WebSocket(WS_BASE);
        console.log('SOCKET:', socket);

        socket.onmessage = (message:any) => {
            const parsed = JSON.parse(message.data);
            console.log("ONMESSAGE:", parsed);
            dispatch({type: parsed.event, data: parsed});
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
            createGame
        }
    }

    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    )
}
