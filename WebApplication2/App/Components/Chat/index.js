import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ChatActions from "../../Actions/Chat/index.js";

var MessageInput = React.createClass({
    getInitialState: function() {
        return { text: ""};
    },
    handleChange: function(e) {
        this.setState({ text: e.target.value })
    },
    handleKeyDown: function(e) {
        if (e.which === 13) {
            const text = this.target.value;
            this.props.onAddMessage(text);
        }
    },
    render: function() {
        return (
            <input
                type="text" 
                placeholder={this.props.placeholder} 
                value={this.state.text} 
                onChange={this.handleChange} 
                onKeyDown={this.handleKeyDown }/>);
    }
});

var Message = props =>
    <div>
        <div>{props.dateCreated} - {props.creator}</div>
        <div>{props.message}</div>
    </div>;

var Messages = ({ messages }) =>
    <div>
        {messages.map(message => <Message 
            message={message.message} 
            creator={message.creator} 
            dateCreated={message.dateCreated}/>)}
    </div>;

var Chat = React.createClass({
    componentDidMount: function() {
        if (this.props.actions.GetMessages)
            this.props.actions.GetMessages();
    },
    handleAddMesssage: function(text) {
        if (text.length !== 0)
            this.props.actions.AddMessage(text);
    },
    render: function() {
        const { messages } = this.props;
        return(
            <div>
                <div>
                    Chat
                </div>
                <div>
                    <Messages messages={messages} />
                </div>
                <div>
                    <MessageInput 
                        onAddMessage={this.handleAddMesssage} 
                        placeholder="Enter message" />
                </div>
            </div>);
}
});

function mapStateToProps(state) {
    return {
        messages: state.messages
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ChatActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);