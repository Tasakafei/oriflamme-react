import {IPlayer} from "./IPlayer";
import {IGame} from "./IGame";

export interface ILobby {
    players: IPlayer[];
    games: IGame[] ;
}
