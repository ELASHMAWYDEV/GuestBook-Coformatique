import React, { Component } from "react";
import "./Reset.scss";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { API } from "../../config/config";

//Context
import AuthContext from "../../context/AuthContext";

//Components
import Notifier from "../../components/Notifier/Notifier";
import Loading from "../../components/Loading/Loading";

class Reset extends Component {
  state = {
    user: "",
    errors: [],
    success: [],
    loading: false,
  };

  resetPassword = async (e) => {
    e.preventDefault();
    this.setState({ loading: true }); //Start loading screen

    let response = await axios.post(
      `${API}/auth/reset`,
      {
        user: this.state.user,
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
            <div className="reset-container">
              <form onSubmit={this.resetPassword}>
                <div className="reset-box">
                  <h2>Reset Password</h2>
                  <span className="separator"></span>
                  <div className="inputs">
                    <input
                      placeholder="Username or email"
                      type="text"
                      onChange={(e) => this.setState({ user: e.target.value })}
                    />
                  </div>
                  <button className="reset-btn" type="submit">
                    send link to email
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
