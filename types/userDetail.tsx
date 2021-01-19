export type FoodNutrient = {
  [key: string] : number,
}

export type FoodBio = {
  fdc_id: number,
  description: string,
  amount:number,
  nutrient: Array<FoodNutrient>,
}

export type MealOnID = {
  meal_id : number,
  meals: Array<FoodBio>
}

export type MealsOnDate = {
  date: string,
  meals_on_id: Array<MealOnID>
}

export type UserDetail = {
  user_id : number,
  meals_on_date : Array<MealsOnDate>
}