import React, { Component } from "react";
import "./ReadMessages.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API } from "../../config/config";
import { Redirect } from "react-router-dom";

//Context
import AuthContext from "../../context/AuthContext";

//Components
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import MessageBox from "../../components/MessageBox/MessageBox";
import Notifier from "../../components/Notifier/Notifier";
import Loading from "../../components/Loading/Loading";

class ReadMessages extends Component {
  state = {
    errors: [],
    messages: [],
    loading: false,
  };

  componentWillMount = () => {
    this.getMessages();
  };

  getMessages = async () => {
    this.setState({ loading: true }); //Start loading screen

    let response = await axios.post(
      `${API}/messages/read/get`,
      {},
      { withCredentials: true }
    );

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
        {({ isLoggedIn }) => (
          <>
            {this.state.loading && <Loading />}
            {!isLoggedIn && <Redirect to="/" />}
            {this.state.errors.length != 0 && (
              <Notifier
                messages={this.state.errors}
                onDone={() => this.setState({ errors: [] })}
              />
            )}
            <div className="read-messages-container">
              <HomeHeader />
              <div className="route-title">
                <FontAwesomeIcon icon={faCheck} />
                <p>All Read Messages</p>
                <FontAwesomeIcon icon={faCheck} />
              </div>
              <div className="messages-container">
                {this.state.messages.map((msg, i) => (
                  <MessageBox key={i} message={msg} read={true}/>
                ))}
              </div>
            </div>
          </>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default ReadMessages;
