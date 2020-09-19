import React, { Component } from 'react';
import "./Loading.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


class Loading extends Component {

  state = {
    visible: true,
  }
  static defaultProps = {
    visible: true,
  }

  componentDidUpdate = () => {
    if (this.props.visible == false) {
      setTimeout(() => {
        this.setState({ visible: false });
      }, 400);
    }
  }

  render() {
    return (
      <div className={`loading-container ${!this.state.visible && "hide"}`}>
        <FontAwesomeIcon icon={faSpinner}/>
      </div>
     );
  }
}
 
export default Loading;