import React, {useState} from "react";

export const CartContext = React.createContext({
// item structure {
//   fdc_id : xxxxxx;
//   name: xxxxxx;
//   portion: xxxxxx;
//   energyPer100g: xxxxxx;
//   energyUnit: xxxxx;
// }
  items: [],
  itemNum: 0,
  addItems: (item) => {
  },
  removeItems: (itemFcdId) => {
  },
  decreaseItems: (itemFcdId, portion) => {
  },
  setItems: (items) => {
  },
  changeItem: (portion ,itemFdcId) => {}
});

const CartContextProvider = (props) => {
  const [item, setItem] = useState([]);
  const [itemNum, setItemNum] = useState(0);

  const addItemsHandler = (itemInput) => {
    setItem((prevItem) => {
      let isNew = true;
      console.log(itemInput);
      if (prevItem !== null) {
        prevItem.map(item => {
          if (item.fdcid === itemInput.fdcid) {
            console.log(item.portion);
            item.portion += itemInput.portion;
            console.log(item.portion);
            isNew = false;
          }
        })
      } else {
        localStorage.setItem("userCart", JSON.stringify([itemInput]))
        return [itemInput];
      }
      if (isNew) prevItem.push(itemInput);
      console.log(isNew, prevItem);
      localStorage.setItem("userCart", JSON.stringify([...prevItem]))
      return [...prevItem];
    });
  }

  const removeItemsHandler = (itemFdcId) => {
    setItem((prevItem) => {
      prevItem.filter((e) => e.itemFdcId !== itemFdcId);
      localStorage.setItem("userCart", JSON.stringify([...prevItem]));
      return [...prevItem]
    });
  }

  const decreaseItemsHandler = (itemFdcId, portion) => {
    setItem((prevItem) => {
      let isPresent = false;
      if (prevItem !== null) {
        prevItem.map(item => {
          if (item.fdcid === itemFdcId) {
            item.portion -= portion;
            isPresent = true;
          }
        })
        prevItem = prevItem.filter(item => item.portion > 0);
      }
      if (!isPresent) console.log("Item don't exist.");
      localStorage.setItem("userCart", JSON.stringify([...prevItem]));
      return [...prevItem];
    });
  }

  const changeItemHandler = (portion ,itemFdcId) => {
    setItem(prevItem => {
      console.log(portion, itemFdcId);
      if (prevItem !== null) {
        prevItem.map(item => {
          if (item.fdcid === itemFdcId) {
            console.log(item);
            item.portion = parseInt(portion);
          }
        })
        localStorage.setItem("userCart", JSON.stringify([...prevItem]))
        return [...prevItem];
      }
    })
  }

  const setItemHandler = (items) => {
    setItem(items);
  }

  return <CartContext.Provider value={{
    items: item,
    itemNum: itemNum,
    addItems: addItemsHandler,
    removeItems: removeItemsHandler,
    decreaseItems: decreaseItemsHandler,
    setItems: setItemHandler,
    changeItem: changeItemHandler,
  }}>{props.children}</CartContext.Provider>
}
export default CartContextProvider;