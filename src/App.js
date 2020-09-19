import React, { Component } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
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
  MyMessages,
  NotFound,
} from "./routes/index";

//Components
import Loading from "./components/Loading/Loading";

class App extends Component {
  state = {
    isLoggedIn: false,
    loading: false,
  };

  static contextType = AuthContext;

  componentWillMount = async () => {
    //assign the AuthContext to the App component
    this.Auth = this.context;
    //check if user has credentials before App loads
    let AuthCheck = await this.checkAuth();

    if (AuthCheck.success) {
      this.setState({ isLoggedIn: true });
    } else {
      this.setState({ isLoggedIn: false });
    }
  };

  //login function to requset credentials from the server
  login = async (user, password) => {
    this.setState({ loading: true }); //Start loading screen
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
      this.setState({ loading: false }); //Stop loading screen
      return data;
    }
  };

  //register function to requset credentials from the server
  register = async (username, email, password, passwordConfirm) => {
    this.setState({ loading: true }); //Start loading screen
    let response = await axios.post(
      `${API}/auth/register`,
      {
        username,
        email,
        password,
        passwordConfirm,
      },
      {
        withCredentials: true,
      }
    );

    let data = await response.data;
    if (data.success) {
      this.setState((prevState) => ({ ...prevState, isLoggedIn: true }));
      this.setState({ loading: false }); //Stop loading screen
      return data;
    } else {
      this.setState({ isLoggedIn: false });
      this.setState({ loading: false }); //Stop loading screen
      return data;
    }
  };

  //logout function to remove the credentials from the client & the server
  logout = async () => {
    this.setState({ loading: true }); //Start loading screen
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
      this.setState({ loading: false }); //Stop loading screen
      return data;
    }
  };

  //Check if user has credentials before loading whole APP
  checkAuth = async () => {
    this.setState({ loading: true }); //Start loading screen
    let response = await axios.post(
      `${API}/auth/check`,
      {},
      { withCredentials: true }
    );
    let data = await response.data;
    this.setState({ loading: false }); //Stop loading screen
    return data;
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: this.state.isLoggedIn,
          login: this.login,
          register: this.register,
          logout: this.logout,
          check: this.checkAuth,
        }}
      >
        {this.state.loading && <Loading />}
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/reset" exact component={Reset} />
            <Route path="/reset/submit/:token" component={ResetSubmit} />
            <Route path="/ReadMessages" component={ReadMessages} />
            <Route path="/MyMessages" component={MyMessages} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    );
  }
}

export default App;
