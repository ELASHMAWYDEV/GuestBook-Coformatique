import React, { Component } from "react";
import "./WriteMessage.scss";

//images
import cancelImage from "../../assets/img/cancel.svg";

class WriteMessage extends Component {
  state = {
    boxVisible: false,
    isLoggedIn: true,
  };

  toggleBox = () => {
    this.setState({ boxVisible: !this.state.boxVisible });
  };
  render() {
    return (
      <div className="write-message-container">
        <button className="write-new-btn" onClick={this.state.isLoggedIn && this.toggleBox}>Write a new message</button>
        {this.state.boxVisible && (
          <div className="popup-box-container" style={{ display: "" }}>
            <div className="box">
              <img src={cancelImage} alt="close" className="close-img" onClick={this.toggleBox}/>
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
    );
  }
}

export default WriteMessage;
