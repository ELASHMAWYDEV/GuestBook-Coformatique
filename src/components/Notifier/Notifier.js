import React, { Component } from "react";
import "./Notifier.scss";

class Notifier extends Component {
  state = {
    visible: true,
  };

  static defaultProps = {
    messages: [],
    type: false,
    onDone: () => null,
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ visible: false });
      this.props.onDone();
    }, 5900);
  };

  render() {
    return (
      this.state.visible && (
        <div className="notifier-container">
          {this.props.messages.map((msg, i) => (
            <div key={i} className={`msg ${this.props.type ? " success" : " error"}`}>
              <div>
                {msg}
              </div>
              <span className={this.props.type ? "success" : "error"}></span>
            </div>
          ))}
        </div>
      )
    );
  }
}

export default Notifier;
