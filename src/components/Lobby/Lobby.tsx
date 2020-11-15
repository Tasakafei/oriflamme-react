import React, {Component, useContext, useState} from "react";
import {Button, Badge, InputGroup, FormControl, Form, Col, Row} from "react-bootstrap"
import {disconnectRequest, loginRequest} from "../../shared/web-socket/actions";
import WebSocketProvider, {WebSocketContext} from "../../shared/web-socket/WebSocket";
import {useDispatch, useSelector} from "react-redux";

function Lobby() {
    // @ts-ignore
    const [collapseCreation, setCollapseCreation] = useState(true);
    let gameNameCreation = "";
    // @ts-ignore
    const games = useSelector(state => state.lobby.games);
    const state = useSelector(state => state);
    const ws = useContext(WebSocketContext);
    const dispatch = useDispatch();


    function logout() {
        // @ts-ignore
        ws.logout();
        dispatch(disconnectRequest());
    }

    function createGame() {
        // @ts-ignore
        ws.createGame(gameNameCreation);
        gameNameCreation="";
    }

    function joinGame(gameName: string) {
        // @ts-ignore
        ws.joinGame(gameName);
    }

    function switchCollapseCreation() {
        setCollapseCreation(!collapseCreation);
    }


    return (
        <div className={"width-100"}>
            <h1>Lobby</h1>

            <div>
                {games.map((game: any) =>
                    <Button variant="outline-info" onClick={() => joinGame(game.name)}>{game.name} <Badge
                        variant="light">{game.players.length} / {game.maxPlayers} <i
                        className="fas fa-user"/></Badge></Button>
                )}
            </div>
            <div className="commands width-50">

                <Form>
                    <Row>
                        <Col>
                            {collapseCreation ?
                                <Button variant="outline-primary" onClick={switchCollapseCreation}>Create
                                    Game</Button> :
                                <InputGroup>
                                    <FormControl
                                        placeholder="Create : game name"
                                        aria-label="Create : game name"
                                        aria-describedby="basic-addon2"
                                        onChange={e => gameNameCreation = e.target.value}
                                    />
                                    <InputGroup.Append className="mb-3">
                                        <Button variant="outline-secondary" onClick={createGame}><i
                                            className="fas fa-check"/></Button>
                                        <Button variant="outline-secondary" onClick={switchCollapseCreation}><i
                                            className="fas fa-times"/></Button>
                                    </InputGroup.Append>
                                </InputGroup>}
                        </Col>
                        <Col>
                            <Button variant="outline-secondary" onClick={logout}>Log out</Button>
                        </Col>
                    </Row>
                </Form>
                <InputGroup>


                </InputGroup>

            </div>
        </div>
    )

}

export default Lobby;
