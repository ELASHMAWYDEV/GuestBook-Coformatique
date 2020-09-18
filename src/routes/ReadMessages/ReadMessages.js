import React, { Component } from "react";
import "./ReadMessages.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

//Components
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import MessageBox from "../../components/MessageBox/MessageBox";

class ReadMessages extends Component {
  state = {
    messages: [
      {
        username: "Mahmoud",
        msg:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since standard dummy text ever since standard",
      },
    ],
  };


  render() {
    return (
      <div className="read-messages-container">
        <HomeHeader />
        <div className="route-title"><FontAwesomeIcon icon={faCheck}/><p>All Read Messages</p><FontAwesomeIcon icon={faCheck}/></div>
        <div className="messages-container">
          {this.state.messages.map((msg, i) => <MessageBox key={i} message={msg} />)}
          
        </div>
      </div>
    );
  }
}

export default ReadMessages;
