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
      sender: "sender",
      receiver: "receiver",
      message: this.state.message
    };

    console.log({ newMessage });

    send(newMessage).then(res => {
      this.props.history.push("/chat");
    });
  };

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);

    // fetch data
    axios
      .get(
        `http://localhost:5000/properties/display?role=${decoded.role}&email=${decoded.email}`
      )
      .then(data => {
        this.setState({
          data: data.data.data
        });
      });
  }

  render() {
    console.log(this.state.data);
    return (
      <div>
        <div className="chat-container">
          <tbody>
            <tr>
              <td>Sender</td>
              <td>Message</td>
              {/* INSERT TABLE DATA HERE */}
            </tr>
          </tbody>
        </div>
        <div className="message-container">
          <form noValidate onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="message"
                placeholder="Enter your message"
                value={this.state.message}
                onChange={this.onChange}
              />
            </div>
            <button type="submit" className="btn-continue">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Chat;
