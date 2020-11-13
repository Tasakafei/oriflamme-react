import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import gameReducer from "./reducer";

export default createStore(gameReducer, composeWithDevTools(applyMiddleware(thunk)));
