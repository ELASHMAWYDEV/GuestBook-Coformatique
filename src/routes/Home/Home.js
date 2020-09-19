import React, { Component } from "react";
import "./Home.scss";
import axios from "axios";
import { API } from "../../config/config";

//Context
import AuthContext from "../../context/AuthContext";

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

  static contextType = AuthContext;

  componentDidMount = () => {
    
    setTimeout(() => this.getMessages(this.context.isLoggedIn), 80);
  };

  getMessages = async (isLoggedIn = false) => {
    this.setState({ loading: true }); //Start loading screen
    let response;

    if (isLoggedIn) {
      response = await axios.post(
        `${API}/messages/all/unread`,
        {},
        { withCredentials: true }
      );
    } else {
      response = await axios.post(`${API}/messages/all`);
    }

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
      <AuthContext.Consumer>
        {({ isLoggedIn }) => {
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
        }}
      </AuthContext.Consumer>
    );
  }
}

export default Home;
