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
    errors: [],
    success: [],
  };

  static contextType = AuthContext;

  componentDidMount = () => {
    this.Auth = this.context;
    this.setState({ isLoggedIn: this.Auth.isLoggedIn });
  };

  login = async (e) => {
    e.preventDefault();
    let { user, password } = this.state;
    //login function from App component
    const response = await this.Auth.login(user, password);

    if (response.success) {
      this.setState({
        success: [...response.messages, "Redirecting to home page..."],
      });
    } else {
      this.setState({ errors: response.errors });
    }
  };

  render() {
    return (
      <AuthContext.Consumer>
        {({ isLoggedIn }) => (
          <>
            {isLoggedIn && <Redirect to="/" />}
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
            <div className="login-container">
              <div className="box-container">
                <form onSubmit={this.login}>
                  <div className="login-box">
                    <h2>Login</h2>
                    <span className="separator"></span>
                    <div className="inputs">
                      <input
                        placeholder="Username or email"
                        type="text"
                        onChange={(e) =>
                          this.setState({ user: e.target.value })
                        }
                      />
                      <input
                        placeholder="Password"
                        type="password"
                        onChange={(e) =>
                          this.setState({ password: e.target.value })
                        }
                      />
                    </div>
                    <button className="login-btn" type="submit">
                      login
                    </button>
                    <p className="after-box-notice">
                      if you don't have an account, register
                      <Link to="/register">here</Link>
                    </p>
                    <p className="after-box-notice">
                      lost your password ? click <Link to="/reset">here</Link>
                      to reset
                    </p>
                    <Link to="/" className="go-home-btn">
                      Go to home
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default Login;
