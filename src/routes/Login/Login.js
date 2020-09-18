import React, { Component } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../../config/config";

class Login extends Component {
  state = {
    user: "",
    password: "",
  };

  login = async (e) => {
    e.preventDefault();
    let { user, password } = this.state;
    axios.create({ withCredentials: true });
    let response = await axios.post(
      `${API}/auth/login`,
      {
        user,
        password,
      },
      {
        withCredentials: true,
      }
    );

    let data = await response.data;

    console.log(data);
  };

  render() {
    return (
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          <span className="separator"></span>
          <form onSubmit={this.login}>
            <div className="inputs">
              <input
                placeholder="Username or email"
                type="text"
                onChange={(e) => this.setState({ user: e.target.value })}
              />
              <input
                placeholder="Password"
                type="password"
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>
            <button className="login-btn" type="submit">
              login
            </button>
          </form>
          <p className="after-box-notice">
            if you don't have an account, register{" "}
            <Link to="/register">here</Link>
          </p>
          <p className="after-box-notice">
            lost your password ? click <Link to="/reset">here</Link> to reset
          </p>
          <Link to="/" className="go-home-btn">
            Go to home
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;
