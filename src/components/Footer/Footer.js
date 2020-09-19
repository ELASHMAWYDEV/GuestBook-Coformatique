import React, { Component } from "react";
import "./Footer.scss";

class Footer extends Component {
  state = {};
  render() {
    return (
      <div className="footer">
        <p>
          designed &amp; developed with <span>&hearts;</span> by
          <a href="https://elashmawydev"> ELASHMAWY DEV</a>
        </p>
      </div>
    );
  }
}

export default Footer;
