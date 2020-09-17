import React, { Component } from 'react';
import "./Home.scss";

//Components
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import WriteMessage from '../../components/WriteMessage/WriteMessage';

class Home extends Component {
  state = { 

  }
  render() { 
    return (  
      <div className="home-container">
        <HomeHeader />
        <WriteMessage />
      </div>
    );
  }
}
 
export default Home;