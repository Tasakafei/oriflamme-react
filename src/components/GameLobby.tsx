import React, {Component, useContext, useState} from "react";
import {Button} from "react-bootstrap"
import {loginRequest} from "../shared/web-socket/actions";
import WebSocketProvider, { WebSocketContext } from "../shared/web-socket/WebSocket";
import {useSelector} from "react-redux";

function GameLobby() {
    const [usernameInput, setUsernameInput] = useState("");
    // @ts-ignore
    const games = useSelector(state => state.lobby.games);
    const ws = useContext(WebSocketContext);
    function login () {
        // @ts-ignore
        ws.login("toto");
    }

    function logout () {
        // @ts-ignore
        ws.logout();
    }
    function createGame () {
        // @ts-ignore
        ws.createGame("test");
    }

    return (
        <div>
            <h1>Game Lobby</h1>
            <Button variant="primary" onClick={login}>Login as Toto</Button>
            <Button variant="outline-primary" onClick={createGame}>Create Game</Button>
            <Button variant="outline-secondary" onClick={logout}>Log out</Button>
            <div>
                {games.map((game:any) =>
                    <Button variant="outline-info">{game.name}</Button>
                )}
            </div>
        </div>
    )

}
export default GameLobby;
