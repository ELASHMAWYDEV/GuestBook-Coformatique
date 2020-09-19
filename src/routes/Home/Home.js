import React, { Component } from "react";
import "./Home.scss";
import axios from "axios";
import { API } from "../../config/config";

//Components
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import WriteMessage from "../../components/WriteMessage/WriteMessage";
import MessageBox from "../../components/MessageBox/MessageBox";
import Notifier from "../../components/Notifier/Notifier";
import Loading from "../../components/Loading/Loading";

class Home extends Component {
  state = {
    success: [],
    errors: [],
    messages: [],
    loading: false,
  };

  componentWillMount = () => {
    this.getMessages();
  };

  getMessages = async () => {
    this.setState({ loading: true }); //Start loading screen

    let response = await axios.post(`${API}/messages/all`);

    let data = await response.data;

    if (data.success) {
      this.setState({ messages: data.messages });
    } else {
      this.setState({ errors: data.errors });
    }
    this.setState({ loading: false }); //Stop loading screen
  };

  render() {
    return (
      <>
        {this.state.loading && <Loading />}
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
          <WriteMessage
            newMessage={(message) => {
              this.getMessages();
            }}
          />
          <div className="messages-container">
            {this.state.messages.reverse().map((msg, i) => (
              <MessageBox key={i} message={msg} />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default Home;
