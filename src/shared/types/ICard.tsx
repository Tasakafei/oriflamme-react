import {CardKindEnum} from "../enumerations/CardKindEnum";

export interface ICard {
    cardId: string;
    playerId: string;
    revealed: boolean;
    kind: CardKindEnum;
    influence: number;
}
