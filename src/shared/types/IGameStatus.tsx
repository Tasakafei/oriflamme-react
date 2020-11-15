import {IGamePlayer} from "./IGamePlayer";
import {ICard} from "./ICard";
import {IBoard} from "./IBoard";
import {IRound} from "./IRound";
import {IPhase} from "./IPhase";

export interface IGameStatus {
    players: IGamePlayer[];
    hand: ICard;
    board: IBoard;
    phase: IPhase;
    round: IRound;
    playerTurnId: string;
}
