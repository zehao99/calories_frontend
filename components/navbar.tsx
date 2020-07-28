import Link from 'next/link';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Menu} from 'antd';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AuthContext} from "../context/auth-context";
import {LogInContext} from "../context/loginform-context";
import LoginForm from "./login-form";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const logInContext = useContext(LogInContext);

  let [content, setContent] = useState(null);
  useEffect(()=>{
    if (logInContext.isShown) {
      setContent(<LoginForm onClose={logInContext.close}/>);
    }else{
      setContent(null);
    }
  },[...Object.values(logInContext)]);

  const loginHandler = () => {
    if(!authContext.isAuth){
      console.log(logInContext);
      logInContext.show();
    }else {
      authContext.logout();
    }
  }

  return (
    <div>
      {content}
      <div className="navbar-container" id={"PopupPlacer"}>
        <Link href={"/"}>
          <a><img src="/logo.png" alt="logo" className="logo" style={{height: "30px"}}/></a>
        </Link>
        <Menu mode="horizontal">
          <Menu.Item key="1">
            <div style={{display: "flex", alignItems: "center"}}>
              <FontAwesomeIcon icon="sign-in-alt" width="14"/>
              <span style={{marginLeft: "0.5rem"}}
                    onClick={loginHandler}>{authContext.isAuth ? "Log Out" : "Login"}</span>
            </div>
          </Menu.Item>
        </Menu>
        { /*language=CSS*/}
        <style jsx>{`
          .navbar-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          @media (max-width: 500px) {
            .logo {
              height: 5px;
              width: auto;
            }
          }
        `}
        </style>
      </div>
    </div>


  )
};

export default Navbar;

