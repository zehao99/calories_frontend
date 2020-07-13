import {FoodDetail} from "../../types/food";
import ErrorPage from 'next/error'
import {Table} from "antd";
import dynamic from "next/dynamic";
import SimpleBarcode from "../../components/barcode";
import React from "react";
import {GetServerSideProps} from "next";
import {motion} from "framer-motion";
const BACKEND_HOST = process.env.BACKEND_HOST ;

const BACKEND_PORT = process.env.BACKEND_PORT ;

const PieChart = dynamic(
  () => import('../../components/pie-chart'),
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
export default function FoodDetailPage(foodDetail: FoodDetail) {
  if (foodDetail === null) {
    return <ErrorPage statusCode={404}/>
  }
  const protein = foodDetail.nutrition.find(x => x.metric_name === "Protein").amount
  const carb = foodDetail.nutrition.find(x => x.metric_name === 'Carbohydrate, by difference').amount
  const fat = foodDetail.nutrition.find(x => x.metric_name === 'Total lipid (fat)').amount
  const columns = [
    {
      title: <span style={{fontWeight: 700}}>Metrics</span>,
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
  return <motion.div initial={{opacity: 0, y: -200, width : "100%"}} animate={{opacity: 1, y: 0 , width : "100%"}}
                     exit={{opacity: 0, y: 0 , width : "100%"}}>
    <div className="food-detail-container">
    <div className="food-detail">
      <div className="detail-grid">
        <h1 className="food-detail-title"
            style={{padding: "0.5rem 1.3rem", marginTop: "1rem"}}>{foodDetail.name.toLowerCase()}</h1>
        <h2 className="food-detail-brand" style={{padding: "0.5rem 1.3rem"}}>{foodDetail.brand}</h2>
        <h2 className="food-detail-category" style={{padding: "0.5rem 1.3rem"}}>{foodDetail.category}</h2>
        <h2 className="food-detail-serving" style={{padding: "0.5rem 1.3rem"}}>
          Serving: {foodDetail.serving_description} ({foodDetail.serving_size} {foodDetail.serving_size_unit})
        </h2>

        <h3 className="food-detail-ingredients" style={{padding: "0.5rem 1.3rem"}}>
          <strong>Ingredients:</strong> {foodDetail.ingredients !== null ? foodDetail.ingredients.toLowerCase() : "UNKNOWN"}
        </h3>
        <div className="food-detail-gtin" style={{padding: "0.5rem 1rem"}}>
          <SimpleBarcode height={40} width={2} label={foodDetail.gtin_upc}/></div>
        <div className="food-detail-img">
          <PieChart protein={protein} carb={carb} fat={fat}/>
        </div>
      </div>
      <Table columns={columns} dataSource={foodDetail.nutrition} pagination={false} rowKey="metric_name"
             className="food-detail-table"/>
    </div>
    </div>
    { /*language=CSS*/}
    <style jsx>{
        `
        .food-detail-container {
          display: flex;
          flex-direction: column;
          margin: auto;
          max-width: 1000px;
        }

        .food-detail {
          margin: 6rem 2rem;
          padding: 0rem;
          padding-bottom: 2.5rem;
          border-radius: 20px;
          background: rgba(240, 240, 240, 0.8);
        }

        .detail-grid {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-areas: 
            'food-detail-title  food-detail-img'
            'food-detail-brand  food-detail-img'
            'food-detail-category food-detail-img'
            'food-detail-serving food-detail-gtin'
            'food-detail-ingredients  food-detail-ingredients';
          grid-gap: 0rem;
          padding: 1rem;
        }

        .food-detail-serving {
          grid-area: food-detail-serving;
        }

        .food-detail-category {
          grid-area: food-detail-category;
        }

        .food-detail-title {
          text-transform: capitalize;
          font-weight: 500;
          grid-area: food-detail-title;
        }

        .food-detail-brand {
          grid-area: food-detail-brand;
        }

        .food-detail-gtin {
          grid-area: food-detail-gtin;
        }

        .food-detail-img {
          grid-area: food-detail-img;
          height: auto;
          width: 100%;
          margin: auto;
          border-radius: 20px;
          object-fit: cover;
          align-self: center;
          justify-self: center;
        }

        .food-detail-ingredients {
          grid-area: food-detail-ingredients;
          line-height: 2rem;
        }

        @media (max-width: 500px) {
          .food-detail {
            padding: 0rem;
            padding-bottom: 2.5rem;
            border-radius: 20px;
          }

          .detail-grid {
            grid-template-columns: 1fr;
            grid-template-areas:
                    'food-detail-title'
                    'food-detail-brand'
                    'food-detail-category'
                    'food-detail-serving'
                    'food-detail-img'
                    'food-detail-gtin'
                    'food-detail-ingredients';
            padding: 0rem;
          }

          .food-detail {
            margin: 5rem 1rem;
          }

          .food-detail-ingredients {
            height: 0px;
            width: 0px;
            overflow: hidden;
            padding: 0;
            margin: 0;
            opacity: 0;
          }

          .food-detail-img {
            width: 100%;
          }

          .food-detail-table {
            border-top-left-radius: 0 !important;
            border-top-right-radius: 0 !important;
          }

          .food-detail-title {
            padding: 0.3rem;
          }

        }
      `
    }

    </style>
  </motion.div>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {params} = context;
  const response = await fetch(`http://${BACKEND_HOST}:${BACKEND_PORT}/api/food?fdc_id=` + params.foodid);
  const foodDetail: FoodDetail = response.ok ? (await response.json()) : null;
  return {
    props: foodDetail
  }
}
