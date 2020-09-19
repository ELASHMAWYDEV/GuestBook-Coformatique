import React, { Component } from "react";
import "./HomeHeader.scss";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

class HomeHeader extends Component {
  state = {
    isLoggedIn: false,
  };

  static contextType = AuthContext;

  componentDidMount = () => {
    this.Auth = this.context;
    this.setState({ isLoggedIn: this.Auth.isLoggedIn });
  };

  render() {
    return (
      <div className="home-header">
        <div className="website-title">Guest Book</div>
        <div className="right-items">
          {this.state.isLoggedIn ? (
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
    );
  }
}

export default HomeHeader;
