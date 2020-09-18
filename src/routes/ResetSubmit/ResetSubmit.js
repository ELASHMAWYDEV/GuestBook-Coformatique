import React, { Component } from "react";
import "./ResetSubmit.scss";
import { Link } from "react-router-dom";

class Reset extends Component {

  render() {
    return (
      <div className="reset-submit-container">
        <div className="reset-submit-box">
          <h2>Change your Password</h2>
          <span className="separator"></span>
          <div className="inputs">
            <input placeholder="New password" type="password" />
            <input placeholder="Confirm new password" type="password" />
          </div>
          <button className="reset-submit-btn">change my password</button>
          <p className="after-box-notice">
            if this was a mistake, login <Link to="/login">here</Link>
          </p>
          <Link to="/" className="go-home-btn">
            Go to home
          </Link>
        </div>
      </div>
    );
  }
}

export default Reset;
