import React, { Component } from "react";
import "./WriteMessage.scss";

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

  toggleBox = (isLoggedIn) => {
    isLoggedIn
      ? this.setState({ boxVisible: !this.state.boxVisible })
      : this.setState({ errors: ["You must login first to write messages"] });
  };
  render() {
    return (
      <AuthContext.Consumer>
        {({ isLoggedIn }) => (
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
            <div className="write-message-container">
              <button
                className="write-new-btn"
                onClick={() => this.toggleBox(isLoggedIn)}
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
                    <div className="input-container">
                      <label>Message</label>
                      <textarea placeholder="Message" />
                    </div>
                    <button className="save-btn">Save</button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default WriteMessage;
