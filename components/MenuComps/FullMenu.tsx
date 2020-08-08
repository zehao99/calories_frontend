import React, {useState} from "react";
import {Button} from "antd";
import styles from "./FullMenu.module.scss";
import TodayMenuItem from "./TodayMenuItem";

const FullMenu = (props) => {
  const [items, setItems] = useState([
    {
      id: "1",
      name: "salmon",
      num: 1
    },
    {
      id: "2",
      name: "shit",
      num: 1
    }
  ])

  const addItemHandler = (id) => {
    console.log("shit", id);
    setItems(prevState => {
      prevState.map(item => {
        if (item.id === id) {
          item.num = item.num + 1;
          console.log(item.num);
        }
      });
      let newState = [...prevState];
      newState = newState.filter(item => item.num > 0);
      return newState;
    });
  };

  const changeItemHandler = (event, id) => {
    setItems(prevState => {
      prevState.map(item => {
        if (item.id === id) {
          if (event.target.value === "") item.num = 0;
          else item.num = parseInt(event.target.value);
          console.log(typeof (item.num));
        }
      });
      let newState = [...prevState];
      return newState;
    });
  }

  const deleteItemHandler = (id) => {
    setItems(prevState => {
      prevState.map(item => {
        if (item.id === id) {
          item.num -= 1;
          console.log(item.num);
        }
      });
      let newState = [...prevState];
      newState = newState.filter(item => item.num > 0);
      return newState;
    });
  };

  return <div className={styles.todayMenuContainer}>
    <div className={styles.todayMenuItem}>
      {items.map(item => {
        console.log(item.id, item.num);
        return <TodayMenuItem id={item.id} name={item.name} num={item.num} addItemHandler={addItemHandler}
                              deleteItemHandler={deleteItemHandler}
                              changed={event => changeItemHandler(event, item.id)}/>
      })}
    </div>
    <Button type="primary" className={styles.todayMenuSubmit}>Add</Button>
  </div>
}

export default FullMenu;