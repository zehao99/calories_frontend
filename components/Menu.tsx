import React, {useState} from "react";
import FullMenu from "./MenuComps/FullMenu";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./Menu.module.scss";

const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const clickOpen = () => {
    setShowMenu(!showMenu);
  }

  const clickClose = () => {
    setShowMenu(false);
  }

  return (<div className={showMenu ? styles.todayMenuToggleShow : styles.todayMenuToggle} >
    <div className={ styles.todayMenuToggleContainer} onClick={clickOpen}>
      <FontAwesomeIcon className={styles.todayMenuToggleBtn} icon="cookie-bite" width="24px"/>
      <p>Menu</p>
    </div>
    {showMenu && <FullMenu clickClose={clickClose}/>}
  </div>)
}

export default Menu;