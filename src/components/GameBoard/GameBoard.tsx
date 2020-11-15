import React, {Component, useContext, useState} from "react";
import {Button, Badge, Card, Row, OverlayTrigger, Tooltip} from "react-bootstrap"
import './GameBoard.css';
import {disconnectRequest, loginRequest} from "../../shared/web-socket/actions";
import WebSocketProvider, {WebSocketContext} from "../../shared/web-socket/WebSocket";
import {useDispatch, useSelector} from "react-redux";
import {ICard} from "../../shared/types/ICard";
import {IGamePlayer} from "../../shared/types/IGamePlayer";
import {CardKindEnum} from "../../shared/enumerations/CardKindEnum";

function GameBoard() {
    // @ts-ignore
    const currentGameStatus = useSelector(state => state.currentGameStatus);

    // @ts-ignore
    const currentTurnPlayerName = useSelector(state => state.currentGameStatus.players.find((el: IGamePlayer) => el.id === currentGameStatus.playerTurnId).name);

    function getCardIcon(cardKind: CardKindEnum, size:string) {
        switch (cardKind) {
            case CardKindEnum.ASSASSINAT:
                return (<i className={"fas fa-user-ninja "+size}/>);
            case CardKindEnum.CHANGEFORME:
                return (<i className={"fas fa-splotch "+size}/>);
            case CardKindEnum.ESPION:
                return (<i className={"fas fa-user-secret "+size}/>);
            case CardKindEnum.DECRET_ROYAL:
                return (<i className={"fas fa-people-arrows "+size}/>);
            case CardKindEnum.ARCHER:
                return (<i className={"fas fa-bullseye "+size}/>);
            case CardKindEnum.EMBUSCADE:
                return (<i className={"fas fa-biohazard "+size}/>);
            case CardKindEnum.SOLDAT:
                return (<i className={"fas fa-shield-alt "+size}/>);
            case CardKindEnum.COMPLOT:
                return (<i className={"fas fa-grin-squint-tears "+size}/>);
            case CardKindEnum.SEIGNEUR:
                return (<i className={"fas fa-users "+size}/>);
            case CardKindEnum.HERITIER:
                return (<i className={"fas fa-crown "+size}/>);

        }


    }

    function isActivePlayer(playerName:string) {
        return playerName === currentTurnPlayerName;
    }
    return (
        <div>
            <div className="points-container">
                {currentGameStatus.players.map((player:IGamePlayer) => <div className={"points-player-card points-player-"+player.color.toLowerCase() + (isActivePlayer(player.name) ? " points-player-active" : "")}><div>{player.name}</div><div>{player.influence} pts</div></div>)}
            </div>
            <div className="status-container">
                <div>Phase : {currentGameStatus.phase.phaseName}</div>
                <div>Prompt : {currentGameStatus.phase.prompt}</div>
                <div>Round : {currentGameStatus.round.roundNumber}</div>
                <div>Player turn : {currentTurnPlayerName}</div>
            </div>
            <div className="board-container">

            </div>
            <div className="hand-container">
                <Row className="h-100">
                    {currentGameStatus.hand.map((card: ICard) =>
                        <OverlayTrigger
                            key={"overlayTriggerToolTip-"+card.cardId}
                            placement="top"
                            overlay={
                                <Tooltip id={"tooltip-"+card.cardId}>
                                    {card.kind}
                                </Tooltip>
                            }
                        >
                            <div
                            key={card.cardId}
                            style={{width: '8rem'}}
                            className="mb-1 bg-purple align-self-center game-card">
                            {getCardIcon(card.kind, "fa-lg")}
                            <div className="card-game-footer">
                                <div className="card-game-footer-right">X pts</div>
                                <div className="card-game-footer-left">{getCardIcon(card.kind, "fa-xs")}</div>
                            </div>
                        </div>
                        </OverlayTrigger>
                    )}
                </Row>
            </div>
        </div>
    )
}

export default GameBoard;
