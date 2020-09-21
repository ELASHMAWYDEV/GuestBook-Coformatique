import React, { Component } from "react";
import "./NotFound.scss";
import { Link } from "react-router-dom";

class NotFound extends Component {
  state = {};
  render() {
    return (
      <div className="not-found-container">
        <h1><span>404</span> NOT FOUND</h1>
        <Link to="/" className="go-home-btn">
            Go to home
          </Link>
      </div>
    );
  }
}

export default NotFound;
