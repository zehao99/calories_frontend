import React, {useContext, useEffect, useState} from "react";
import PopModal from "../components/popup-alert";
import PopupAlert from "../components/popup-alert";
import Cookie from "js-cookie";
import {parseCookies} from "../utils/parseCookies"
import {CartContext} from "./cart-context";

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

  const cartContext = useContext(CartContext);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  // useEffect(()=> {Cookie.set("userInfo", userInfo)},[userInfo])
  useEffect( ()=> {
      const userToken = localStorage.getItem("userToken");
      if(userToken){
        cartContext.setUserToken(userToken);
        const userCart = localStorage.getItem("userCart" + userToken);
        cartContext.setItems(JSON.parse(userCart));
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
      }else{
        localStorage.clear();
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
    sessionStorage.clear();
    location.reload();

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