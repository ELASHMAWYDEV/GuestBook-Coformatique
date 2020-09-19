import React from 'react';

let AuthContext = React.createContext({
  isLoggedIn: false,
  login: () => null,
  logout: () => null
});


export default AuthContext;