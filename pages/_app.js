import 'antd/dist/antd.less';
import Head from 'next/head'
import React from "react";
import {config, library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {AnimatePresence} from "framer-motion";
import Navbar from "../components/navbar";
import AuthContextProvider from "../context/auth-context";
import CartContextProvider from "../context/cart-context";
import LogInContextProvider from "../context/loginform-context";
import Menu from "../components/Menu";

config.autoAddCss = false;
library.add(fas);
export default function MyApp({Component, pageProps}) {
  return <CartContextProvider><AuthContextProvider><LogInContextProvider><AnimatePresence exitBeforeEnter>
    <Head  key={"head"}>
      <title>Calories Search</title>
    </Head>
    <div className="container">
      <div className="navbar-bg">
        <div className="navbar">
          <Navbar/>
        </div>
        <div className="today-menu">
          <Menu />
        </div>
      </div>
      <Component {...pageProps}  key={"component"} />
    </div>
  </AnimatePresence>
  </LogInContextProvider>
  </AuthContextProvider>
  </CartContextProvider>

}