import * as ActionsTypes from "../../Actions/Chat/actionsTypes.js"

const initialState = [];

export default function(state = initialState, action) {
    switch (action.type) {
    case ActionsTypes.ADD_MESSAGE_SUCCESS:
        return [
            {
                id: action.id,
                creator: action.creator,
                dateCreated: action.dateCreated,
                message: action.message
            }, ...state];
    case ActionsTypes.GET_MESSAGES_SUCCESS:
        return action.messages.map(message => {
            return {
                id: message.Id, 
                creator: message.Creator,
                dateCreated: message.DateCreated,
                message: message.Message}});
    default:
        return state;
    }
}