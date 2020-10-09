export type FoodBio = {
  fdc_id: number,
  name: string,
  amount:number,
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