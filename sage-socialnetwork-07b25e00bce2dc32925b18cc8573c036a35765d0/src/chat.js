import React from "react";
import { connect } from "react-redux";
import { initSocket } from "./socket";
import { showChat, newMessage } from "./actions";
import ProfilePic from "./profilepic";

export class Chat extends React.Component {
  constructor() {
    super();
    this.sendMessage = this.sendMessage.bind(this);
  }
  componentDidMount() {
    !this.props.allMessages && this.props.dispatch(showChat());
    console.log("Chat componentDidMount!");
  }

  componentDidUpdate() {
    if (!this.elem) {
      return;
    }
    this.elem.scrollTop = this.elem.scrollHeight - this.elem.clientHeight;
  }
  sendMessage(e) {
    console.log("sendMessage in chat component");
    let socket = initSocket();

    if (e.which == 13) {
      let message = e.target.value;
      console.log("message: ", message);
      socket.emit("newMessage", message);
      e.target.value = "";
    }
  }

  render() {
    const { allMessages } = this.props;
    if (!allMessages) {
      return null;
    }
    const renderChat = (
      <div>
        <h1 className="chat-name">Chatroom</h1>
        <div
          className="chat-messages-container"
          ref={elem => (this.elem = elem)}
        >
          {this.props.allMessages.map((message, idx) => (
            <div key={idx} className="single-message">
              <div>
                <p id="chat-date">{changeDate(message.created_at)}</p>
                <p id="chat-names">
                  {message.firstname} {message.lastname}:{" "}
                  <span id="chat-message">{message.chat_message}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
        <textarea
          className="chat-textarea"
          placeholder="chat away!"
          onKeyDown={this.sendMessage}
        />
      </div>
    );

    return (
      <div>
        {!allMessages.length && <h1>let's chat</h1>}
        {!!allMessages.length && renderChat}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allMessages: state.allMessages
  };
};

export default connect(mapStateToProps)(Chat);

function changeDate(date) {
  const dateFormat = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  };
  return new Date(date).toLocaleDateString("en-EN", dateFormat);
}
