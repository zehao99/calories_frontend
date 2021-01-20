import React, {useEffect, useState} from "react";
import styles from "./UserSummaryCard.module.scss";
import {calculateEnergyForOneDay, calculateBMR} from "../../utils/calculations";
import {MealOnID} from "../../types/userDetail";
import dynamic from "next/dynamic";
import monthTransfer, {dayTransfer} from "../../utils/monthTransfer";

const Gauge = dynamic(
  () => import('../Charts/GaugeChart'),
  {ssr: false}
)

const retainOneDigit = (num : number): number => {
  return Math.round(num * 10) / 10;
}

const UserSummaryCard = (props) => {
  const time = new Date(props.mostRecentDay);
  const dd = String(time.getDate()).padStart(2, '0');
  const mm = String(time.getMonth() + 1).padStart(2, '0');

  const [totalEnergy, setTotalEnergy] = useState(calculateEnergyForOneDay(props.mostRecentDayMeal));
  const bmrApprox = calculateBMR(props.user.height, props.user.weight, props.user.age, props.user.gender);

  useEffect(() => {
    setTotalEnergy(calculateEnergyForOneDay(props.mostRecentDayMeal));
  }, [props])

  return(<div className={styles.summaryCardContainer}>
    <div className={styles.nameTag}>
      <p>{totalEnergy > bmrApprox + 400 ? "You PIG!! " + props.user.display_name : "Hi! " + props.user.display_name}</p>
    </div>
    <p className={styles.gaugeTitle}> Here's Your Calories Intake<br />on {monthTransfer(mm) + ' ' + dayTransfer(dd)}</p>
    <div className={styles.valueGauge}>
      <Gauge min={0} max={Math.floor(bmrApprox / 0.8)} value={totalEnergy}/>
    </div>
    <div>
      <p>Height: {retainOneDigit(props.user.height)} cm</p>
      <p>Weight: {retainOneDigit(props.user.weight)} kg</p>
      <p>Age: {props.user.age}</p>
      <p>Gender: {props.user.gender}</p>
      <p>BMR: {bmrApprox} kCal/Day</p>
    </div>
  </div>);
}

export default UserSummaryCard;