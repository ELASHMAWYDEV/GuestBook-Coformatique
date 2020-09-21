import React, { Component } from "react";
import "./MessageBox.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

//images
import doneImage from "../../assets/img/correct.svg";
import replyImage from "../../assets/img/back.svg";
import editImage from "../../assets/img/edit.svg";
import cancelImage from "../../assets/img/cancel.svg";
import deleteImage from "../../assets/img/delete.svg";

//components
import Notifier from "../../components/Notifier/Notifier";

class MessageBox extends Component {
  state = {
    message: this.props.message,
    marked: false,
    boxShown: true,
    editBox: false,
    replyBox: false,
    msg: this.props.message,
    success: [],
    errors: [],
    reply: "",
  };

  static defaultProps = {
    message: {},
  };

  pressESC = (e) => {
    if (e.keyCode === 27 && this.state.editBox) this.toggleEditBox();
    if (e.keyCode === 27 && this.state.replyBox) this.toggleReplyBox();
  };

  toggleEditBox = () => {
    this.setState({ editBox: !this.state.editBox });
  };

  toggleReplyBox = () => {
    this.setState({ replyBox: !this.state.replyBox });
  };

  editMessage = async (e) => {
    e.preventDefault();
    let response = await axios.post(
      `/messages/edit`,
      { message: this.state.msg },
      { withCredentials: true }
    );

    let data = await response.data;

    if (data.success) {
      this.setState({
        success: data.messages,
        msg: data.newMessage,
        editBox: false,
      });
      setTimeout(() => window.location.reload(), 3000);
    } else {
      this.setState({ errors: data.errors });
    }
  };

  readMessage = async () => {
    let response = await axios.post(
      `/messages/read`,
      { message: this.state.msg },
      { withCredentials: true }
    );

    let data = await response.data;

    if (data.success) {
      this.setState({ success: data.messages, marked: true });
      setTimeout(() => this.setState({ boxShown: false }), 1000);
    } else {
      this.setState({ errors: data.errors });
    }
  };

  deleteMessage = async () => {
    let response = await axios.post(
      `/messages/delete`,
      { message: this.state.msg },
      { withCredentials: true }
    );

    let data = await response.data;

    if (data.success) {
      this.setState({ success: data.messages, boxShown: false });
    } else {
      this.setState({ errors: data.errors });
    }
  };

  replyMessage = async (e) => {
    e.preventDefault();
    let response = await axios.post(
      `/messages/reply`,
      {
        message: this.state.msg,
        reply: this.state.reply,
      },
      { withCredentials: true }
    );

    let data = await response.data;

    if (data.success) {
      this.setState({ success: data.messages, replyBox: false });
    } else {
      this.setState({ errors: data.errors });
    }
  };

  render() {
    let message = this.state.message;
    let msgTime = new Date(message.createdAt);
    return (
      <>
        {this.state.errors.length !== 0 && (
          <Notifier
            messages={this.state.errors}
            onDone={() => this.setState({ errors: [] })}
          />
        )}
        {this.state.success.length !== 0 && (
          <Notifier
            messages={this.state.success}
            type={true}
            onDone={() => this.setState({ success: [] })}
          />
        )}
        {this.state.replyBox && (
          <div className="edit-box-container">
            <div className="box">
              <img
                src={cancelImage}
                alt="close"
                className="close-img"
                onClick={this.toggleReplyBox}
              />
              <h3>Reply to the message</h3>
              <form onSubmit={this.replyMessage}>
                <div className="input-container">
                  <label>Your reply</label>
                  <textarea
                    placeholder="Your reply"
                    onChange={(e) =>
                      this.setState({
                        reply: e.target.value,
                      })
                    }
                  />
                </div>
                <button className="save-btn" type="submit">
                  Save
                </button>
              </form>
            </div>
          </div>
        )}
        {this.state.editBox && (
          <div className="reply-box-container">
            <div className="box">
              <img
                src={cancelImage}
                alt="close"
                className="close-img"
                onClick={this.toggleEditBox}
              />
              <h3>Edit message</h3>
              <form onSubmit={this.editMessage}>
                <div className="input-container">
                  <label>Message</label>
                  <textarea
                    placeholder="Message"
                    onChange={(e) =>
                      this.setState({
                        msg: { ...this.state.msg, msg: e.target.value },
                      })
                    }
                    value={this.state.msg.msg}
                  />
                </div>
                <button className="save-btn">Save</button>
              </form>
            </div>
          </div>
        )}
        <div
          className={`msg-box ${this.state.marked && "marked-box"}${
            !this.state.boxShown && " not-visible"
          }`}
        >
          <div className="box-header">
            <div className="username">{message.username}</div>
            <div className="time">
              {message.createdAt &&
                `${msgTime.getHours()}:${msgTime.getMinutes()}  ${msgTime.getDate()}/${msgTime.getMonth()}/${msgTime.getFullYear()}`}
            </div>
          </div>
          <div className="msg-text">{message.msg}</div>
          {!this.props.read && (
            <div className="bottom-container">
              {!this.props.own ? (
                <>
                  <div
                    className="mark-read"
                    onClick={() => {
                      this.readMessage();
                    }}
                  >
                    <p>Mark read</p>
                    <img src={doneImage} alt="Mark read" />
                  </div>
                  <div className="reply" onClick={this.toggleReplyBox}>
                    <p>reply</p>
                    <img src={replyImage} alt="reply" />
                  </div>
                </>
              ) : (
                <>
                  <div className="edit" onClick={this.toggleEditBox}>
                    <p>Edit</p>
                    <img src={editImage} alt="edit" />
                  </div>
                  <div className="delete" onClick={this.deleteMessage}>
                    <p>Delete</p>
                    <img src={deleteImage} alt="delete" />
                  </div>
                </>
              )}
            </div>
          )}
          {this.state.marked && (
            <div className="marked-overlay">
              <FontAwesomeIcon icon={faCheck} />
            </div>
          )}
        </div>
      </>
    );
  }
}

export default MessageBox;
