import Link from 'next/link';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Menu} from 'antd';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AuthContext} from "../context/auth-context";
import {LogInContext} from "../context/loginform-context";
import LoginForm from "./login-form";
import {CartContext} from "../context/cart-context";

const {SubMenu} = Menu;

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const logInContext = useContext(LogInContext);
  const cartContext = useContext(CartContext);
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

  const login = <Menu.Item key="1">
    <div style={{display: "flex", alignItems: "center"}}>
      <FontAwesomeIcon icon="sign-in-alt" width="14"/>
      <span style={{marginLeft: "0.5rem"}}
            onClick={loginHandler}>Login</span>
    </div>
  </Menu.Item>

  const user = <SubMenu icon={<FontAwesomeIcon icon="user" width="14" height="14" style={{marginRight:"0.5rem"}}/>} title="User">
    <Menu.Item key="user:1"><Link as={ `/user/tracker`} href={ "/user/[userid]"}>My Page</Link></Menu.Item>
      <Menu.Item key="user:2" onClick={loginHandler}>LogOut</Menu.Item>
  </SubMenu>

  return (
    <div>
      {content}
      <div className="navbar-container" id={"PopupPlacer"}>
        <Link href={"/"}>
          <a><img src="/logo.png" alt="logo" className="logo" style={{height: "30px"}}/></a>
        </Link>
        <Menu mode="horizontal">
          {authContext.isAuth ? <Menu.Item key="2" id="navbar-today-menu">
            <FontAwesomeIcon icon="utensils" width="14" height="14"/>
            <span onClick={cartContext.toggleMenu} style={{marginLeft: "0.5rem"}}
            >{cartContext.currentMeal}</span>
          </Menu.Item> : null}
          {
            authContext.isAuth ? user : login
          }
        </Menu>
        { /*language=CSS*/}
        <style jsx>{`
          .navbar-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          @media (max-width: 600px) {
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

