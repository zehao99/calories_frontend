export function ParseMealToID(mealname) {
  switch (mealname) {
    case "Breakfast" :
      return 1;
    case "Brunch" :
      return 2;
    case "Lunch" :
      return 3;
    case "Afternoon Tea" :
      return 4;
    case "Dinner" :
      return 5;
    case "Don't Eat" :
      return 6;
    default:
      return 0;
  }
}

export function ParseIDToMeal(mealID) {
  switch (mealID) {
    case 1 :
      return "Breakfast";
    case 2 :
      return "Brunch";
    case 3 :
      return "Lunch";
    case 4 :
      return "Afternoon Tea";
    case 5 :
      return "Dinner";
    case 6 :
      return "Don't Eat";
    default:
      return "Don't Eat";
  }
}
