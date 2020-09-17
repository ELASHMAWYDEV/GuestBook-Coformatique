import React, { Component } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";

//Routes
import { Home } from "./routes/index";

class App extends Component {

  render() {
    return (
      <Router> 
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
