import React from "react";




let AuthContext = React.createContext({
  isLoggedIn: false,
  login: () => null,
  register: () => null,
  logout: () => null,
  check: () => null,
});


export default AuthContext;
