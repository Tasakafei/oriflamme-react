import {IPlayer} from "./IPlayer";

export interface IGamePlayer extends IPlayer {
    color: string;
    influence: number;
}
