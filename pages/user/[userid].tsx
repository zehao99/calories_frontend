import {GetServerSideProps} from "next";
import {FoodNutrient, FoodBio, MealOnID, MealsOnDate, UserDetail} from "../../types/userDetail";
import translateNutrient from "../../utils/translateNutrient";
import React, {useContext, useEffect, useState} from "react";
import PopupAlert from "../../components/popup-alert";
import styles from "./userid.module.scss";
import {AuthContext} from "../../context/auth-context";
import Router from "next/router"
import UserSummaryCard from "../../components/UserPage/UserSummaryCard";
import MainContentCard from "../../components/UserPage/MainContentCard";

const BACKEND_HOST = process.env.BACKEND_HOST;

const BACKEND_PORT = process.env.BACKEND_PORT;



export default function UserPage(userDetail: UserDetail) {
  const authContext = useContext(AuthContext);

  const mealsOnDays: Array<MealsOnDate> = userDetail.meals_on_date;
  const meals = mealsOnDays ? mealsOnDays.map((a) => a.meals_on_id) : null;
  const days = mealsOnDays ? mealsOnDays.map((a) => a.date) : null;
  const mealsOfMostRecentDay = !meals || meals.length === 0 ? [] : meals[meals.length - 1];
  const mostRecentDay = !meals || meals.length === 0 ? new Date().toISOString().slice(0, 10) : days[days.length-1];


  return (<div className={styles.userInfoContainer}>
    <div className={styles.userSummaryContainer}>
      <UserSummaryCard user={authContext.userInfo} mostRecentDay={mostRecentDay} mostRecentDayMeal={mealsOfMostRecentDay}/>
    </div>
    <div className={styles.mainUserContentContainer}>
       <MainContentCard meals={userDetail}/>
    </div>
  </div>)
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await fetch(`http://${BACKEND_HOST}:${BACKEND_PORT}/user/get_all_meals`, {
    credentials: "include",
    headers: {
      "cookie": ctx.req ? ctx.req.headers.cookie : undefined,
    }
  });
  if (!response.ok){
    ctx.res.writeHead(302, { Location: '/user/error' });
    ctx.res.end();
  }
  const userDetail = await response.json();
  console.log(userDetail);
  return {
    props: userDetail
  }
}