import React, {useContext, useEffect, useRef, useState} from 'react';
import styles from './TodayMenuItem.module.scss'
import {InputNumber} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {pointer} from "popmotion";
import Router from "next/router";
import {CartContext} from "../../context/cart-context";

const TodayMenuItem = (props) => {
  const cartContext = useContext(CartContext);
  const [num, setNum] = useState(props.num);
  const [amount, setamount] = useState(props.num);
  const inputRef = useRef();
  useEffect(() => {
    setamount(props.num);
  }, [props.num]);

  useEffect(()=> {
    // @ts-ignore
    let inputValRef = inputRef.current.input.value;
    inputValRef = parseInt(inputValRef);
    const timer = setTimeout(() => {
      if(amount === inputValRef) {
        cartContext.changeItem(amount, props.fdc_id);
      }
    },100);
    return () =>{
      clearTimeout(timer);
    }
  },[amount, inputRef]);

  function formatter(value) {
    if (typeof value  === "string"){
      value = value.replace(/[^\d]/g,'')
      return `${value} g`;
    }
  }

  const routeToDetailHandler = ()=>{
    Router.push({
      pathname: '/details/'+props.fdc_id,
    }).then(() => window.scrollTo(0, 0));
  }

  const changeValueHandler = (event) => {
    setamount(parseInt(event));
  }

  return <div className={styles.todayMenuItemContainer}>
    <div className={styles.todayMenuItemName} onClick={routeToDetailHandler}>
      {props.name}
    </div>
    <div className={styles.todayMenuItemInput}>
      <FontAwesomeIcon icon="plus" width="14" height="14" onClick={props.addItemHandler.bind(this, props.fdc_id)}
                       style={{cursor: "pointer"}}/>
      <InputNumber value={amount} size="middle" formatter={formatter} ref = {inputRef}
             style={{display: "inline", width: "60px", margin: "0 0.7rem"}} onChange={event => changeValueHandler(event)}/>
      <FontAwesomeIcon icon="minus" width="14" height="14" onClick={amount > 1 ? props.decreaseItemHandler.bind(this, props.fdc_id) : ()=>{}}
                       style={amount <= 1 ? {color:"lightgray"} : {cursor: "pointer"}}/>
      <FontAwesomeIcon icon="times" width="14" height="14" onClick={props.deleteItemHandler.bind(this, props.fdc_id)}
                       style={{cursor: "pointer", marginLeft: "0.7rem"}}/>
    </div>

  </div>;
}

export default TodayMenuItem;