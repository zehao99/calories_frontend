import Router, {useRouter} from 'next/router'
import React, {useEffect} from "react";
import FoodCard from "../../components/food-card";
import SearchBar from "../../components/SearchBar";
import {GetServerSideProps} from "next";
import {SearchResponse} from "../../types/food";
import {motion} from "framer-motion";
import {Pagination} from "antd";

const BACKEND_HOST = process.env.BACKEND_HOST;

const BACKEND_PORT = process.env.BACKEND_PORT;
const COUNT_PER_PAGE = 12;

const Post = (props) => {
  const router = useRouter()
  // @ts-ignore
  const q: string = router.query.q
  const results = props.food;

  const totalPages = Math.ceil(10 * props.total / 12);
  const currentPage = props.currentPage;

  function changePages(page) {
    Router.push({
      pathname: '/search',
      query: {
        q: q,
        page: page
      },
    }).then(() => window.scrollTo(0, 0));
  }

  return (
    <div className="content-container">
      <motion.div initial={{opacity: 1, y: -200, width: "100%"}} animate={{opacity: 1, y: 0, width: "100%"}}
                  exit={{opacity: 0, y: 0, width: "100%"}}>
        <div className="searcharea">

          {/*<h1 id= "1" >Burn Your Fat Off!</h1>*/}
          <SearchBar value={q}/>
        </div>
      </motion.div>
      <div className="results">
        {
          results.map(result => {
            return <FoodCard {...result} key={result.fdc_id}/>
          })
        }
      </div>
      <Pagination defaultCurrent={1} current={currentPage} total={totalPages} onChange={changePages}/>
      { /*language=CSS*/}
      <style jsx>{`
        .content-container {
          margin: auto;
          max-width: 1000px;
          display: flex;
          padding: 0 1rem 2rem;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .searcharea {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          maxwidth: 600px;
          width: 100%;
          margin: 1rem auto;
          margin-top: 5rem;
          /*transform: translateY(-100px);*/
        }

        .results {
          display: grid;
          width: 100%;
          grid-template-columns: 1fr 1fr 1fr;
          grid-gap: 1rem;
          align-items: center;
          margin-top: 0.5rem;
          margin-bottom: 3rem;
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
          .results {
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
            margin-top: 1rem;
            margin-bottom: 1rem;
          }

          .searcharea {
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
export const getServerSideProps: GetServerSideProps = async (context) => {
  const {query} = context;
  // @ts-ignore
  const page: number = query.page ? parseInt(query.page) : 1;
  const offset = (page - 1) * COUNT_PER_PAGE;

  const results: SearchResponse = await
    fetch(`http://${BACKEND_HOST}:${BACKEND_PORT}/api/search?keywords=${query.q}&offset=${offset}&limit=${COUNT_PER_PAGE}`)
      .then((response) => {
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
  return {
    props: {currentPage: page, ...results}
  }
}

export default Post