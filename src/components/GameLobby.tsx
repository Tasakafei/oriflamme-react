import React, {Component, useContext, useState} from "react";
import {Button, Badge} from "react-bootstrap"
import {loginRequest} from "../shared/web-socket/actions";
import WebSocketProvider, { WebSocketContext } from "../shared/web-socket/WebSocket";
import {useSelector} from "react-redux";

function GameLobby() {
    // @ts-ignore
    const currentGame = useSelector(state => state.currentGameName);
    // @ts-ignore
    const game = useSelector(state => state.lobby.games.find((game:any) => game.name == currentGame));
    const players = useSelector( state => {
        // @ts-ignore

        // @ts-ignore
        return state.lobby.players.filter((player:any) => game.players.includes(player.id))
    });
    const ws = useContext(WebSocketContext);

    function leaveGame() {
        // @ts-ignore
        ws.leaveGame(currentGame);
    }

    function startGame() {
        // @ts-ignore
        ws.startGame(currentGame);
    }
    if (currentGame) {
        return (
            <div>
                <h1>Game Lobby : {game.name}</h1>

                <h2>Players :</h2>
                {players.map((player:any) => <div key={player.id}>{player.name} {player.id === game.leaderId && <i className="fas fa-crown"/> }</div>)}

                <div className="commands">
                    <Button variant="outline-success" onClick={startGame}>Start Game</Button>
                    <Button variant="outline-danger" onClick={leaveGame}>Leave Game</Button>

                </div>
            </div>
        )
    } else {
        return (<h1>Soldat : Comment vous avez fait pour vous retrouver là ?</h1>)
    }


}
export default GameLobby;
