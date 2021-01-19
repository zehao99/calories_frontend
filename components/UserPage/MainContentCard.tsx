import React, {useState} from "react";
import styles from "./MainContentCard.module.scss";
import {MealOnID, MealsOnDate} from "../../types/userDetail";
import {calculateEnergyForOneDay, calculateSumForOneDay, padDays} from "../../utils/calculations";
import {nutritionNameMap} from "../../utils/translateNutrient";
import LineChart from "./LineChart";


const MainContentCard = (props) => {
  const meals:Array<MealsOnDate> = props.meals.meals_on_date;
  const [nutrientID, setNutrientID] = useState("1008");
  const days:Array<Date> = meals.map((m) => {
    return new Date(m.date);
  });
  const parameterOnDay = meals.map((m) => {
    return calculateSumForOneDay(m.meals_on_id, nutrientID);
  })

  const displayData = padDays(days, parameterOnDay);

  return(<div className={styles.mainContentContainer}>
    <div className={styles.lineChartArea}>
      <LineChart nutrientName={nutritionNameMap[nutrientID]} data={displayData}/>
    </div>
  </div>);
}

export default MainContentCard;