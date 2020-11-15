import {PhaseEnum} from "../enumerations/PhaseEnum";

export interface IPhase {
    phaseName: PhaseEnum;
    activeCardId: string | null;
    prompt: PhaseEnum;
}
