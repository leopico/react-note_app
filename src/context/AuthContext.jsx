import React, { useState, createContext } from "react";

const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [authUser, setAuthUser] = useState({});
  return (
    <AuthContext.Provider
      value={{ authUser: authUser, setAuthUser: setAuthUser }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
