import React, { Component } from "react";
import { send } from "./UserFunctions";
import axios from "axios";
import jwt_decode from "jwt-decode";

class Chat extends Component {
  state = {
    message: "",
    sender: "",
    receiver: "",
    data: []
  };

  onChange = e => {
    console.log("e.target.name", e.target.name);
    console.log("e.target.value", e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newMessage = {
      sender: this.state.sender,
      receiver: this.state.receiver,
      message: this.state.message
    };

    console.log({ newMessage });

    send(newMessage).then(res => {
      this.props.history.push("/chat");
      this.fetchMessages();
    });

    this.setState  ({ message: ""})

  };

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);

    console.log(decoded.email);

    this.setState ({sender: decoded.email})


    axios
      .get(
        `/properties/display?role=${decoded.role}&email=${decoded.email}`
      )
      .then(response => {
        if (response.data.data[0].landlord_contact === decoded.email) {
          this.setState ({ receiver: response.data.data[0].tenant_contact })
        } else {
          this.setState ({ receiver: response.data.data[0].landlord_contact })
        }
      });

      axios
        .get(
          `/chat/history?role=${decoded.role}&email=${decoded.email}`
        )
        .then(res => {
          console.log(res.data.data);
          this.setState({ data: res.data.data });
        });

        this.fetchMessages()
        
  }

  fetchMessages() {
     const token = localStorage.usertoken;
     const decoded = jwt_decode(token);
          axios
            .get(
              `/chat/history?role=${decoded.role}&email=${decoded.email}`
            )
            .then(res => {
              console.log(res.data.data);
              this.setState({ data: res.data.data });
            });

  }

  render() {
    return (
      <div className="chat_container">
        <div className="chat_messages">
          {this.state.data.map(messages => {
            return (
              <div className="chat_message">
                <span className="chat_message_sender">{messages.sender}</span>
                <span className="chat_message_message">{messages.message}</span>
              </div>
            );
          })}
        </div>
        <div className="chat_form_wrapper">
          <form className="chat_form" noValidate onSubmit={this.onSubmit}>
            <div className="chat_form_inputWrapper">
              <input
                type="text"
                className="form-control"
                autoComplete="off"
                name="message"
                placeholder="Enter your message"
                value={this.state.message}
                onChange={this.onChange}
              />
            </div>
            <button type="submit" className="chat_form_button">
              Chat
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Chat;
