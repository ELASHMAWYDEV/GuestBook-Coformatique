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


//Components
import Loading from "./components/Loading/Loading";


class App extends Component {
  state = {
    isLoggedIn: false,
    loading: false
  };

  static contextType = AuthContext;

  componentWillMount = async () => {
    this.Auth = this.context;
    let AuthCheck = await this.checkAuth()  ;
    if (AuthCheck.success) {
      this.setState({ isLoggedIn: true });
    } else {
      this.setState({ isLoggedIn: false });
    }
  };

  login = async (user, password) => {
    this.setState({ loading: true });
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
      this.setState((prevState) => ({ ...prevState, isLoggedIn: true }));
      
      this.setState({ loading: false });
      return data;
    } else {
      this.setState({ isLoggedIn: false });
      this.setState({ loading: false });
      return data;
    }
  };

  logout = async () => {
    this.setState({ loading: true });
    //send a request to clear the access token from cookie
    let response = await axios.post(
      `${API}/auth/logout`,
      {},
      { withCredentials: true }
    );
    let data = await response.data;

    if (data.success) {
      //Update the state
      this.setState((prevState) => ({ ...prevState, isLoggedIn: false }));
      this.setState({ loading: false });
      return data;
    }
  };

  checkAuth = async () => {
    this.setState({ loading: true });
    let response = await axios.post(
      `${API}/auth/check`,
      {},
      { withCredentials: true }
    );
    let data = await response.data;
    this.setState({ loading: false });
    return data;
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: this.state.isLoggedIn,
          login: this.login,
          logout: this.logout,
          check: this.checkAuth,
        }}
      >
        {this.state.loading && <Loading visible={false} />}
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/reset" exact component={Reset} />
            <Route path="/reset/submit/:token" component={ResetSubmit} />
            {this.state.isLoggedIn && (
              <Route path="/ReadMessages" component={ReadMessages} />
            )}
            <Route component={NotFound} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    );
  }
}

export default App;
