import {
    GAME_CREATED,
    PLAYER_SESSION_TOKEN,
    PLAYER_JOINED_GAME,
    PLAYER_JOINED_LOBBY,
    DISCONNECTED,
    PLAYER_LEFT_GAME
} from './actions';
import {SESSION_TOKEN} from "./localStorage";
import {CardKindEnum} from "../enumerations/CardKindEnum";
import {IState} from "../types/IState";

const initialState = {
    lobby: {
        players: [],
        games: []
    },
    currentPlayerId: "",
    currentGameName: "",
    sessionToken: localStorage.getItem(SESSION_TOKEN) as string
};


export default function gameReducer(state: IState|undefined, action: any) {

    console.log("REDUCER ACTION", action);
    console.log("REDUCER STATE", state);
    if (typeof state === 'undefined') {
        console.log("REDUCER.INIT");
        return initialState;
    }
    switch (action.type){
        case PLAYER_SESSION_TOKEN:
            console.log("REDUCER.LOGIN_SUCCESS", action);
            if (action.data.sessionToken) {
                localStorage.setItem('sessionToken', action.data.sessionToken);
            }
            state.lobby = action.data.lobby;
            state.lobby.games = action.data.lobby.games;
            state.currentPlayerId = action.data.recipientId;
            state.sessionToken = action.data.sessionToken;
            break;

        case PLAYER_JOINED_LOBBY:
            console.log("REDUCER.PLAYER_JOINED_LOBBY");
            if (state.lobby && action.data.recipientId !== action.data.player.id) {
                console.log("REDUCER.LOBBYOK");
                state.lobby.players.push(action.data.player);
            }
            break;

        case GAME_CREATED:
            console.log("REDUCER.GAME_CREATED");
            if (state.lobby) {
                state.lobby.games.push(action.data.game);
            }
            break;
        case PLAYER_JOINED_GAME:
            if (state.lobby) {
                let game = state.lobby.games.find((element:IGame) => element.name === action.data.gameName);
                if (game !== undefined)
                    game.players.push(action.data.playerId);
                if (state.currentPlayerId === action.data.playerId) {
                    state.currentGameName = action.data.gameName;
                }
            }
            break;
        case DISCONNECTED:
            state.sessionToken= "";
            break;
        case PLAYER_LEFT_GAME:
            if (state.lobby) {
                let game = state.lobby.games.find((element:IGame) => element.name === action.data.gameName);
                if (game !== undefined)
                    game.players = game.players.filter((player:string) => player !== action.data.playerId);
                if (state.currentPlayerId === action.data.playerId) {
                    state.currentGameName = "";
                }
            }
            break;
    }

    return state
}
