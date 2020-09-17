import React, { Component } from 'react';
import "./Register.scss";
import { Link } from "react-router-dom";

class Register extends Component {
  state = {  }
  render() { 
    return ( 
      <div className="register-container">
        <div className="register-box">
          <h2>Register</h2>
          <span className="separator"></span>
          <div className="inputs">
            <input placeholder="Username" type="text"/>
            <input placeholder="Email" type="email"/>
            <input placeholder="Password" type="password" />
            <input placeholder="Confirm password" type="password" />
          </div>
          <button className="register-btn">register</button>
          <p className="after-box-notice">if you already have an account, login <Link to="/login">here</Link></p>
        </div>
      </div>
    );
  }
}
 
export default Register;