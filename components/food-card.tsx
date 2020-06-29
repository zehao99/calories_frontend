import {Card, Tag} from 'antd';
import {Food} from "../types/food";
import NutritionTags from "./nutrition-tags";
import Link from "next/link";
import {motion} from "framer-motion";

const food_card = (prop) => {
  return (
    <motion.div initial={{opacity: 0, y: -100, height: "100%"}} animate={{opacity: 1, y: 0, height: "100%"}}
                exit={{opacity: 0, y: 0, height: "100%"}} >
      <Card hoverable style={{minWidth: "300px", height: "100%", borderRadius: "20px"}}>
        <div className="card-content">
          <h3>{prop.name.toLowerCase()}</h3>
          <p>{prop.brand}</p>
          <NutritionTags nutrition={prop.nutrition}/>
        </div>
        { /*language=CSS*/}
        <style jsx>{`
          .card-animate {
            height: 100%;
          }
            
          h3{
            text-transform: capitalize;
          }
          
          .card-content {
            margin: auto;
            max-width: 360px;
          }
        `}</style>
      </Card>
    </motion.div>);
}

export default function FoodCard(food: Food) {
  return <Link as={`/details/${food.fdc_id}`} href="/details/[foodid]">
    <a className="foodcard-link" target="_blank" style={{height: "100%"}}>{food_card(food)}</a>
  </Link>
}
