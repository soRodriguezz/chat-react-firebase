import React, { Component } from 'react';

class ChatRoom extends Component {

    constructor() {
        super();
        this.state = {
            message: '',
            messages: [
               // { id: 0, text: '1' },
                //{ id: 1, text: '12' },
                //{ id: 2, text: '123' }
            ]
        }
    }

    updateMessage(e){
        this.setState({message: e.target.value});
        console.log(this.state.message);
    }

    componentDidMount(){
        window.firebase.database().ref('/messages').on('value', snapshot => {
            const currentessages = snapshot.val();
            if(currentessages != null){
                this.state({
                    messages: currentessages
                })
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const list = this.state.messages;
        const newMessage = {
            id: this.state.messages.length,
            text: this.state.message
        };

        list.push(newMessage);
        this.setState({ messages: list });
        this.setState({ message: '' });
    }

    render() {

        const { messages } = this.state;
        const messageList = messages.map(message => {
            return <li key={message.id}>{message.text}</li>
        })

        return (
            <div>
                <ul>
                    {messageList}
                </ul>

                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" value={this.state.message} onChange={ this.updateMessage.bind(this) }/>

                    <button>
                        send
                    </button>
                </form>
            </div>
        )
    }

}

export default ChatRoom;