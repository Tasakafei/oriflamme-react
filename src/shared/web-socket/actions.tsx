// These are our action types
export const LOGIN = "LOGIN";
export const PLAYER_SESSION_TOKEN = "PLAYER_SESSION_TOKEN";
export const PLAYER_JOINED_LOBBY = "PLAYER_JOINED_LOBBY";
export const GAME_CREATED = "GAME_CREATED";
export const CREATE_GAME = "CREATE_GAME";
export const JOIN_GAME = "JOIN_GAME";
export const LEAVE_GAME = "LEAVE_GAME";
export const START_GAME = "START_GAME";
export const PLAYER_JOINED_GAME = "PLAYER_JOINED_GAME";
export const PLAYER_LEFT_GAME = "PLAYER_LEFT_GAME";
export const GAME_DELETED = "GAME_DELETED";
export const GAME_STATUS = "GAME_STATUS";
export const DISCONNECTED = "DISCONNECTED";
export function loginRequest(name: string) {
    return {
        action: LOGIN,
        name: name
    }
}

export function createGameRequest(name: any) {
    return {
        action: CREATE_GAME,
        gameName: name
    }
}

export function joinGameRequest(gameName: any) {
    return {
        action: JOIN_GAME,
        gameName: gameName
    }
}
export function leaveGameRequest(gameName: any) {
    return {
        action: LEAVE_GAME,
        gameName: gameName
    }
}
export function startGameRequest(gameName: any) {
    return {
        action: START_GAME,
        gameName: gameName
    }
}

export function disconnectRequest() {
    return {
        type: DISCONNECTED,
    }
}


// // Now we define actions
// export function createRoomRequest(){
//     return {
//         type: CREATE_ROOM_REQUEST
//     }
// }
//
// export function createRoomSuccess(payload){
//     return {
//         type: CREATE_ROOM_SUCCESS,
//         payload
//     }
// }
//
// export function createRoomError(error){
//     return {
//         type: CREATE_ROOM_ERROR,
//         error
//     }
// }
//
// export function createRoom(roomName) {
//     return async function (dispatch) {
//         dispatch(createRoomRequest());
//         try{
//             const response = await axios.get(`${API_BASE}/room?name=${roomName}`)
//             dispatch(createRoomSuccess(response.data));
//         }catch(error){
//             dispatch(createRoomError(error));
//         }
//     }
// }
//
//
// export const JOIN_ROOM_REQUEST = "JOIN_ROOM_REQUEST"
// export const JOIN_ROOM_SUCCESS = "JOIN_ROOM_SUCCESS"
// export const JOIN_ROOM_ERROR = "JOIN_ROOM_ERROR"
//
// export function joinRoomRequest(){
//     return {
//         type: JOIN_ROOM_REQUEST
//     }
// }
//
// export function joinRoomSuccess(payload){
//     return {
//         type: JOIN_ROOM_SUCCESS,
//         payload
//     }
// }
//
// export function joinRoomError(error){
//     return {
//         type: JOIN_ROOM_ERROR,
//         error
//     }
// }
//
// export function joinRoom(roomId) {
//     return async function (dispatch) {
//         dispatch(joinRoomRequest());
//         try{
//             const response = await axios.get(`${API_BASE}/room/${roomId}`)
//             dispatch(joinRoomSuccess(response.data));
//         }catch(error){
//             dispatch(joinRoomError(error));
//         }
//     }
// }
//
// export const SET_USERNAME = "SET_USERNAME"
//
// export function setUsername(username){
//     return {
//         type: SET_USERNAME,
//         username
//     }
// }
//
// export const SEND_MESSAGE_REQUEST = "SEND_MESSAGE_REQUEST"
// export const UPDATE_CHAT_LOG = "UPDATE_CHAT_LOG"
//
// export function updateChatLog(update){
//     return {
//         type: UPDATE_CHAT_LOG,
//         update
//     }
// }
