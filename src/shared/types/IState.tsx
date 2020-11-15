import {ILobby} from "./ILobby";
import {IGameStatus} from "./IGameStatus";

export interface IState{
    lobby: ILobby;
    currentPlayerId: string;
    currentGameName: string;
    currentGameStatus?: IGameStatus;
    sessionToken: string;
}
