import {FoodBio, MealOnID} from "../types/userDetail";

export const calculateBMR = (height:number, weight:number, age:number, gender:"Male"|"Female"): number => {
  if(gender === "Male") {
    return Math.floor(67 + 13.73 * weight + 5 * height - 6.9 * age);
  } else {
    return Math.floor(661 + 9.6 * weight + 1.72 * height - 4.7 * age);
  }
}

export const calculateSumForOneFood = (food: FoodBio, nutrientName: string) : number => {
  let ans = food.amount;
  food.nutrient.forEach((n) => {
    if(n[nutrientName]) {
      ans *= n[nutrientName] / 100;
    }
  })
  return ans;
}

export const calculateSumForOneMeal = (meal: MealOnID, nutrientName: string): number => {
  let ans = 0;
  meal.meals.forEach((food) => {
    ans += calculateSumForOneFood(food, nutrientName);
  })
  return ans;
}

export const calculateSumForOneDay = (meals: Array<MealOnID>, nutrientName: string): number => {
  let totalEnergy = 0;
  if(meals && meals.length > 0) {
    meals.forEach((meal) => {
        totalEnergy += calculateSumForOneMeal(meal, nutrientName);
      })
    }
  return Math.floor(totalEnergy);
}

export const calculateEnergyForOneDay = (meals:Array<MealOnID>): number => {
  return calculateSumForOneDay(meals, "1008");
};

export const padDays = (days: Array<Date>, parameter: Array<number>) => {
  if(!days || !parameter) return {};
  if(days.length !== parameter.length) {
    throw new Error("Days and parameters dimension don't match.");
  }
  if(days.length === 0 && parameter.length === 0) return {};
  const firstDate: Date = days[0];
  const lastDate: Date = days[days.length - 1];
  let currDate = firstDate;
  let idx = 0;
  let paramAnsArr:Array<number> = [];
  let dateAnsArr:Array<string> = [];
  while(idx < days.length) {
    dateAnsArr.push(currDate.toISOString().slice(0, 10))
    if(currDate.toISOString().slice(0, 10) === days[idx].toISOString().slice(0, 10)) {
      paramAnsArr.push(parameter[idx]);
      idx ++;
    } else {
      paramAnsArr.push(0);
    }
    currDate.setDate(currDate.getDate() + 1);
  }
  return {dates: dateAnsArr, params: paramAnsArr};
}