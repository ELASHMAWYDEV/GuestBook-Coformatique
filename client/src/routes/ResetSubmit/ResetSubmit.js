import React, { Component } from "react";
import "./ResetSubmit.scss";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

//Context
import AuthContext from "../../context/AuthContext";

//Components
import Notifier from "../../components/Notifier/Notifier";
import Loading from "../../components/Loading/Loading";

class Reset extends Component {
  state = {
    loading: false,
    errors: [],
    success: [],
    token: this.props.match.params.token,
    password: "",
    passwordConfirm: "",
  };

  resetSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true }); //Start loading screen
    const { password, passwordConfirm, token } = this.state;

    let response = await axios.post(
      `/auth/reset/submit`,
      {
        password,
        passwordConfirm,
        resetToken: token,
      },
      {
        withCredentials: true,
      }
    );

    let data = await response.data;
    if (data.success) {
      this.setState({ success: data.messages });
    } else {
      this.setState({ errors: data.errors });
    }
    this.setState({ loading: false }); //Stop loading screen
  };

  render() {
    return (
      <AuthContext.Consumer>
        {({ isLoggedIn }) => (
          <>
            {this.state.loading && <Loading />}
            {isLoggedIn && <Redirect to="/" />}
            {this.state.errors.length !== 0 && (
              <Notifier
                messages={this.state.errors}
                onDone={() => this.setState({ errors: [] })}
              />
            )}
            {this.state.success.length !== 0 && (
              <Notifier
                messages={this.state.success}
                type={true}
                onDone={() => this.setState({ success: [] })}
              />
            )}
            <div className="reset-submit-container">
              <form onSubmit={this.resetSubmit}>
                <div className="reset-submit-box">
                  <h2>Change your Password</h2>
                  <span className="separator"></span>
                  <div className="inputs">
                    <input
                      placeholder="New password"
                      type="password"
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                    />
                    <input
                      placeholder="Confirm new password"
                      type="password"
                      onChange={(e) =>
                        this.setState({ passwordConfirm: e.target.value })
                      }
                    />
                  </div>
                  <button className="reset-submit-btn">
                    change my password
                  </button>
                  <p className="after-box-notice">
                    if this was a mistake, login <Link to="/login">here</Link>
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

export default Reset;
