import React, {useState} from "react";
import styles from "./MainContentCard.module.scss";
import {MealOnID, MealsOnDate} from "../../types/userDetail";
import {
  calculateAllNutritionsInLastWeek,
  calculateEnergyForOneDay,
  calculateSumForOneDay,
  padDays
} from "../../utils/calculations";
import {nutritionNameMap} from "../../utils/translateNutrient";
import LineChart from "./LineChart";
import PieChart from "../pie-chart";
import PieChartGeneral from "./PiieChartGeneral";


const MainContentCard = (props) => {
  const meals: Array<MealsOnDate> = props.meals.meals_on_date;
  const [nutrientID, setNutrientID] = useState("1008");
  const days: Array<Date> = meals.map((m) => {
    return new Date(m.date);
  });
  const parameterOnDay = meals.map((m) => {
    return calculateSumForOneDay(m.meals_on_id, nutrientID);
  })

  const displayData = padDays(days, parameterOnDay);
  const allNutritionInOneWeek = calculateAllNutritionsInLastWeek(props.meals);
  const nutritionNames: Array<string> = [];
  const nutritionAmounts: Array<number> = [];
  for (let key in allNutritionInOneWeek) {
    nutritionNames.push(nutritionNameMap[key]);
    nutritionAmounts.push(allNutritionInOneWeek[key]);
  }

  return (<div className={styles.mainContentContainer}>
    <div className={styles.lineChartTitle}>
      Trend of {nutritionNameMap[nutrientID]} Intake
    </div>
    <div className={styles.lineChartArea}>
      <LineChart nutrientName={nutritionNameMap[nutrientID] + "(kCal)"} data={displayData}/>
    </div>
    <div className={styles.pieChartTitle}>
      Composition of your Energy Intake in the Past Week
    </div>
    <div className={styles.pieChartArea}>
      <PieChart protein={allNutritionInOneWeek["1003"]} carb={allNutritionInOneWeek["1005"]}
                fat={allNutritionInOneWeek["1004"]}/>
    </div>
  </div>);
}

export default MainContentCard;