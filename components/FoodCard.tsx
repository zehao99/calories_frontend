import {Card} from 'antd';
import Link from "next/link";

type Nutrition = {
  amount: number
  name: string
  metric_name: string
}


type Food = {
  fdc_id: string
  name: string
  category: string
  brand: string
  gtin_upc: string,
  nutrition: Array<Nutrition>

}
export default function FoodCard(food: Food) {
  return <Link as={`./details/${food.fdc_id}`} href="/details/[foodid]">
    <Card hoverable style={{width: "100%", height: "100%", borderRadius: "20px"}}>
      <h3>{food.name}</h3>
      <p>{food.category}</p>
    </Card>
  </Link>
}
