import React, {useContext} from "react";
import {useSelector} from "react-redux";
import {WebSocketContext} from "../../shared/web-socket/WebSocket";
import {Button, Form} from "react-bootstrap";
import {useToasts} from "react-toast-notifications";
import {SESSION_NAME} from "../../shared/web-socket/localStorage";

function AuthenticationPage() {
    let usernameInput:string = "";
    // @ts-ignore
    const games = useSelector(state => state.lobby.games);
    const ws = useContext(WebSocketContext);
    const { addToast } = useToasts();

    function login () {
        localStorage.setItem(SESSION_NAME, usernameInput);
        // @ts-ignore Ne peut pas être null
        ws.login(usernameInput)
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
