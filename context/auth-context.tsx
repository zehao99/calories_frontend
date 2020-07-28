import React, {useEffect, useState} from "react";
import PopModal from "../components/popup-alert";
import PopupAlert from "../components/popup-alert";
import Cookie from "js-cookie";
import {parseCookies} from "../utils/parseCookies"

export const AuthContext = React.createContext(
  {
    isAuth: false,
    userInfo: {},
    login: () => {
    },
    logout: () => {
    },
  }
)

const AuthContextProvider = (props) => {


  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  // useEffect(()=> {Cookie.set("userInfo", userInfo)},[userInfo])
  useEffect( ()=> {
      const userToken = localStorage.getItem("userToken");
      if(userToken){
        fetch(`/api/token`,{method:"POST", body: userToken})
          .then( (response) => {
            if(response.ok){
              console.log(response.body);
              setUserInfo(response.body);
              setIsAuthenticated(true);
            }else{
              setIsAuthenticated(false);
            }
          }).catch((error) => {
          setIsAuthenticated(false);
        });
      }
    }
  ,[])


  const loginHandler = () => {
    setIsAuthenticated(true);
    console.log(isAuthenticated);
  }
  const logoutHandler = () => {
    setIsAuthenticated(false);
    localStorage.clear();
  }

  return (
    <AuthContext.Provider
      value={{
        login: loginHandler,
        logout: logoutHandler,
        isAuth: isAuthenticated,
        userInfo: {}
      }}>{props.children}</AuthContext.Provider>
  )
}
export default AuthContextProvider;