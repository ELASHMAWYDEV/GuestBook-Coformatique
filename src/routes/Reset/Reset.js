import React, { Component } from 'react';
import "./Reset.scss";
import { Link, Route } from "react-router-dom";

class Reset extends Component {
  state = {  }
  render() { 
    return ( 
      <div className="reset-container">
        <div className="reset-box">
          <h2>Reset Password</h2>
          <span className="separator"></span>
          <div className="inputs">
            <input placeholder="Username or email" type="text"/>
          </div>
          <button className="reset-btn">send link to email</button>
          <p className="after-box-notice">if this was a mistake, login <Link to="/login">here</Link></p>
          <Link to="/" className="go-home-btn">Go to home</Link>
        </div>
      </div>
    );
  }
}
 
export default Reset;