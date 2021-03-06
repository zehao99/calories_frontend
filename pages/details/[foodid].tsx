import {FoodDetail} from "../../types/food";
import ErrorPage from 'next/error'
import {Table, Select, Slider, InputNumber, Button} from "antd";
import dynamic from "next/dynamic";
import SimpleBarcode from "../../components/barcode";
import React, {useEffect, useState, useContext} from "react";
import {GetServerSideProps} from "next";
import {motion} from "framer-motion";
import styles from "./foodDetail.module.scss";
import PortionTag from "../../components/PortionTag";
import {CartContext} from "../../context/cart-context";
import {AuthContext} from "../../context/auth-context";
import {LogInContext} from "../../context/loginform-context";
import PopupAlert from "../../components/popup-alert";

const BACKEND_HOST = process.env.BACKEND_HOST;

const BACKEND_PORT = process.env.BACKEND_PORT;

const {Option} = Select;

const PieChart = dynamic(
  () => import('../../components/Charts/PieChart'),
  {ssr: false}
)
type FoodDetailProps = {
  props: {
    err: {
      statusCode: number
    },
    foodDetail: FoodDetail
  }
}
type Portion = {
  amount: number,
  unit: string,
  description: string
}
export default function FoodDetailPage(foodDetail: FoodDetail) {

  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const logInContext = useContext(LogInContext);
  if (Object.keys(foodDetail).length === 0 && foodDetail.constructor === Object)
    return <ErrorPage statusCode={404}/>


  function formatter(value) {
    if (typeof value === "string") {
      value = value.replace(/[^\d]/g, '')
      return `${value} g`;
    }
  }

  let ingredientsInfo = foodDetail.ingredients;
  if (ingredientsInfo === null) {
    ingredientsInfo = "";
  }

  const wordCount = (ingredientsInfo) => {
    const wordArray = ingredientsInfo.toLowerCase().split(" ");
    return wordArray ? wordArray.length : 0;
  }

  const [foodIngredients, setFoodIngredients] = useState(ingredientsInfo.toLowerCase().replace(/^((?:\S+\s+){20}\S+).*/, "$1") + '...')

  const [isShowMore, setIsShowMore] = useState(false);


  useEffect(() => {
    console.log(isShowMore);
    if (isShowMore || wordCount(ingredientsInfo) < 20) {
      setFoodIngredients(ingredientsInfo.toLowerCase());
    } else {
      setFoodIngredients(ingredientsInfo.toLowerCase().replace(/^((?:\S+\s+){20}\S+).*/, "$1") + '...');
    }
  }, [isShowMore]);

  const toggleMoreTextHandle = () => {
    setIsShowMore(!isShowMore);
  }

  function parser(value) {
    if (typeof value === "string") {
      value = value.replace(/[^\d]/g, '')
      return value.replace(' g', '')
    }
  }

  const [portion, setPortion] = useState(100);

  const currentNutrition = foodDetail.nutrition
    .map(({amount, unit_name, metric_name}) => {
      return {
        unit_name,
        amount: Math.floor(amount * portion) / 100,
        metric_name
      }
    })
  const protein_object = foodDetail.nutrition.find(x => x.metric_name === "Protein");
  const protein = protein_object === undefined ? 0 : protein_object.amount;
  const carb_object = foodDetail.nutrition.find(x => x.metric_name === 'Carbohydrate, by difference');
  const carb = carb_object === undefined ? 0 : carb_object.amount;
  const fat_object = foodDetail.nutrition.find(x => x.metric_name === 'Total lipid (fat)');
  const fat = fat_object === undefined ? 0 : fat_object.amount;
  const allPortions: Array<Portion> = [
    {
      amount: 100,
      unit: "g",
      description: ""
    }]
  if (foodDetail.serving_size !== null) {
    allPortions.push(
      {
        amount: foodDetail.serving_size,
        unit: foodDetail.serving_size_unit,
        description: foodDetail.serving_description
      })
  }
  if (foodDetail.portions !== null) {
    for (const p of foodDetail.portions) {
      allPortions.push({
        amount: p.gram,
        unit: "g",
        description: p.description
      })
    }
  }
  const columns = [
    {
      title:
        <span style={{fontWeight: 700}}>Metrics </span>,
      dataIndex: 'metric_name',
      key: 'metric_name',
      render: text => <span style={{fontWeight: 600}}>{text}</span>,
    },
    {
      title: <span style={{fontWeight: 700}}>Amount</span>,
      dataIndex: 'amount',
      key: 'amount',
      render: text => <span style={{fontWeight: 500}}>{text}</span>,

    },
    {
      title: <span style={{fontWeight: 700}}>Unit</span>,
      dataIndex: 'unit_name',
      key: 'unit_name',
      render: text => <span style={{fontWeight: 500}}>{text}</span>,
    }]

  let showMoreText = "";
  if (wordCount(ingredientsInfo) > 20) {
    showMoreText = isShowMore ? "Show Less" : "Show More";
  }

  const PortionClickHandler = (props) => {
    setPortion(props.amount);
  }

  const SubmitMenu = async (fdc_id, portion) => {
    console.log("Request Adding", fdc_id, portion);
    const response = await fetch(`/api/add_meal`, {
      method: "POST", body: JSON.stringify({
        currentMeal: cartContext.currentMeal,
        fdc_id: fdc_id,
        amount: portion,
      })
    })
    if (response.ok) {
      const data = await response.json()
    }
  }

  const addMenuItemHandler = () => {
    //Current testing
    if (!authContext.isAuth) {
      logInContext.show();
    } else {
      console.log(foodDetail);
      let energyPerHundredGram = 0;
      let energyUnit = "KCAL";
      if (foodDetail.nutrition != null) {
        foodDetail.nutrition.map(item => {
          if (item.metric_name == "Energy") {
            energyPerHundredGram = item.amount;
            energyUnit = item.unit_name;
          }
        })
      }
      let item = {
        fdc_id: foodDetail.fdc_id,
        name: foodDetail.name,
        amount: portion,
        energyPerHundredGram: energyPerHundredGram,
        energyUnit: energyUnit
      }
      // SubmitMenu(foodDetail.fdc_id, portion);
      cartContext.addItems(item);
      console.log(item);
      PopupAlert.show({
        title: "Added Item",
        message: foodDetail.name + " " + portion + 'g'
      });
    }
  }

  return <motion.div initial={{opacity: 0, y: -200, width: "100%"}} animate={{opacity: 1, y: 0, width: "100%"}}
                     exit={{opacity: 0, y: 0, width: "100%"}}>
    <div className={styles.foodDetailContainer}>
      <div className={styles.foodDetail}>
        <div className={styles.detailGrid}>
          <h1 className={styles.foodDetailTitle}
              style={{padding: "0.5rem 1.3rem", marginTop: "1rem"}}>{foodDetail.name.toLowerCase()}</h1>
          <h2 className={styles.foodDetailBrand} style={{padding: "0.5rem 1.3rem"}}>{foodDetail.brand}</h2>
          <h2 className={styles.foodDetailCategory} style={{padding: "0.5rem 1.3rem"}}>{foodDetail.category}</h2>
          <h2 className={styles.foodDetailServing} style={{padding: "0.5rem 1.3rem"}}>
            {
              foodDetail.serving_size ? "Serving:" + foodDetail.serving_description + "(" + foodDetail.serving_size + foodDetail.serving_size_unit + ")" : null
            }
          </h2>

          <h3 className={styles.foodDetailIngredients} style={{padding: "0.5rem 1.3rem"}}>
            <strong>Ingredients:</strong> {foodDetail.ingredients !== null ? foodIngredients + ' ' : "UNKNOWN" + ' '}
            <a onClick={toggleMoreTextHandle}>{showMoreText} </a>
          </h3>
          <div className={styles.foodDetailGtin} style={{padding: "0.5rem 1rem"}}>
            {foodDetail.gtin_upc ? <SimpleBarcode height={40} width={2} label={foodDetail.gtin_upc}/> : null}
          </div>
          <div className={styles.foodDetailPie}>
            <PieChart protein={protein} carb={carb} fat={fat}/>
          </div>
          <div className={styles.portionInput}>
            <div className={styles.sliderContainer}>
              <div className={styles.slider}>
                <Slider
                  min={0}
                  max={1000}
                  defaultValue={100}
                  range={false}
                  // @ts-ignore
                  onChange={(v) => setPortion(v)}
                  // @ts-ignore
                  onAfterChange={(v) => setPortion(v)}
                  value={typeof portion === 'number' ? portion : 0}
                  step={1}
                />
              </div>
              <div className={styles.input}>
                <InputNumber
                  min={0}
                  max={1000}
                  style={{margin: '0 16px'}}
                  step={1}
                  defaultValue={100}
                  value={portion}
                  formatter={formatter}
                  parser={parser}
                  onChange={(v) => {

                    // @ts-ignore
                    setPortion(v);
                  }}
                />
              </div>
            </div>
            <div className={styles.portionTags}>
              {allPortions.map((e) => {
                return <PortionTag key={e.description} amount={e.amount} unit={e.unit} description={e.description}
                                   onClickHandler={PortionClickHandler}/>
              })}
              <Button type="primary" onClick={addMenuItemHandler}>Add to Meal</Button>
            </div>
          </div>

        </div>
        <Table columns={columns} dataSource={currentNutrition} pagination={false} rowKey="metric_name"
               className="food-detail-table"/>
      </div>
    </div>
  </motion.div>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {params} = context;
  const response = await fetch(`http://${BACKEND_HOST}:${BACKEND_PORT}/api/food?fdc_id=` + params.foodid);
  const foodDetail: FoodDetail = response.ok ? (await response.json()) : {};
  return {
    props: foodDetail
  }
}
