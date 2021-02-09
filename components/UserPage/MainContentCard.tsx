import React, {useEffect, useState} from "react";
import styles from "./MainContentCard.module.scss";
import {MealsOnDate} from "../../types/userDetail";
import {calculateAllNutritionsInLastNDays, calculateSumForOneDay, padDays} from "../../utils/calculations";
import {nutrientUnitMap, nutritionNameMap} from "../../utils/translateNutrient";
import {Calendar, Table, TreeSelect} from "antd";
import MealsOnDateCard from "./MealsOnDateCard";
import dynamic from "next/dynamic";
import {motion} from "framer-motion";

const LineChart = dynamic(
  () => import('../../components/Charts/LineChart'),
  {ssr: false}
)
const PieChart = dynamic(
  () => import('../../components/Charts/PieChart'),
  {ssr: false}
)


const {TreeNode} = TreeSelect;
type tableColumn = {
  name: string,
  amount: number,
  unit: string,
}

const columns = [
  {
    title:
      <span style={{fontWeight: 700}}>Metrics </span>,
    dataIndex: 'name',
    key: 'name',
    render: text => <span style={{fontWeight: 600}}>{nutritionNameMap[text]}</span>,
  },
  {
    title: <span style={{fontWeight: 700}}>Amount</span>,
    dataIndex: 'amount',
    key: 'amount',
    render: text => <span style={{fontWeight: 500}}>{text}</span>,
  },
  {
    title: <span style={{fontWeight: 700}}>Unit</span>,
    dataIndex: 'unit',
    key: 'unit',
    render: text => <span style={{fontWeight: 500}}>{nutrientUnitMap[text]}</span>,
  }]

const getMealsOnDate = (mealsOnDate: Array<MealsOnDate>, date: string): MealsOnDate => {
  const newArr = mealsOnDate.filter((meals) => meals.date === date);
  if (newArr.length === 0) {
    const blankMealsOnDate = {date: date, meals_on_id: null};
    return blankMealsOnDate;
  } else {
    return newArr[0];
  }
}

const dateToString = (date: Date): string => {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return date.getFullYear() + "-" + m.toString().padStart(2, '0') + "-" + d.toString().padStart(2,'0');
}

const MainContentCard = (props) => {
  const today = new Date();
  const meals: Array<MealsOnDate> = props.meals.meals_on_date;
  const [daysSelected, setDaysSelected] = useState(7);
  const [allNutritionInOneWeek, setAllNutritionInOneWeek] = useState({});
  const [tableColumns, setTableColumns] = useState([]);
  const [dateToDisplay, setDateToDisplay] = useState(dateToString(today));
  const [nutrientID, setNutrientID] = useState("1008");
  const [mealsOnDate, setMealsOnDate] = useState(getMealsOnDate(meals, dateToString(today)));

  const days: Array<Date> = meals.map((m) => {
    return new Date(m.date);
  });
  const parameterOnDay = meals.map((m) => {
    return calculateSumForOneDay(m.meals_on_id, nutrientID);
  })
  const displayData = padDays(days, parameterOnDay);

  useEffect(() => {
    const tempAllNutrition = calculateAllNutritionsInLastNDays(props.meals, daysSelected);
    setAllNutritionInOneWeek(tempAllNutrition);
    const tempColumns = []
    for (let key in tempAllNutrition) {
      tempColumns.push({name: key, amount: Math.floor(tempAllNutrition[key] / daysSelected), unit: key});
    }
    setTableColumns(tempColumns);
  }, [daysSelected]);


  useEffect(() => {
    const mealsRequested = getMealsOnDate(meals, dateToDisplay);
    setMealsOnDate(mealsRequested);
  }, [dateToDisplay])

  const onDaysChange = (val) => {
    setDaysSelected(val);
  }

  function onChange(value) {
    value = new Date(value.toString());
    setDateToDisplay(dateToString(value));
  }

  return (
    <motion.div initial={{opacity: 0, y: 100, width: "100%"}} animate={{opacity: 1, y: 0, width: "100%"}}
                exit={{opacity: 0, y: 0, width: "100%"}}>
      <div className={styles.calendarViewOfFood}>
        <div className={styles.calendarArea}>
          <Calendar fullscreen={false} onSelect={onChange}/>
        </div>
        <div className={styles.dailyFood}>
          <MealsOnDateCard data={mealsOnDate}/>
        </div>
      </div>
      <div className={styles.mainContentContainer}>
        <div className={styles.lineChartTitle}>
          Trend of {nutritionNameMap[nutrientID]} Intake
        </div>
        <div className={styles.lineChartArea}>
          <LineChart nutrientName={nutritionNameMap[nutrientID] + "(kCal)"} data={displayData}/>
        </div>
        <div className={styles.pieChartTitle}>
          Composition of your Energy Intake in the Past {daysSelected} Days
        </div>
        <div className={styles.daysSelector}>
          <div style={{flex: 1}}/>
          <TreeSelect
            showSearch
            className={styles.treeSelector}
            value={daysSelected ? daysSelected.toString() + " Days" : "0 Days"}
            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
            placeholder="Select Day Range"
            allowClear
            treeDefaultExpandAll
            onChange={onDaysChange}>
            <TreeNode value="2" title="2 Days"/>
            <TreeNode value="3" title="3 Days"/>
            <TreeNode value="5" title="5 Days"/>
            <TreeNode value="7" title="7 Days"/>
            <TreeNode value="14" title="14 Days"/>
            <TreeNode value="30" title="30 Days"/>
            <TreeNode value="150" title="150 Days"/>
            <TreeNode value="365" title="1 Year"/>
          </TreeSelect>
        </div>
        <div className={styles.pieChartArea}>
          <PieChart protein={allNutritionInOneWeek["1003"]} carb={allNutritionInOneWeek["1005"]}
                    fat={allNutritionInOneWeek["1004"]}/>
        </div>
        <div className={styles.tableTitle}>
          Average Nutrient Intake in Past {daysSelected} Days
        </div>
        <div className={styles.tableArea}>
          <Table columns={columns} dataSource={tableColumns} pagination={false} rowKey="name"
                 className="user-nutrient-tracker-table"/>
        </div>
      </div>
    </motion.div>);
}

export default MainContentCard;