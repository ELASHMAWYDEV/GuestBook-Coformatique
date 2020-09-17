import React, { Component } from 'react';
import "./WriteMessage.scss";

class WriteMessage extends Component {
  state = {  

  }
  render() { 
    return (  
      <div className="write-message-container">
        <button className="write-new-btn">Write a new message</button>
        <div className="popup-box-container" style={{display: "none"}}>

        </div>
      </div>
    );
  }
}
 
export default WriteMessage;