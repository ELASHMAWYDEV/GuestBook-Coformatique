import React, { Component } from "react";
import "./HomeHeader.scss";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

//Components
import Notifier from "../Notifier/Notifier";

class HomeHeader extends Component {
  state = {
    success: [],
  };

  static contextType = AuthContext;

  componentDidMount = () => {
    this.Auth = this.context;
  }

  logout = async () => {
    let response = await this.Auth.logout();
    if (response.success) {
      this.setState({ success: response.messages });
    }
  };

  render() {
    return (
      <AuthContext.Consumer>
        {({ isLoggedIn }) => (
          <>
            {this.state.success.length != 0 && (
              <Notifier
                messages={this.state.success}
                type={true}
                onDone={() => this.setState({ success: [] })}
              />
            )}
            <div className="home-header">
              <Link to="/" className="website-title">Guest Book</Link>
              <div className="burger-tab">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="right-items">
                {isLoggedIn ? (
                  <>
                    <div className="nav-links">
                      <Link to="/">Home</Link>
                      <Link to="/ReadMessages">Read Messages</Link>
                      <Link to="/MyMessages">My Messages</Link>
                    </div>
                    <Link to="/" className="logout-btn" onClick={this.logout}>
                      Logout
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/register" className="register-btn">
                      Register
                    </Link>
                    <Link to="/login" className="login-btn">
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default HomeHeader;
