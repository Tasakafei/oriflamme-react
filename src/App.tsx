import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Lobby from "./components/Lobby/Lobby";
import {Provider, useSelector} from "react-redux";
import store from "./shared/web-socket/store";
import WebSocketProvider, {WebSocketContext} from "./shared/web-socket/WebSocket";
import {ToastProvider, useToasts} from 'react-toast-notifications';
import {SESSION_TOKEN} from "./shared/web-socket/localStorage";
import AuthenticationPage from "./components/AuthenticationPage/AuthenticationPage";
import GameLobby from "./components/GameLobby/GameLobby";
import GameBoard from "./components/GameBoard/GameBoard";

function App() {
    // @ts-ignore
    const sessionToken = useSelector(state => state.sessionToken);

    // @ts-ignore
    const currentGame = useSelector(state => state.currentGameName);
    // @ts-ignore
    const currentGameStatus = useSelector(state => state.currentGameStatus);
    function routePage() {
        console.log("ROUTEPAGE");
        console.log("ROUTEPAGE SESSIONTOKEN =", sessionToken);
        console.log("ROUTEPAGE CURRENTGAME =", currentGame);
        console.log("ROUTEPAGE CURRENTGAMESTATUS = ", currentGameStatus);
        if (sessionToken && sessionToken !== "") {
            if (currentGameStatus)  {
                return <GameBoard/>
            } else if (currentGame && currentGame != "") {
                return <GameLobby/>
            } else {
                return <Lobby/>
            }
        } else {
            return <AuthenticationPage/>
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                {routePage()}
            </header>
        </div>
    );
}

export default App;
