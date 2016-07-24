import React from "react";
import { Provider } from "react-redux";
import Chat from "./Chat/index.js";

export default React.createClass({
    render: function () {
        const { store } = this.props;
        return (
            <Provider store={store}>
                <Chat/>
            </Provider>);
    }
});