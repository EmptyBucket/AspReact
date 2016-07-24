import {combineReducers} from "redux";
import messages from "./Chat/index.js";

const rootReducer = combineReducers({
    messages
});

export default rootReducer;