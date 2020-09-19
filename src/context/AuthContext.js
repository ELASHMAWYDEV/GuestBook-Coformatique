import React from "react";




let AuthContext = React.createContext({
  isLoggedIn: false,
  login: () => null,
  logout: () => null,
  check: () => null,
});


export default AuthContext;
