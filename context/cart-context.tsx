import React,{useState} from "react";

export const CartContext = React.createContext({
// item structure {
//   fdc_id : xxxxxx;
//   name: xxxxxx;
//   portion: xxxxxx;
//   energy: xxxxxx;
// }
  items: [],
  itemNum: 0,
  addItems: (item)=>{},
  removeItems: (itemFcdId)=>{},
});

const CartContextProvider = (props) => {
  const [item, setItem] = useState([]);
  const [itemNum, setItemNum] = useState(0);

  const addItemsHandler = (itemInput) => {

    setItem((prevItem) => {
      prevItem.push(itemInput)
      return [...prevItem];
    });
    console.log(item);
    setItemNum( prevState => prevState+1);
  }
  const removeItemsHandler = (itemFdcId) => {
    setItem((prevItem) => {
      return[...prevItem.filter((e)=> e.itemFdcId !== itemFdcId)]
    });
    setItemNum(prevState => prevState-1);
  }
  return <CartContext.Provider value={{items: item,itemNum: itemNum, addItems: addItemsHandler, removeItems: removeItemsHandler}}>{props.children}</CartContext.Provider>
}
export default CartContextProvider;