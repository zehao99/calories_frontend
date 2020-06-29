import {FoodDetail} from "../../types/food";
import ErrorPage from 'next/error'
import {Table} from "antd";
import dynamic from "next/dynamic";
import SimpleBarcode from "../../components/barcode";
import React from "react";

const PieChart = dynamic(
  () => import('../../components/pie-chart'),
  {ssr: false}
)
type FoodDetailProps = {
  err: {
    statusCode: number
  },
  foodDetail: FoodDetail
}
export default function FoodDetailPage(props: FoodDetailProps) {
  const {err, foodDetail} = props
  if (err) {
    return <ErrorPage statusCode={err.statusCode}/>
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
  return <div className="food-detail-container">
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
      <Table columns={columns} dataSource={foodDetail.nutrition} pagination={false} className="food-detail-table"/>
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
  </div>
}

FoodDetailPage.getInitialProps = async (context) => {
  const {query} = context;
  const response = await fetch('http://localhost:8000/food?fdc_id=' + query.foodid);
  if (response.ok) {
    const foodDetail = await response.json();
    return {foodDetail};
  } else {
    return {
      err: {statusCode: 404}
    };
  }
}