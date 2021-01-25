import React from "react";
import styles from "./MealsOnDateCard.module.scss";
import {MealOnID} from "../../types/userDetail";
import {ParseIDToMeal} from "../../utils/parseMeal";
import {capitalizeFirstLetter} from "../../utils/stringOperation";
import Link from "next/link";


export default function MealsOnDateCard(props) {
  const mealsOnId: Array<MealOnID> = props.data.meals_on_id;
  return (<div className={styles.mealsOnDateCard}>
    {!mealsOnId ? <div>Nothing Had On {props.data.date.split('-').join('.') + '.'}</div> :
      mealsOnId.map((meal) => {
        return (<div key={meal.meal_id} className={styles.mealOnIdCard}>
          <p className={styles.mealName}>{ParseIDToMeal(meal.meal_id)}</p>
          <p>{meal.meals.map((food) => <Link key={food.fdc_id} as={`/details/${food.fdc_id}`}
                                             href={"/details/[foodid]"}><a>{capitalizeFirstLetter(food.description)}</a></Link>)}</p>
        </div>);
      })
    }
  </div>)
}