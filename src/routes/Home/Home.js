import React, { Component } from "react";
import "./Home.scss";

//Components
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import WriteMessage from "../../components/WriteMessage/WriteMessage";
import MessageBox from "../../components/MessageBox/MessageBox";

class Home extends Component {
  state = {
    messages: [
      {
        username: "Mahmoud",
        msg:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since standard dummy text ever since standard",
      },
    ],
  };


  render() {
    return (
      <div className="home-container">
        <HomeHeader />
        <WriteMessage />
        <div className="messages-container">
          {this.state.messages.map((msg, i) => <MessageBox key={i} message={msg} />)}
          
        </div>
      </div>
    );
  }
}

export default Home;
