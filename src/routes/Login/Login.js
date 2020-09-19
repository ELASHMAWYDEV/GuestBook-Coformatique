import React, { Component } from "react";
import "./Login.scss";
import { Link, Redirect } from "react-router-dom";

//Context
import AuthContext from "../../context/AuthContext";

//Components
import Notifier from "../../components/Notifier/Notifier";

class Login extends Component {
  state = {
    user: "",
    password: "",
    isLoggedIn: false,
    errors: [],
    success: [],
  };

  static contextType = AuthContext;
  componentDidMount = () => {
    this.Auth = this.context;
  };

  login = async (e) => {
    e.preventDefault();
    let { user, password } = this.state;
    const response = await this.Auth.login(user, password);

    if (response.success) {
      this.setState({ isLoggedIn: true });
      this.setState({ success: response.messages });
    } else {
      this.setState({ isLoggedIn: false });
      this.setState({ success: response.errors });
    }
  };

  render() {
    return (
      <>
        {this.state.errors.length != 0 && <Notifier messages={this.state.errors} onDone={() => this.setState({errors: []})}/>}
        {this.state.success.length != 0 && <Notifier messages={this.state.success} type={true} onDone={() => this.setState({success: []})}/>}
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
      </>
    );
  }
}

export default Login;
