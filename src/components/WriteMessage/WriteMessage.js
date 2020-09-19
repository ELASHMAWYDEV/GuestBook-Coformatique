import React, { Component } from "react";
import "./WriteMessage.scss";
import axios from "axios";
import { API } from "../../config/config";

//Context
import AuthContext from "../../context/AuthContext";

//Components
import Notifier from "../Notifier/Notifier";

//images
import cancelImage from "../../assets/img/cancel.svg";

class WriteMessage extends Component {
  state = {
    boxVisible: false,
    success: [],
    errors: [],
    msg: "",
    newMessage: (message) => null,
  };

  componentDidMount = () => {
    document.addEventListener("keydown", this.pressESC);
  };

  componentWillUnmount = () => {
    document.removeEventListener("keydown", this.pressESC);
  };

  pressESC = (e) => {
    if (e.keyCode == 27 && this.state.boxVisible) this.toggleBox();
  };

  toggleBox = () => {
    this.isLoggedIn
      ? this.setState({ boxVisible: !this.state.boxVisible })
      : this.setState({ errors: ["You must login first to add messages"] });
  };

  addMessage = async (e) => {
    e.preventDefault();

    let response = await axios.post(
      `${API}/messages/add`,
      {
        msg: this.state.msg,
      },
      { withCredentials: true }
    );

    let data = await response.data;

    if (data.success) {
      this.setState({ success: data.messages, boxVisible: false });
      //pass new message to parent component
      this.props.newMessage(data.msg);
    } else {
      this.setState({ errors: data.errors });
    }
  };

  render() {
    return (
      <AuthContext.Consumer>
        {({ isLoggedIn }) => {
          this.isLoggedIn = isLoggedIn;
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
              <div className="write-message-container">
                <button
                  className="write-new-btn"
                  onClick={() => this.toggleBox()}
                >
                  Write a new message
                </button>
                {this.state.boxVisible && isLoggedIn && (
                  <div className="popup-box-container" style={{ display: "" }}>
                    <div className="box">
                      <img
                        src={cancelImage}
                        alt="close"
                        className="close-img"
                        onClick={this.toggleBox}
                      />
                      <h3>Write a new message</h3>
                      <form onSubmit={this.addMessage}>
                        <div className="input-container">
                          <label>Message</label>
                          <textarea
                            placeholder="Message"
                            onChange={(e) =>
                              this.setState({ msg: e.target.value })
                            }
                          />
                        </div>
                        <button className="save-btn">Save</button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

export default WriteMessage;
