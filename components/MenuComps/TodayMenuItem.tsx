import React, {useEffect, useState} from 'react';
import styles from './TodayMenuItem.module.scss'
import {Input} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {pointer} from "popmotion";

const TodayMenuItem = (props) => {
  const [num, setNum] = useState(props.num);
  useEffect(() => {
    setNum(props.num);
  }, [props.num]);

  return <div className={styles.todayMenuItemContainer}>
    <div className={styles.todayMenuItemName}>
      {props.name}
    </div>
    <div className={styles.todayMenuItemInput}>
      <FontAwesomeIcon icon="plus" width="14" onClick={props.addItemHandler.bind(this, props.id, )}
                       style={{cursor: "pointer"}}/>
      <Input value={num} type="number" size="middle"
             style={{display: "inline", width: "60px", margin: "0 1rem"}} onChange={props.changed}/>
      <FontAwesomeIcon icon="minus" width="14" onClick={props.deleteItemHandler.bind(this, props.id)}
                       style={{cursor: "pointer"}}/>
    </div>

  </div>;
}

export default TodayMenuItem;