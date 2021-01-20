import React, {useEffect, useState} from "react";

const BACKEND_HOST = process.env.BACKEND_HOST;

const BACKEND_PORT = process.env.BACKEND_PORT;

export const CartContext = React.createContext({
// item structure {
//   fdc_id : xxxxxx;
//   name: xxxxxx;
//   amount: xxxxxx;
//   energyPer100g: xxxxxx;
//   energyUnit: xxxxx;
// }
  items: [],
  // current meal:
  // 1 : breakfast
  // 2 : brunch
  // 3 : lunch
  // 4 : afternoon tea
  // 5 : dinner
  // 6 : don't eat
  currentMeal: "",
  showMenu: false,
  getItems: ()=>{},
  toggleMenu: ()=>{},
  addItems: (item) => {
  },
  removeItems: (itemFcdId) => {
  },
  decreaseItems: (itemFcdId, amount) => {
  },
  setItems: (items) => {
  },
  changeItem: (amount ,itemfdc_id) => {},
});

const getMealFromHour = (hour) => {
  if(hour < 10){
    return "Breakfast";
  }else if(hour < 12){
    return "Brunch";
  }else if(hour < 14){
    return "Lunch";
  }else if(hour < 17){
    return "Afternoon Tea";
  }else if(hour < 21){
    return "Dinner";
  }else{
    return "Don't Eat";
  }
}

const CartContextProvider = (props, cartInfo) => {
  const [item, setItem] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const now = new Date()
  const [currentMeal, setCurrentMeal] = useState(getMealFromHour(now.getHours()));

  const  GetMenu = async ()=>{
    console.log("fetching original data")
    let url = "/api/this_meal";
    const response = await fetch(url,{method:"POST", body: JSON.stringify({
        currentMeal: currentMeal
      })})
    if (response.ok){
      let data = await response.json();
      // data = JSON.parse(data);
      setItem(data);
      console.log("cart info fetched",data);
    }else{
      console.log("Failed to fetch initial menu, please login")
    }
  }

  useEffect(()=>{
    // setItem(cartInfo);
    const temp = new Date();
    const mealName = getMealFromHour(temp.getHours());
    setCurrentMeal(mealName);
    GetMenu().then();
  },[])

  const toggleMenuHandler = ()=>{
    GetMenu();
    setShowMenu(!showMenu);
  }

  const  SubmitMenu = async (fdc_id, amount)=>{

    console.log("Request Adding", fdc_id, amount);
    const response = await fetch(`/api/add_meal`,{method:"POST", body: JSON.stringify({
        currentMeal: currentMeal,
        fdc_id: fdc_id,
        amount: amount
      })})
    if (response.ok){
      const data = await response.json()
    }
  }

  const  DeleteMenu = async (fdc_id)=>{
    console.log("Request Deleting");
    const response = await fetch(`/api/delete_meal`,{method:"POST", body: JSON.stringify({
        currentMeal: currentMeal,
        fdc_id: fdc_id
      })})
    if (response.ok){
      const data = await response.json()
    }
  }

  const addItemsHandler = (itemInput) => {
    setItem((prevItem) => {
      let isNew = true;
      if (prevItem !== null) {

        prevItem.map(item => {
          if (item.fdc_id === itemInput.fdc_id) {
            item.amount += itemInput.amount;
            console.log(itemInput);
            SubmitMenu(item.fdc_id,item.amount);
            isNew = false;
          }
        })
      } else {
        return [itemInput];
      }
      if (isNew) prevItem.push(itemInput);
      return [...prevItem];
    });
  }

  const removeItemsHandler = (itemfdc_id) => {
    setItem((prevItem) => {
      prevItem = prevItem.filter((e) => e.fdc_id !== itemfdc_id);
      DeleteMenu(itemfdc_id);
      return [...prevItem]
    });
  }

  const decreaseItemsHandler = (itemfdc_id, amount) => {
    setItem((prevItem) => {
      let isPresent = false;
      if (prevItem !== null) {
        prevItem.map(item => {
          if (item.fdc_id === itemfdc_id) {
            item.amount -= amount;
            SubmitMenu(item.fdc_id,item.amount);
            isPresent = true;
          }
        })
        // prevItem = prevItem.filter(item => item.amount > 0);
      }
      if (!isPresent) console.log("Item don't exist.");

      return [...prevItem];
    });
  }

  const changeItemHandler = (amount ,itemfdc_id) => {
    setItem(prevItem => {
      if (prevItem !== null) {
        SubmitMenu(itemfdc_id,amount);
        prevItem.map(item => {
          if (item.fdc_id === itemfdc_id) {
            item.amount = parseInt(amount);
          }
        })

        return [...prevItem];
      }
    })
  }

  const setItemHandler = (items) => {
    setItem(items);
  }

  return <CartContext.Provider value={{
    items: item,
    showMenu: showMenu,
    currentMeal: currentMeal,
    getItems: GetMenu,
    toggleMenu: toggleMenuHandler,
    addItems: addItemsHandler,
    removeItems: removeItemsHandler,
    decreaseItems: decreaseItemsHandler,
    setItems: setItemHandler,
    changeItem: changeItemHandler
  }}>{props.children}</CartContext.Provider>
}

// @ts-ignore
export default CartContextProvider;
