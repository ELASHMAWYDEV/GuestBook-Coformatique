import React, { Component } from "react";
import "./MessageBox.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API } from "../../config/config";

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
    msg: this.props.message,
    success: [],
    errors: [],
  };

  static defaultProps = {
    message: {},
  };

  markBox = () => {
    this.setState({ marked: true });
    setTimeout(() => this.setState({ boxShown: false }), 1000);
  };

  pressESC = (e) => {
    if (e.keyCode == 27 && this.state.editBox) this.toggleBox();
  };

  toggleBox = () => {
    this.setState({ editBox: !this.state.editBox });
  };

  editMessage = async (e) => {
    e.preventDefault();
    let response = await axios.post(
      `${API}/messages/edit`,
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
      `${API}/messages/read`,
      { message: this.state.msg },
      { withCredentials: true }
    );

    let data = await response.data;

    if (data.success) {
      this.setState({ success: data.messages });
    } else {
      this.setState({ errors: data.errors });
    }
  };


  deleteMessage = async () => {
    let response = await axios.post(
      `${API}/messages/delete`,
      { message: this.state.msg },
      { withCredentials: true }
    );

    let data = await response.data;

    if (data.success) {
      this.setState({ success: data.messages, boxShown: false });
    } else {
      this.setState({ errors: data.errors });
    }
  }

  render() {
    let message = this.state.message;
    let msgTime = new Date(message.createdAt);
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
          {this.state.editBox && (
            <div className="edit-box-container">
              <div className="box">
                <img
                  src={cancelImage}
                  alt="close"
                  className="close-img"
                  onClick={this.toggleBox}
                />
                <h3>Write a new message</h3>
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
          <div className={`msg-box ${this.state.marked && "marked-box"}${!this.state.boxShown && " not-visible"}`}>
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
                        this.markBox();
                        this.readMessage();
                      }}
                    >
                      <p>Mark read</p>
                      <img src={doneImage} alt="Mark read" />
                    </div>
                    <div className="reply">
                      <p>reply</p>
                      <img src={replyImage} alt="reply" />
                    </div>
                  </>
              ) : (
                  <>
                  <div className="edit" onClick={this.toggleBox}>
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
            )}{" "}
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
