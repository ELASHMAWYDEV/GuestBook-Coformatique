import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

class PrivateRoute extends Component {
  state = {
    isLoggedIn: true,
  };
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
