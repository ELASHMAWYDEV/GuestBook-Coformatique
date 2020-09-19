import React, { Component } from "react";
import "./MessageBox.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

//images
import doneImage from "../../assets/img/correct.svg";
import replyImage from "../../assets/img/back.svg";

class MessageBox extends Component {
  state = {
    message: this.props.message,
    marked: false,
    boxShown: true,
  };

  static defaultProps = {
    message: {},
  };

  markBox = () => {
    this.setState({ marked: true });
    setTimeout(() => this.setState({ boxShown: false }), 1000);
  };

  render() {
    let message = this.state.message;
    let msgTime = new Date(message.createdAt);
    return (
      this.state.boxShown && (
        <div className={`msg-box ${this.state.marked && "marked-box"}`}>
          <div className="box-header">
            <div className="username">{message.username}</div>
            <div className="time">{message.createdAt && `${msgTime.getHours()}:${msgTime.getMinutes()}  ${msgTime.getDate()}/${msgTime.getMonth()}/${msgTime.getFullYear()}`}</div>
          </div>
          <div className="msg-text">{message.msg}</div>
          <div className="bottom-container">
            <div className="mark-read" onClick={() => this.markBox()}>
              <p>Mark read</p>
              <img src={doneImage} alt="Mark read" />
            </div>
            <div className="reply">
              <p>reply</p>
              <img src={replyImage} alt="reply" />
            </div>
          </div>
          {this.state.marked && (
            <div className="marked-overlay">
              <FontAwesomeIcon icon={faCheck} />
            </div>
          )}
        </div>
      )
    );
  }
}

export default MessageBox;
