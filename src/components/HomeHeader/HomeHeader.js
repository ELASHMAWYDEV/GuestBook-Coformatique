import React, { Component } from "react";
import "./HomeHeader.scss";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";

class HomeHeader extends Component {
  state = {
    isLoggedIn: false,
  };

  componentDidMount = () => {
    // this.setState({ isLoggedIn: this.context });
  };
  logout = () => {
    //remove the access token
    Cookie.remove("@access_token");

    //remove the user
    Cookie.remove("@user");

    //Update the state
    this.setState({ isLoggedIn: false });
  };

  render() {
    return (
      <div className="home-header">
        <div className="website-title">Guest Book</div>
        <div className="right-items">
          {this.state.isLoggedIn ? (
            <>
              <div className="nav-links">
                <Link to="/ReadMessages">Read Messages</Link>
                <Link to="/MyMessages">My Messages</Link>
              </div>
              <Link to="/" className="logout-btn">
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
