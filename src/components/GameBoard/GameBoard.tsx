import React, {Component, useContext, useState} from "react";
import {Button, Badge, Row, OverlayTrigger, Tooltip} from "react-bootstrap"
import './GameBoard.css';
import {disconnectRequest, loginRequest} from "../../shared/web-socket/actions";
import WebSocketProvider, {WebSocketContext} from "../../shared/web-socket/WebSocket";
import {useDispatch, useSelector} from "react-redux";
import {ICard} from "../../shared/types/ICard";
import {IGamePlayer} from "../../shared/types/IGamePlayer";
import {CardKindEnum} from "../../shared/enumerations/CardKindEnum";
import Card from "../Card/Card";

function GameBoard() {
    // @ts-ignore
    const currentGameStatus = useSelector(state => state.currentGameStatus);
    // @ts-ignore
    const currentTurnPlayerName = useSelector(state => state.currentGameStatus.players.find((el: IGamePlayer) => el.id === currentGameStatus.playerTurnId).name);
    const [selected, setSelected] = useState("");

    function isActivePlayer(playerName: string) {
        return playerName === currentTurnPlayerName;
    }

    const selectCard = (cardId: string) => {
        console.log("select cardId:", cardId);
        setSelected(selected == cardId ? "" : cardId);
    };

    function isSelected(cardId: string) {
        console.log("isSelected:", cardId === selected);
        return cardId === selected;
    }

    return (
        <div>
            <div className="points-container">
                {currentGameStatus.players.map((player: IGamePlayer) => <div
                    className={"points-player-card points-player-" + player.color.toLowerCase() + (isActivePlayer(player.name) ? " points-player-active" : "")}>
                    <div>{player.name}</div>
                    <div>{player.influence} pts</div>
                </div>)}
            </div>
            <div className="status-container">
                <div>Phase : {currentGameStatus.phase.phaseName}</div>
                <div>Prompt : {currentGameStatus.phase.prompt}</div>
                <div>Round : {currentGameStatus.round.roundNumber}</div>
                <div>Player turn : {currentTurnPlayerName}</div>
            </div>
            <div className="board-container">
                <Row className="h-100">
                    <span className="boardcard-slot"/>
                    {currentGameStatus.hand.map((card: ICard) =>
                        <Card key={"boardcard" + card.cardId} isRevealed={true} onClick={selectCard} color={"yellow"}
                              kind={card.kind} id={card.cardId}
                              className={"card-game-8 " + (isSelected(card.cardId) ? "selected" : "")}/>
                    )}
                    <span className="boardcard-slot"/>
                </Row>
            </div>

            <div className="hand-container">
                <Row className="h-100">
                    {currentGameStatus.hand.map((card: ICard) =>
                        <Card key={"card" + card.cardId} isRevealed={true} onClick={selectCard} color={"yellow"}
                              kind={card.kind} id={card.cardId}
                              className={"card-game-7 " + (isSelected(card.cardId) ? "selected" : "")}/>
                    )}
                </Row>
            </div>
        </div>
    )
}

export default GameBoard;
