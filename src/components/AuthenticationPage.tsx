import React, {useContext, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {WebSocketContext} from "../shared/web-socket/WebSocket";
import {Badge, Button, Form} from "react-bootstrap";
import {disconnectRequest} from "../shared/web-socket/actions";

function AuthenticationPage() {
    let usernameInput:string = "";
    // @ts-ignore
    const games = useSelector(state => state.lobby.games);
    const ws = useContext(WebSocketContext);
    function login () {
        console.log(usernameInput);
        // @ts-ignore
        ws.login(usernameInput);
    }

    return (
        <div>
            <i>Vous vous approchez de l'arène</i>
            <h2>Soldat : Halte-là ! Qui va là ? </h2>
            <Form>
                <Form.Group controlId="formUsername">
                    <Form.Label></Form.Label>
                    <Form.Control type="text" placeholder="Entrez votre nom" onChange={e => usernameInput = e.target.value}/>
                    <Form.Text className="text-muted">
                        (T'inquiètes, on n'en fera rien)
                    </Form.Text>
                    <Button variant="primary" onClick={login}>Se connecter</Button>
                </Form.Group>
            </Form>

        </div>
    )

}
export default AuthenticationPage;
