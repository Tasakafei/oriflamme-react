import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Lobby from "./components/Lobby";
import {Provider, useSelector} from "react-redux";
import store from "./shared/web-socket/store";
import WebSocketProvider, {WebSocketContext} from "./shared/web-socket/WebSocket";
import {ToastProvider, useToasts} from 'react-toast-notifications';
import {SESSION_TOKEN} from "./shared/web-socket/localStorage";
import AuthenticationPage from "./components/AuthenticationPage";
import GameLobby from "./components/GameLobby";

function App() {
    // @ts-ignore
    const sessionToken = useSelector(state => state.sessionToken);

    // @ts-ignore
    const currentGame = useSelector(state => state.currentGameName);
    function routePage() {
        console.log("SESSIONTOKEN:", sessionToken)
        if (sessionToken && sessionToken !== "") {
            if (currentGame && currentGame != "") {
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
                <img src={logo} className="App-logo" alt="logo"/>
                {routePage()}
            </header>
        </div>
    );
}

// Hook
function useLocalStorage(key: string, initialValue: any) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    });

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value: (arg0: any) => any) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value(storedValue);
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };

    return [storedValue, setValue];
}

export default App;
