import React, { Component } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import axios from "axios";
import { API } from "./config/config";

//Context
import AuthContext from "./context/AuthContext";

//Routes
import {
  Home,
  Login,
  Register,
  Reset,
  ResetSubmit,
  ReadMessages,
  NotFound,
} from "./routes/index";

class App extends Component {
  state = {
    isLoggedIn: false,
  };

  static contextType = AuthContext;

  componentDidMount = () => {
    this.Auth = this.context;
    this.setState({ isLoggedIn: this.Auth.isLoggedIn });
  };
  login = async (user, password) => {
    let response = await axios.post(
      `${API}/auth/login`,
      {
        user,
        password,
      },
      {
        withCredentials: true,
      }
    );

    let data = await response.data;
    if (data.success) {
      this.setState(prevState => ({ ...prevState, isLoggedIn: true }));
      console.log(this.state.isLoggedIn, AuthContext);
      return data;
    } else {
      this.setState({ isLoggedIn: false });
      return data;
    }
  };

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
      this.setState(prevState => ({ ...prevState, isLoggedIn: false }));
      return data;
    }
  };

  check = async () => {
    let response = await axios.post(
      `${API}/auth/check`,
      {},
      { withCredentials: true }
    );
    let data = await response.data;
    return data;
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: this.state.isLoggedIn,
          login: this.login,
          logout: this.logout,
          check: this.check,
        }}
      >
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/reset" exact component={Reset} />
            <Route path="/reset/submit/:token" component={ResetSubmit} />
            {this.state.isLoggedIn && <Route path="/ReadMessages" component={ReadMessages} />}
            <Route component={NotFound} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    );
  }
}

export default App;
