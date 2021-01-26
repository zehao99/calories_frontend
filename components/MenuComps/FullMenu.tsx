import React, {useContext, useEffect, useState} from "react";
import {Button} from "antd";
import styles from "./FullMenu.module.scss";
import TodayMenuItem from "./TodayMenuItem";
import {CartContext} from "../../context/cart-context"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {motion} from "framer-motion";

const values = {
  "open": {
    opacity: 1, y: [0, -40, 0], height: "100%",
  },
  "closed": {
    opacity: 0, y: [0, 100], height: 0
  }
}

const FullMenu = (props) => {
  const cartContext = useContext(CartContext);
  const [items, setItems] = useState(cartContext.items === null ? [] : cartContext.items);
  const [showMenu, setShowMenu] = useState(cartContext.showMenu);
  useEffect(() => {
    if (cartContext.items !== null) setItems([...cartContext.items]);
    else setItems([]);
  }, [cartContext.items]);
  useEffect(() => {
    setShowMenu(cartContext.showMenu);
  }, [cartContext.showMenu]);

  const addItemHandler = (fdc_id) => {
    cartContext.items.map(item => {
      if (item.fdc_id === fdc_id) {
        let itemToAdd = JSON.parse(JSON.stringify(item));
        if (item.amount > 150) {
          itemToAdd.amount = 100;
        } else {
          itemToAdd.amount = 10;
        }
        cartContext.addItems(itemToAdd);
      }
    });
  };

  const decreaseItemHandler = (fdc_id) => {
    let currentamount = cartContext.items.find(e => e.fdc_id == fdc_id).amount;
    if (currentamount > 150) {
      cartContext.decreaseItems(fdc_id, 100);
    } else if (currentamount > 19) {
      cartContext.decreaseItems(fdc_id, 10);
    } else if (currentamount > 0) {
      cartContext.decreaseItems(fdc_id, 1);
    }
  };

  const deleteItemHandler = (fdc_id) => {
    cartContext.removeItems(fdc_id);
  }

  return <motion.div animate={showMenu ? "open" : "closed"} variants={values}
                     transition={{duration: 0.3}}>
    <div className={styles.todayMenuContainer}>
      <div className={styles.todayMenuClose}>
        <h3>Today's {cartContext.currentMeal} Menu</h3>
        <FontAwesomeIcon icon="times" width="14px" height="14" onClick={props.clickClose} style={{cursor: "pointer"}}/>
      </div>
      <div className={styles.todayMenuItem}>
        {items.map(item => {
          return <TodayMenuItem key={item.fdc_id} fdc_id={item.fdc_id} name={item.name} num={item.amount}
                                addItemHandler={addItemHandler}
                                decreaseItemHandler={decreaseItemHandler} deleteItemHandler={deleteItemHandler}/>
        })}
      </div>
      <div className={styles.todayMenuSubmit}> The meal will be saved after the meal period ends.</div>
      {/*<Button type="primary" className={styles.todayMenuSubmit}>Submit Meal</Button>*/}
    </div>
  </motion.div>
}

export default FullMenu;