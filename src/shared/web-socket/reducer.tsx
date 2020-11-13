import {GAME_CREATED, LOGIN_SUCCESS, PLAYER_JOINED_LOBBY} from './actions';


interface IState{
    lobby: ILobby;
}

interface ILobby {
    players: IPlayer[];
    games: IGame[] ;
}

interface IPlayer {
    id: string;
    name: string;
    logged: boolean;
}

interface IGame {
    name: string;
    leaderId: string;
    players: string[];
    minPlayers: number;
    maxPlayers: number;
}

const initialState = {
    lobby: {
        players: [],
        games: []
    }
};
export default function gameReducer(state: IState|undefined, action: any) {
    console.log("REDUCER ACTION", action);
    console.log("REDUCER STATE", state);
    if (typeof state === 'undefined') {
        console.log("REDUCER.INIT");
        return initialState;
    }
    switch (action.type){
        case LOGIN_SUCCESS:
            console.log("REDUCER.LOGIN_SUCCESS");
            if (action.data.sessionToken) {
                localStorage.setItem('sessionToken', action.data.sessionToken);
            }
            state.lobby = action.data.lobby;
            state.lobby.games = action.data.lobby.games;
            break;

        case PLAYER_JOINED_LOBBY:
            console.log("REDUCER.PLAYER_JOINED_LOBBY");
            if (state.lobby) {
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
    }

    return state
}
