import React, { Component } from "react";
import "./Home.scss";
import axios from "axios";
import { API } from "../../config/config";



//Components
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import WriteMessage from "../../components/WriteMessage/WriteMessage";
import MessageBox from "../../components/MessageBox/MessageBox";
import Notifier from "../../components/Notifier/Notifier";



class Home extends Component {
  state = {
    success: [],
    errors: [],
    messages: []
  };

  componentWillMount = () => {
    this.getMessages();
  } 

  getMessages = async () => {
    let response = await axios.post(`${API}/messages/all`);

    let data = await response.data;

    if (data.success) {
      this.setState({ messages: data.messages });
    } else {
      this.setState({ errors: data.errors });
    }
  };

  render() {
    return (
      <>
        {this.state.errors.length != 0 && (
          <Notifier
            messages={this.state.errors}
            onDone={() => this.setState({ errors: [] })}
          />
        )}
        {this.state.success.length != 0 && (
          <Notifier
            messages={this.state.success}
            type={true}
            onDone={() => this.setState({ success: [] })}
          />
        )}
        <div className="home-container">
          <HomeHeader />
          <WriteMessage newMessage={message => this.setState({messages: [ message, ...this.state.messages]})}/>
          <div className="messages-container">
            {this.state.messages.map((msg, i) => (
              <MessageBox key={i} message={msg} />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default Home;
