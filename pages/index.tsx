import {useRef, useState} from "react";
import {Input} from 'antd';
import FoodCard from "../components/food-card";
import Navbar from "../components/navbar";
import {SearchResponse} from "../types/food";
import {motion, useCycle} from "framer-motion";
import { useDimensions } from "./use-dimentions";

const {Search} = Input;

export default function Home({data}) {
  const isOpen = useCycle(false, true);
  const [results, setResults] = useState<SearchResponse>([]);

  const search = async (keyword) => {
    // this.setState(items.clicked = true);
    const isOpen = true;
    console.log(isOpen);
    const data = await fetch(`http://localhost:8000/search?keywords=${keyword}`).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return [{
          fdc_id: 0,
          name: "Nothing Found",
          category: "",
          brand: "",
          gtin_upc: "",
          nutrition: []
        }];
      }
    });
    setResults(data);
  }

  return (
    <div className="content-container">
      <motion.div initial={{opacity: 0, y: 100, width:"100%"}} animate={{ opacity: 1, y: 0, width:"100%"}} exit={{opacity:0 , y: 0, width:"100%"}}>
        <div className="searcharea">

          {/*<h1 id= "1" >Burn Your Fat Off!</h1>*/}

          <Search
            placeholder="Search Any Food"
            enterButton="Search"
            size="large"
            onSearch={value => search(value)}
            style={{

              display: "flex !important",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "60px",
              maxWidth: "600px",
              margin: "20 auto important"
            }}
          />
        </div>
      </motion.div>
      <div className="results">
        {
          results.map(result => {
            return <FoodCard {...result} key={result.fdc_id}/>
          })
        }
      </div>
      { /*language=CSS*/}
      <style jsx>{`        
        .content-container {
          margin: auto;
          max-width: 1000px;
          display: flex;
          padding: 0 1rem;
          min-height: 100vh;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .searcharea{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            maxwidth: 600px;
            width: 100%;
            margin: 1rem auto;
            /*transform: translateY(-100px);*/
        }
        .results {
          display: grid;
          width: 100%;
          grid-template-columns: 1fr 1fr 1fr;
          grid-gap: 1rem;
          align-items: center;
          margin-top: 0.5rem;
          margin-bottom: 2rem;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        h1 {
            color: #345C44;
            font-size: 3rem;
        }
        
        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }
        
        @media (max-width: 1000px) and (min-width: 701px) {
            .results{
                grid-template-columns: 1fr 1fr;
                align-items: center;
                justify-content: center;
            }        
        }
        
        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
            
          }
          
          h1 {
            color: #345C44;
            font-size: 1.5rem;
            margin-top: 5rem;
          }
            
          .results {
            grid-template-columns: 1fr;
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>

    </div>

  )
}

// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch(`http://localhost:8000/food/742612`)
//   const data = await res.json()
//   console.log(data)
//   // Pass data to the page via props
//   return {props: {data}}
// }
