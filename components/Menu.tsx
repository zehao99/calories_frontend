import React, {useContext, useEffect, useState} from "react";
import FullMenu from "./MenuComps/FullMenu";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./Menu.module.scss";
import {CartContext} from "../context/cart-context";

const Menu = () => {
  const cartContext = useContext(CartContext);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(()=>{setShowMenu(cartContext.showMenu)},[cartContext.showMenu]);

  const clickOpen = () => {
    cartContext.toggleMenu();
  }

  const clickClose = () => {
    cartContext.toggleMenu();
  }

  return (<div className={showMenu ? styles.todayMenuToggleShow : styles.todayMenuToggle} >
    <div className={ styles.todayMenuToggleContainer} onClick={clickOpen}>
      <FontAwesomeIcon className={styles.todayMenuToggleBtn} icon="utensils" width="24px"/>
      <p>Meal</p>
    </div>
    {showMenu && <FullMenu clickClose={clickClose}/>}
  </div>)
}

export default Menu;