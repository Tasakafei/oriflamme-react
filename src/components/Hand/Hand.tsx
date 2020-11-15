import React, {Component, useContext, useState} from "react";
import {Button, Badge} from "react-bootstrap"
import {disconnectRequest, loginRequest} from "../../shared/web-socket/actions";
import WebSocketProvider, { WebSocketContext } from "../../shared/web-socket/WebSocket";
import {useDispatch, useSelector} from "react-redux";

function Hand() {
    return (
        <div className="hand-container">
            <h1>Hand</h1>
        </div>
    )
}
export default Hand;
