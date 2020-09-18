import React, { Component } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";

//Routes
import { Home, Login, Register, Reset } from "./routes/index";

class App extends Component {

  render() {
    return (
      <Router> 
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/reset" component={Reset} />
        </Switch>
      </Router>
    );
  }
}

export default App;
