import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from "./Reducers/index.js";
import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/app.js";

const store = createStore(RootReducer, applyMiddleware(thunk));

ReactDOM.render(<App store={store}/>, document.getElementById("container"));

