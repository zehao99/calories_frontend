import React, {useContext, useEffect, useState} from "react";
import {Button} from "antd";
import styles from "./FullMenu.module.scss";
import TodayMenuItem from "./TodayMenuItem";
import {CartContext} from "../../context/cart-context"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {motion} from "framer-motion";

const FullMenu = (props) => {
  const cartContext = useContext(CartContext);
  const [items, setItems] = useState(cartContext.items === null ? []: cartContext.items);
  useEffect(()=>{
    if(cartContext.items !== null) setItems([...cartContext.items]);
    else setItems([]);
  },[cartContext.items]);

  const addItemHandler = (fdcid) => {
    cartContext.items.map(item => {
      if (item.fdcid === fdcid) {
        let itemToAdd = JSON.parse(JSON.stringify(item));
        if(item.portion > 150){
          itemToAdd.portion = 100;
        }else{
          itemToAdd.portion = 10;
        }
        cartContext.addItems(itemToAdd);
      }
    });
  };



  const decreaseItemHandler = (fdcid) => {
    let currentPortion = cartContext.items.find(e=> e.fdcid == fdcid).portion;
    if(currentPortion > 150){
      cartContext.decreaseItems(fdcid, 100);
    }else if(currentPortion > 19){
      cartContext.decreaseItems(fdcid, 10);
    }else if(currentPortion > 0){
      cartContext.decreaseItems(fdcid, 1);
    }
  };

  const deleteItemHandler = (fdcid) => {
    cartContext.removeItems(fdcid);
  }

  return <motion.div initial={{opacity: 0, y: -100, height: "100%"}} animate={{opacity: 1, y: 0, height: "100%"}}
                     exit={{opacity: 0, y: 0, height: "100%"}}>
  <div className={styles.todayMenuContainer}>
    <div className={styles.todayMenuClose}>
      <h3>Today's Menu</h3>
      <FontAwesomeIcon icon="times" width="14px" height="14" onClick={props.clickClose} style={{cursor: "pointer"}}/>
    </div>
    <div className={styles.todayMenuItem}>
      {items.map(item => {
        return <TodayMenuItem key={item.fdcid} fdcid={item.fdcid} name={item.name} num={item.portion} addItemHandler={addItemHandler}
                              decreaseItemHandler={decreaseItemHandler} deleteItemHandler={deleteItemHandler}/>
      })}
    </div>
    <Button type="primary" className={styles.todayMenuSubmit}>Submit Meal</Button>
  </div>
  </motion.div>
}

export default FullMenu;