import React, {useEffect, useState} from "react";

const BACKEND_HOST = process.env.BACKEND_HOST;

const BACKEND_PORT = process.env.BACKEND_PORT;

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
  // current meal:
  // 1 : breakfast
  // 2 : brunch
  // 3 : lunch
  // 4 : afternoon tea
  // 5 : dinner
  // 6 : don't eat
  currentMeal: "",
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

const CartContextProvider = (props, cartInfo) => {
  const [item, setItem] = useState([]);
  const [userToken, setUserToken] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [currentMeal, setCurrentMeal] = useState("Don't Eat");

  const  GetMenu = async ()=>{
    console.log("fetching original data")
    let url = "/api/this_meal";
    const response = await fetch(url,{method:"POST", body: JSON.stringify({
        currentMeal: currentMeal,
        userToken: userToken
      })})
    if (response.ok){
      let data = await response.json();
      data = JSON.parse(data);
      setItem(data);
      localStorage.setItem("userCart" + userToken, JSON.stringify([...data]));
      console.log("cart info fetched",data);
    }else{
      console.log("Failed to fetch initial menu")
    }
  }

  useEffect(()=>{
    // setItem(cartInfo);
    console.log(cartInfo);
    let date = new Date();
    let hour = date.getHours();
    if(hour < 10){
      setCurrentMeal("Breakfast");
    }else if(hour < 12){
      setCurrentMeal("Brunch");
    }else if(hour < 14){
      setCurrentMeal("Lunch")
    }else if(hour < 17){
      setCurrentMeal("Afternoon Tea");
    }else if(hour < 21){
      setCurrentMeal("Dinner");
    }else{
      setCurrentMeal("Don't Eat")
    }
  },[])

  const toggleMenuHandler = ()=>{
    GetMenu();
    setShowMenu(!showMenu);
  }

  const  SubmitMenu = async (fdcid, portion)=>{

    console.log("Request Adding", fdcid, portion);
    const response = await fetch(`/api/add_meal`,{method:"POST", body: JSON.stringify({
        currentMeal: currentMeal,
        fdcid: fdcid,
        portion: portion,
        userToken: userToken
      })})
    if (response.ok){
      const data = await response.json()
    }
  }

  const  DeleteMenu = async (fdcid)=>{
    console.log("Request Adding");
    const response = await fetch(`/api/delete_meal`,{method:"POST", body: JSON.stringify({
        currentMeal: currentMeal,
        fdcid: fdcid,
        userToken: userToken
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
          if (item.fdcid === itemInput.fdcid) {
            item.portion += itemInput.portion;
            SubmitMenu(item.fdcid,item.portion);
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
      DeleteMenu(itemFdcId);
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
            SubmitMenu(item.fdcid,item.portion);
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
        SubmitMenu(itemFdcId,portion);
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
    currentMeal: currentMeal,
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
