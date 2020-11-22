import {
    GAME_CREATED,
    PLAYER_SESSION_TOKEN,
    PLAYER_JOINED_GAME,
    PLAYER_JOINED_LOBBY,
    DISCONNECTED,
    PLAYER_LEFT_GAME, GAME_DELETED, GAME_STATUS, joinGameRequest
} from './actions';
import {SESSION_TOKEN} from "./localStorage";
import {CardKindEnum} from "../enumerations/CardKindEnum";
import {IState} from "../types/IState";
import {IGame} from "../types/IGame";

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
    if (typeof state === 'undefined') {
        console.log("REDUCER.INIT");
        return initialState;
    }
    switch (action.type){
        case PLAYER_SESSION_TOKEN:
            if (action.data.sessionToken) {
                localStorage.setItem('sessionToken', action.data.sessionToken);
            }
            state.lobby = action.data.lobby;
            state.lobby.games = action.data.lobby.games;
            state.currentPlayerId = action.data.recipientId;
            state.sessionToken = action.data.sessionToken;
            const currentGame:IGame[] = state.lobby.games.filter((game:IGame) => {
                return game.players.includes(state.currentPlayerId )});
            if ((!state.currentGameName || state.currentGameName==="") && currentGame && currentGame.length > 0) {
                state.currentGameName=currentGame[0].name;
            }
            break;

        case PLAYER_JOINED_LOBBY:
            if (state.lobby && action.data.recipientId !== action.data.player.id) {
                state.lobby.players.push(action.data.player);
            }
            break;

        case GAME_CREATED:
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
        case GAME_DELETED:
            if (state.lobby) {
                if (action.data.gameName === state.currentGameName) {
                    state.currentGameName = "";
                }
                state.lobby.games.splice(state.lobby.games.findIndex(item => item.name === action.data.gameName), 1)
            }
            break;
        case GAME_STATUS:
            if (state) {
                state.currentGameStatus = action.data
            }
            break;

        // TODO ROUND_STARTING, PHASE_STARTING
        // TODO Gerer le nouveau leader si leader actuel part
    }

    return state
}
