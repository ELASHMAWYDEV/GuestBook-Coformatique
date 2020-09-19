import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import checkAuth from "../checkAuth";

class PrivateRoute extends Component {

  state = {
    isLoggedIn: false
  }
  componentDidMount = async () => {
    const isLoggedIn = await checkAuth();
    this.setState({ isLoggedIn });
  }

  render() {
    const Component = this.props.component;
    return (
      <Route
        {...this.props}
        component={(props) =>
          this.state.isLoggedIn ? <Component {...props}/> : <Redirect to="/" />
        }
      />
    );
  }
}

export default PrivateRoute;
