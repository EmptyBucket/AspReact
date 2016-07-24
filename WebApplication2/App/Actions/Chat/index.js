import * as TypesActions from "./actionsTypes.js";
import $ from "jquery"

const apiUrl = "http://localhost:60569/Chat";
const addMessageUrl = apiUrl + "/AddMessage";
const getMessagesUrl = apiUrl + "/GetMessages";

export function AddMessage(message) {
    return (dispatch, getState) => {
        dispatch(AddMessageRequest(message));
        $.post(addMessageUrl, message)
            .done((creator, dateCreated, message, id) => 
                dispatch(AddMessageSuccess(creator, dateCreated, message, id)))
            .fail(() => dispatch(AddMessageFail()));
    }
}

export function GetMessages() {
    return (dispatch, getState) => {
        dispatch(GetMessagesRequest());
        $.post(getMessagesUrl)
            .done((messages) => dispatch(GetMessagesSuccess(messages)))
            .fail(() => dispatch(GetMessagesFail));
    }
}

function AddMessageRequest(message) {
    return {
        type: TypesActions.ADD_MESSAGE_REQUEST,
        message: message
    }
}

function AddMessageSuccess(creator, dateCreated, message, id) {
    return {
        type: TypesActions.ADD_MESSAGE_SUCCESS,
        creator: creator,
        dateCreated: dateCreated,
        message: message,
        id: id
    }
}

function AddMessageFail() {
    return {
        type: TypesActions.ADD_MESSAGE_FAIL
    }
}

function GetMessagesRequest() {
    return {
        type: TypesActions.GET_MESSAGES_REQUEST
    }
}

function GetMessagesSuccess(messages) {
    return{
        type: TypesActions.GET_MESSAGES_SUCCESS,
        messages: messages
    }
}

function GetMessagesFail() {
    return {
        type:TypesActions.GET_MESSAGES_FAIL
    }
}

