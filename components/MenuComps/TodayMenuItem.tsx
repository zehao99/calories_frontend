import React, {useEffect, useState} from 'react';
import styles from './TodayMenuItem.module.scss'
import {InputNumber} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {pointer} from "popmotion";
import Router from "next/router";

const TodayMenuItem = (props) => {
  const [num, setNum] = useState(props.num);
  useEffect(() => {
    setNum(props.num);
  }, [props.num]);

  function formatter(value) {
    if (typeof value  === "string"){
      value = value.replace(/[^\d]/g,'')
      return `${value} g`;
    }
  }

  const routeToDetailHandler = ()=>{
    Router.push({
      pathname: '/details/'+props.fdcid,
    }).then(() => window.scrollTo(0, 0));
  }

  return <div className={styles.todayMenuItemContainer}>
    <div className={styles.todayMenuItemName} onClick={routeToDetailHandler}>
      {props.name}
    </div>
    <div className={styles.todayMenuItemInput}>
      <FontAwesomeIcon icon="plus" width="14" onClick={props.addItemHandler.bind(this, props.fdcid)}
                       style={{cursor: "pointer"}}/>
      <InputNumber value={num} size="middle" formatter={formatter}
             style={{display: "inline", width: "80px", margin: "0 1rem"}} onChange={props.changed}/>
      <FontAwesomeIcon icon="minus" width="14" onClick={props.deleteItemHandler.bind(this, props.fdcid)}
                       style={{cursor: "pointer"}}/>
    </div>

  </div>;
}

export default TodayMenuItem;