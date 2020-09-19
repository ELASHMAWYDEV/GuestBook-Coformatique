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

  login = async (user, password) => {
    axios.create({ withCredentials: true });
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
      this.setState({ isLoggedIn: true });
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
      this.setState({ isLoggedIn: false });
      return true;
    }
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: this.state.isLoggedIn,
          login: this.login,
          logout: this.logout
        }}
      >
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/reset" exact component={Reset} />
            <Route path="/reset/submit/:token" component={ResetSubmit} />
            <PrivateRoute path="/ReadMessages" component={ReadMessages} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    );
  }
}

export default App;
