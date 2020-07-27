import Link from 'next/link';
import {useContext} from 'react';
import {Menu} from 'antd';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AuthContext} from "../context/auth-context";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const loginHandler = () => {

    authContext.login();
  }
  return (
  <div className="navbar-container">

    <Link href={"/"}>
      <a><img src = "/logo.png" alt = "logo" className="logo" style={{height: "30px"}}/></a>
    </Link>
    <Menu mode="horizontal">
      <Menu.Item key="1">
        <div style={{display: "flex", alignItems: "center"}}>
          <FontAwesomeIcon icon="sign-in-alt" width="14"/>
          <span style={{marginLeft: "0.5rem"}} onClick={loginHandler}>{authContext.isAuth?"Log Out":"Login"}</span>
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
        .logo{
            height: 5px;
            width: auto;
        }
      }
    `}
    </style>
  </div>


)};

export default Navbar;

