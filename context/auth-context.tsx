import React, {useState} from "react";

export const AuthContext = React.createContext(
  {
    isAuth: false,
    userInfo: {},
    login: () => {},
  }
)

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginHandler = () => {
    setIsAuthenticated(!isAuthenticated);
  }

  return (
    <AuthContext.Provider value={{login: loginHandler, isAuth: isAuthenticated, userInfo: {}}}>{props.children}</AuthContext.Provider>
  )
}
export default AuthContextProvider;