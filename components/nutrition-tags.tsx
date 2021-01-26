import {Nutrition} from "../types/food";
import {Tag} from "antd";


type NutritionTagsProps = {
  nutrition: Array<Nutrition>
}
export default function NutritionTags(props: NutritionTagsProps) {
  if (!props.nutrition)
    return <></>
  const nutrition_brief = {
    protein: undefined, fat: undefined,
    carb: undefined, energy: undefined
  }
  props.nutrition.map(n => {
    switch (n.metric_name) {
      case "Protein":
        nutrition_brief.protein = "Protein: " + n.amount + " " + n.unit_name.toLowerCase();
        break;
      case "Total lipid (fat)":
        nutrition_brief.fat = "Fat: " + n.amount + " " + n.unit_name.toLowerCase();
        break;
      case "Carbohydrate, by difference":
        nutrition_brief.carb = "Carb: " + n.amount + " " + n.unit_name.toLowerCase();
        break;
      case "Energy":
        nutrition_brief.energy = "Energy: " + n.amount + " " + n.unit_name.toLowerCase();
        break;
    }
  })
  return <div className="grid-container">

    <Tag color="#3E3A31" className="nutrition-tag">{nutrition_brief.energy}</Tag>
    <Tag color="#D9AE79" className="nutrition-tag">{nutrition_brief.fat}</Tag>
    <Tag color="#747768" className="nutrition-tag">{nutrition_brief.protein}</Tag>
    <Tag color="#4C5451" className="nutrition-tag">{nutrition_brief.carb}</Tag>
    { /*language=CSS*/}
    <style jsx>{`
      .grid-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 0.5rem 0.5rem;
      }

      .nutrition-tag {
        font-size: 0.85rem;
      }
    `}
    </style>

  </div>

}

