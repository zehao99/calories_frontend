import React, {useState} from "react";
import PopModal from "../components/popup-alert";

export const AuthContext = React.createContext(
  {
    isAuth: false,
    userInfo: {},
    login: () => {
    },
  }
)

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginHandler = async () => {
    if (!isAuthenticated) {
      const data = {
        username: "adm2in",
        password: "test",
      }
      const formData = new URLSearchParams();
      formData.append('username', data.username);
      formData.append('password', data.password);
      const body = formData.toString();
      console.log(body)
      let url = "http://localhost:8000/login"
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: body,
      });
      if (response.ok) {
        setIsAuthenticated(!isAuthenticated);
      } else {
        PopModal.show({
          message: "User not registered",
          title: "Alert"
        });
      }
    } else {
      setIsAuthenticated(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{login: loginHandler, isAuth: isAuthenticated, userInfo: {}}}>{props.children}</AuthContext.Provider>
  )
}
export default AuthContextProvider;