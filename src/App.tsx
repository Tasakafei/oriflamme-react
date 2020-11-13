import React from 'react';
import logo from './logo.svg';
import './App.css';
import GameLobby from "./components/GameLobby";
import {Provider} from "react-redux";
import store from "./shared/web-socket/store";
import WebSocketProvider, { WebSocketContext } from "./shared/web-socket/WebSocket"

function App() {
  return (
      <Provider store={store}>
        <WebSocketProvider>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <GameLobby/>
            </header>
          </div>
        </WebSocketProvider>
      </Provider>

  );
}

export default App;
