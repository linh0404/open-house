import React, { Component } from 'react'
import { send } from './UserFunctions';

class Chat extends Component {
    state = {
        message: '',
        sender: '',
        receiver: '',
        data: [],
    }

    onChange = (e) => {
        console.log('e.target.name', e.target.name)
        console.log('e.target.value', e.target.value)
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault()

        const newMessage = {
            sender: 'sender',
            receiver: 'receiver', 
            message: this.state.message,
        }

        console.log({ newMessage })

        send(newMessage).then(res => {
            this.props.history.push('/chat')
        })
    }
    

    render() {
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
                </form>
            </div>
                <button type="submit" className="btn-continue" onClick={this.closeModalHandler}>Submit</button>
            </div>
        )
    }
}

export default Chat;