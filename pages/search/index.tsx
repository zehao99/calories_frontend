import Router, {useRouter} from 'next/router'
import React, {useEffect} from "react";
import FoodCard from "../../components/food-card";
import SearchBar from "../../components/SearchBar";
import {GetServerSideProps} from "next";
import {SearchResponse} from "../../types/food";
import {motion} from "framer-motion";
import {Pagination} from "antd";
import styles from "./searchResult.module.scss";

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
    <div className={styles.contentContainer}>
      <motion.div initial={{opacity: 1, y: -200, width: "100%"}} animate={{opacity: 1, y: 0, width: "100%"}}
                  exit={{opacity: 0, y: 0, width: "100%"}}>
        <div className={styles.searcharea}>

          {/*<h1 id= "1" >Burn Your Fat Off!</h1>*/}
          <SearchBar value={q}/>
        </div>
      </motion.div>
      <div className={styles.results}>
        {
          results.map(result => {
            return <FoodCard {...result} key={result.fdc_id}/>
          })
        }
      </div>
      <Pagination defaultCurrent={1} current={currentPage} total={totalPages} onChange={changePages} showSizeChanger={false}/>
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