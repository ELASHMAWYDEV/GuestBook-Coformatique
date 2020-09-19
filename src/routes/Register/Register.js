import React, { Component } from "react";
import "./Register.scss";
import { Link, Redirect } from "react-router-dom";

//Context
import AuthContext from "../../context/AuthContext";

//Components
import Notifier from "../../components/Notifier/Notifier";

class Register extends Component {
  state = {
    errors: [],
    success: [],
  };

  static contextType = AuthContext;

  componentDidMount = () => {
    this.Auth = this.context;
    this.setState({ isLoggedIn: this.Auth.isLoggedIn });
  };

  register = async (e) => {
    e.preventDefault();
    let { username, email, password, passwordConfirm } = this.state;
    //register function from App component
    const response = await this.Auth.register(
      username,
      email,
      password,
      passwordConfirm
    );

    if (response.success) {
      this.setState({
        success: [...response.messages],
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
            <div className="register-container">
              <form onSubmit={this.register}>
                <div className="register-box">
                  <h2>Register</h2>
                  <span className="separator"></span>
                  <div className="inputs">
                    <input
                      placeholder="Username"
                      type="text"
                      onChange={(e) =>
                        this.setState({ username: e.target.value })
                      }
                    />
                    <input
                      placeholder="Email"
                      type="email"
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                    <input
                      placeholder="Password"
                      type="password"
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                    />
                    <input
                      placeholder="Confirm password"
                      type="password"
                      onChange={(e) =>
                        this.setState({ passwordConfirm: e.target.value })
                      }
                    />
                  </div>
                  <button className="register-btn" type="submit">
                    register
                  </button>
                  <p className="after-box-notice">
                    if you already have an account, login
                    <Link to="/login">here</Link>
                  </p>
                  <Link to="/" className="go-home-btn">
                    Go to home
                  </Link>
                </div>
              </form>
            </div>
          </>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default Register;
