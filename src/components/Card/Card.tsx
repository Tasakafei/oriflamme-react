import React from "react";
import {Image, OverlayTrigger, Tooltip} from "react-bootstrap"
import "./Card2.css"
import {CardKindEnum} from "../../shared/enumerations/CardKindEnum";

interface IProps {
    isRevealed?: boolean;
    color?: string;
    kind: CardKindEnum;
    id: string;
    className?: string;
    onClick?: any;
}

function Card(props: IProps) {
    let elem;
    if (CardKindEnum.EMPTY === props.kind) {
        elem = <div onClick={() => props.onClick(props.id)} className={"card-game card-empty "+ props.className} key={props.id}> test</div>
    } else {
        elem = <Image onClick={() => props.onClick(props.id)} className={"card-game "+ props.className} key={props.id} src={"./resources/"+props.color+"_"+props.kind.toLowerCase()+".png"} rounded />
    }



    return (
        <OverlayTrigger
            key={"overlayTriggerToolTip-" + props.id}
            placement="top"
            overlay={
                <Tooltip id={"tooltip-" + props.id}>
                    {props.kind}
                </Tooltip>
            }
        >
            {elem}
        </OverlayTrigger>
    )

/*        <div
    key={props.id}
    style={{width: '8rem'}}
    className={"mb-1 card-game-"+props.color+" align-self-center card-game"}>
        <div className="card-game-header">{getCardIcon(props.kind, "fa-lg")}</div>
<div className="card-game-footer">
<div className="card-game-footer-right">
X
</div>
<div className="card-game-footer-left">{getCardIcon(props.kind, "fa-xs")}</div>
</div>
</div>*/
}

export default Card;
