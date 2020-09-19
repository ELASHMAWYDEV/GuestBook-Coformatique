import React, { Component } from "react";
import "./HomeHeader.scss";
import { Link } from "react-router-dom";
import { API } from "../../config/config";
import axios from "axios";
import checkAuth from "../../checkAuth";

class HomeHeader extends Component {
  state = {
    isLoggedIn: false,
  };

  componentDidMount = async () => {
    const isLoggedIn = await checkAuth();
    this.setState({ isLoggedIn });
  }

  logout = async () => {
    //send a request to clear the access token from cookie
    let response = await axios.post(
      `${API}/auth/logout`,
      {},
      { withCredentials: true }
    );
    let data = await response.data;

    if (data.success) {
      //Update the state
      this.setState({ isLoggedIn: false });
    }
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
