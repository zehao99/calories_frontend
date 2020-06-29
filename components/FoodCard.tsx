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
  return <Link as={`/details/${food.fdc_id}`} href="/details/[foodid]">
    <Card hoverable style={{ width: "100%", height: "100%", borderRadius: "20px"}}>
    <h3>{food.name}</h3>
    <p>{food.category}</p>
    </Card>

    {/*{ /*language=CSS*!/*/}
    {/*<style jsx>{`        .card {*/}
    {/*  border: #C4D9BF 1px solid;*/}
    {/*  padding: 1rem;*/}
    {/*  border-radius: 10px;*/}
    {/*  max-width: 300px;*/}
    {/*  width: 100%;*/}
    {/*  height: 200px;*/}
    {/*  margin: auto;*/}
    {/*  position: relative;*/}
    {/*  transform: scale(0.95);*/}
    {/*  transition: all 0.3s ease-in-out; /*overflow:hidden;*/}
    {/*}*/}
    {/*.card h3{*/}
    {/*    color: #3F734C;*/}
    {/*}*/}
    {/*.card:hover {*/}
    {/*  transform: scale(1);*/}
    {/*  box-shadow: 2px 2px 5px rgba(196, 217, 191, 0.85);*/}
    {/*}*/}

    {/*`}</style>*/}
  </Link>
}
