import {GetServerSideProps} from "next";
import {UserDetail} from "../../types/userInfo";
import React, {useContext, useEffect, useState} from "react";
import PopupAlert from "../../components/popup-alert";
import {AuthContext} from "../../context/auth-context";
import Router from "next/router";
import UserSummaryCard from "../../components/UserPage/SummaryCard";

const BACKEND_HOST = process.env.BACKEND_HOST;

const BACKEND_PORT = process.env.BACKEND_PORT;

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

  return (<div style={{position: "absolute",top:"calc(50vh)", left:"calc(50vw)"}}><UserSummaryCard/></div>)
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const {params} = context;
  // const response = await fetch(`http://${BACKEND_HOST}:${BACKEND_PORT}/api/food?fdc_id=` + params.foodid);
  // const userDetail: UserDetail = response.ok ? (await response.json()) : {};
  // console.log("foodDetail"+userDetail)
  const userdetail = params;
  return {
    props: userdetail
  }
}