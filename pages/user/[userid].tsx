import {GetServerSideProps} from "next";
import {FoodDetail} from "../../types/food";
import React, {useContext, useEffect, useState} from "react";
import PopupAlert from "../../components/popup-alert";
import {AuthContext} from "../../context/auth-context";
import Router from "next/router";

export default function UserPage(props){
  const authContext = useContext(AuthContext);
  const [isAuth, setIsAuth] = useState(authContext.isAuth);
  useEffect(()=>{
    setIsAuth(authContext.isAuth);
  },[authContext.isAuth]);

  useEffect(()=>{
    if(!isAuth){
      Router.push({
        pathname: '/',
      }).then(() => window.scrollTo(0, 0));
    }
  },[])

  return (<div style={{position: "absolute",top:"calc(50vh)", left:"calc(50vw)"}}>{props.userid}</div>)
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const {params} = context;
  // const response = await fetch(`http://${BACKEND_HOST}:${BACKEND_PORT}/api/food?fdc_id=` + params.foodid);
  // const userDetail: FoodDetail = response.ok ? (await response.json()) : {};
  // console.log("foodDetail"+userDetail)
  const userdetail = params;
  return {
    props: userdetail
  }
}