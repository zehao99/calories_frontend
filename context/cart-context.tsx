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
  userToken: "",
  showMenu: false,
  toggleMenu: ()=>{},
  addItems: (item) => {
  },
  removeItems: (itemFcdId) => {
  },
  decreaseItems: (itemFcdId, portion) => {
  },
  setItems: (items) => {
  },
  changeItem: (portion ,itemFdcId) => {},
  setUserToken: (userToken) => {}
});

const CartContextProvider = (props) => {
  const [item, setItem] = useState([]);
  const [userToken, setUserToken] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenuHandler = ()=>{
    setShowMenu(!showMenu);
  }

  const addItemsHandler = (itemInput) => {
    setItem((prevItem) => {
      let isNew = true;
      if (prevItem !== null) {
        prevItem.map(item => {
          if (item.fdcid === itemInput.fdcid) {
            item.portion += itemInput.portion;
            isNew = false;
          }
        })
      } else {
        localStorage.setItem("userCart" + userToken, JSON.stringify([itemInput]))
        return [itemInput];
      }
      if (isNew) prevItem.push(itemInput);
      localStorage.setItem("userCart" + userToken, JSON.stringify([...prevItem]))
      return [...prevItem];
    });
  }

  const removeItemsHandler = (itemFdcId) => {
    setItem((prevItem) => {
      prevItem = prevItem.filter((e) => e.fdcid !== itemFdcId);
      localStorage.setItem("userCart" + userToken, JSON.stringify([...prevItem]));
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
        // prevItem = prevItem.filter(item => item.portion > 0);
      }
      if (!isPresent) console.log("Item don't exist.");
      localStorage.setItem("userCart" + userToken, JSON.stringify([...prevItem]));
      return [...prevItem];
    });
  }

  const changeItemHandler = (portion ,itemFdcId) => {
    setItem(prevItem => {
      if (prevItem !== null) {
        prevItem.map(item => {
          if (item.fdcid === itemFdcId) {
            item.portion = parseInt(portion);
          }
        })
        localStorage.setItem("userCart" + userToken, JSON.stringify([...prevItem]))
        return [...prevItem];
      }
    })
  }

  const setItemHandler = (items) => {
    setItem(items);
    localStorage.setItem("userCart" + userToken, JSON.stringify(item));
  }
  const setUserTokenHandler = (userTokenNew)=> {
    setUserToken(userTokenNew);
  }

  return <CartContext.Provider value={{
    items: item,
    userToken: userToken,
    showMenu: showMenu,
    toggleMenu: toggleMenuHandler,
    addItems: addItemsHandler,
    removeItems: removeItemsHandler,
    decreaseItems: decreaseItemsHandler,
    setItems: setItemHandler,
    changeItem: changeItemHandler,
    setUserToken: setUserTokenHandler
  }}>{props.children}</CartContext.Provider>
}
export default CartContextProvider;