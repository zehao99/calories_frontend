import React, {useEffect, useState} from "react";
import styles from "./UserSummaryCard.module.scss";
import {calculateEnergyForOneDay, calculateBMR} from "../../utils/calculations";
import {MealOnID} from "../../types/userDetail";
import dynamic from "next/dynamic";
import monthTransfer, {dayTransfer} from "../../utils/monthTransfer";

const Gauge = dynamic(
  () => import('../../components/UserPage/GaugeChart'),
  {ssr: false}
)



const UserSummaryCard = (props) => {
  const time = new Date(props.mostRecentDay);
  const dd = String(time.getDate()).padStart(2, '0');
  const mm = String(time.getMonth() + 1).padStart(2, '0');

  const [totalEnergy, setTotalEnergy] = useState(calculateEnergyForOneDay(props.mostRecentDayMeal));

  const bmrApprox = calculateBMR(184, 76.7, 24, "Male")

  useEffect(() => {
    setTotalEnergy(calculateEnergyForOneDay(props.mostRecentDayMeal));
  }, [props])

  return(<div className={styles.summaryCardContainer}>
    <p className={styles.gaugeTitle}>Calories Intake on {monthTransfer(mm) + ' ' + dayTransfer(dd)}</p>
    <div className={styles.valueGauge}>
      <Gauge min={0} max={Math.floor(bmrApprox / 0.8)} value={totalEnergy}/>
    </div>
    <div className={styles.nameTag}>
      <p>{totalEnergy > bmrApprox + 400 ? "You PIG!! " + props.user.display_name : props.user.display_name}</p>
    </div>
    <div>
      <p>Height: {"N/A"} cm</p>
      <p>Weight: {"N/A"} kg</p>
      <p>Age: {"N/A"}</p>
      <p>Gender: {"Male"}</p>
      <p>BMR: {bmrApprox} kCal/Day</p>
    </div>
  </div>);
}

export default UserSummaryCard;