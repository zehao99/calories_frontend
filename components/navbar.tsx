import Link from 'next/link';
import {Layout, Menu} from 'antd';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const Navbar = () => (
  <div className="navbar-container">

    <Link href={"/"}>
      <a><img src = "/logo.png" alt = "logo" className="logo" style={{height: "30px"}}/></a>
    </Link>
    <Menu mode="horizontal">
      <Menu.Item key="1">
        <div style={{display: "flex", alignItems: "center"}}>
          <FontAwesomeIcon icon="sign-in-alt" width="14"/>
          <span style={{marginLeft: "0.5rem"}}>Login</span>
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


);

export default Navbar;

