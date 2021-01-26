import React, {useEffect, useState} from "react";

export const LogInContext = React.createContext(
  {
    isShown: false,
    show: () => {
    },
    close: () => {
    },
  }
)

const LogInContextProvider = (props) => {
  const [isShown, setIsShown] = useState(false);

  const showLoginHandler = () => {
    setIsShown(true);
    console.log(isShown);
  }
  const closeLoginHandler = () => {
    setIsShown(false);
    console.log(isShown);
  }

  return (
    <LogInContext.Provider
      value={{
        isShown: isShown,
        show: showLoginHandler,
        close: closeLoginHandler,
      }}>{props.children}</LogInContext.Provider>
  )
}

export default LogInContextProvider;