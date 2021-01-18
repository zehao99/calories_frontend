import {GetServerSideProps} from "next";
import {MealOnID, MealsOnDate, UserDetail} from "../../types/userInfo";
import React, {useContext, useEffect, useState} from "react";
import PopupAlert from "../../components/popup-alert";
import {AuthContext} from "../../context/auth-context";
import Router from "next/router";
import UserSummaryCard from "../../components/UserPage/SummaryCard";

const BACKEND_HOST = process.env.BACKEND_HOST;

const BACKEND_PORT = process.env.BACKEND_PORT;

export default function UserPage(userDetail: UserDetail) {
  const authContext = useContext(AuthContext);
  const [isAuth, setIsAuth] = useState(authContext.isAuth);
  useEffect(() => {
    setIsAuth(authContext.isAuth);
  }, [authContext.isAuth]);

  useEffect(() => {
    if (!isAuth) {
      Router.push({
        pathname: '/',
      }).then(() => window.scrollTo(0, 0));
    }
  }, [])

  const mealsOnDays: Array<MealsOnDate> = userDetail.meals_on_date;
  const meals = mealsOnDays.map((a) => a.meals_on_id)
  const days = mealsOnDays.map((a) => a.date)
  const mealsOfMostRecentDay = meals[meals.length - 1];


  return (<div
    style={{position: "absolute", top: "calc(50vh)", left: "calc(50vw)"}}>{JSON.stringify(userDetail)}<UserSummaryCard/>
  </div>)
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await fetch(`http://${BACKEND_HOST}:${BACKEND_PORT}/user/get_all_meals`, {
    credentials: "include",
    headers: {
      "cookie": ctx.req ? ctx.req.headers.cookie : undefined,
    }
  });
  const userDetail = response.ok ? (await response.json()) : {};
  console.log(userDetail);
  return {
    props: userDetail
  }
}