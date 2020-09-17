import React, { Component } from 'react';
import "./Login.scss";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {  }
  render() { 
    return ( 
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          <span className="separator"></span>
          <div className="inputs">
            <input placeholder="Username or email" type="text"/>
            <input placeholder="Password" type="text" />
          </div>
          <button className="login-btn">login</button>
          <p className="after-box-notice">if you don't have an account, register <Link to="/register">here</Link></p>
          <p className="after-box-notice">lost your password ? click <Link to="/reset">here</Link> to reset</p>
          <Link to="/" className="go-home-btn">Go to home</Link>
        </div>
      </div>
    );
  }
}
 
export default Login;