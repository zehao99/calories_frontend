import React, {useContext, useEffect, useState} from "react";
import FullMenu from "./MenuComps/FullMenu";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./Menu.module.scss";
import {CartContext} from "../context/cart-context";
import {AuthContext} from "../context/auth-context";
import {motion} from "framer-motion";

const Menu = () => {
  const cartContext = useContext(CartContext);
  const authContext = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const [isAuth, setIsAuth] = useState(authContext.isAuth);

  useEffect(() => {
    setShowMenu(cartContext.showMenu)
  }, [cartContext.showMenu]);
  useEffect(() => {
    setIsAuth(authContext.isAuth)
  }, [authContext.isAuth]);


  const clickOpen = () => {
    cartContext.toggleMenu();
  }

  const clickClose = () => {
    cartContext.toggleMenu();
  }
  const content = <motion.div initial={{opacity: 0, height: "100%"}} animate={{opacity: [1,0,1,0,1], height: "100%"}}
                              transition={{duration: 1}}>
    <div className={showMenu ? styles.todayMenuToggleShow : styles.todayMenuToggle}>
      <div className={styles.todayMenuToggleContainer} onClick={clickOpen}>
        <FontAwesomeIcon className={styles.todayMenuToggleBtn} icon="utensils" width="24px"/>
        <p>Meal</p>
      </div>
      {showMenu && <FullMenu clickClose={clickClose}/>}
    </div>
  </motion.div>

  return isAuth ? content : null;
}

export default Menu;