import React, {Component, useContext, useState} from "react";
import {Button, Badge} from "react-bootstrap"
import {disconnectRequest, loginRequest} from "../shared/web-socket/actions";
import WebSocketProvider, { WebSocketContext } from "../shared/web-socket/WebSocket";
import {useDispatch, useSelector} from "react-redux";

function Lobby() {
    // @ts-ignore
    const games = useSelector(state => state.lobby.games);
    const state = useSelector( state => state);
    const ws = useContext(WebSocketContext);
    const dispatch = useDispatch();

    function logout () {
        // @ts-ignore
        ws.logout();
        dispatch(disconnectRequest());
    }
    function createGame () {
        // @ts-ignore
        ws.createGame("test");
    }
    function joinGame(gameName: string) {
        // @ts-ignore
        ws.joinGame(gameName);
    }

    return (
        <div>
            <h1>Lobby</h1>

            <div>
                {games.map((game:any) =>
                    <Button variant="outline-info" onClick={() => joinGame(game.name)}>{game.name} <Badge variant="light">{game.players.length} / {game.maxPlayers} <i className="fas fa-user"/></Badge></Button>
                )}
            </div>
            <div className="commands">
                <Button variant="outline-primary" onClick={createGame}>Create Game</Button>
                <Button variant="outline-secondary" onClick={logout}>Log out</Button>
            </div>
        </div>
    )

}
export default Lobby;
