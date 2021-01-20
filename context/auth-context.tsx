import React, {useContext, useEffect, useState} from "react";
import PopModal from "../components/popup-alert";
import PopupAlert from "../components/popup-alert";
import Cookie from "js-cookie";
import {parseCookies} from "../utils/parseCookies"
import {CartContext} from "./cart-context";

export const AuthContext = React.createContext(
  {
    isAuth: false,
    userInfo: {username: "NOT_LOGGED_IN", displayed_name: "NOT_LOGGED_IN", disabled: true, height: 0.0, weight: 0.0, age: 0, gender: "N/A"},
    login: () => {
    },
    logout: () => {
    },
  }
)

const AuthContextProvider = (props) => {

  const cartContext = useContext(CartContext);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({username: "NOT_LOGGED_IN", displayed_name: "NOT_LOGGED_IN", disabled: true, height: 0.0, weight: 0.0, age: 0, gender: "N/A"});
  // useEffect(()=> {Cookie.set("userInfo", userInfo)},[userInfo])
  useEffect( ()=> {
      const userCart = localStorage.getItem("userCart");
      cartContext.setItems(JSON.parse(userCart));
      fetch(`/api/token`,{method:"POST"})
        .then( (response) => {
          if(response.ok){
            setIsAuthenticated(true);
          }else{
            setIsAuthenticated(false);
          }
          return response.json()
        }).then((data) => {
          setUserInfo(data);
        console.log(data);
      }).catch((error) => {
        setIsAuthenticated(false);
      });
    }
  ,[])


  const loginHandler = () => {
    setIsAuthenticated(true);
  }
  const logoutHandler = () => {
    fetch('/api/logout', {method: "GET"}).then((res) => {
      if(res.ok){
        setIsAuthenticated(false);
        localStorage.clear();
        sessionStorage.clear();
        location.reload();
      }
    }).catch((err) => {
      PopupAlert.show({
        title: "Logout Failed",
        message: "Please try again."
      })
    });

  }

  return (
    <AuthContext.Provider
      value={{
        login: loginHandler,
        logout: logoutHandler,
        isAuth: isAuthenticated,
        userInfo: userInfo
      }}>{props.children}</AuthContext.Provider>
  )
}
export default AuthContextProvider;