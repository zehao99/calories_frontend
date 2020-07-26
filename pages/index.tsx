import {useEffect, useState} from "react";
import {Input} from 'antd';
import {SearchResponse} from "../types/food";
import {motion} from "framer-motion";
import SearchBar from "../components/SearchBar";
import styles from "./searchIndex.module.scss";

const {Search} = Input;

export default function Home({data}) {
  useEffect(() => {
    //
    console.log("V11")
    var WINDOW_SIZE = window.innerHeight;
    var div = document.getElementsByClassName('container')[0];
    console.log(div)
    div.setAttribute('style', `height:${WINDOW_SIZE}px`);
  });
  const [results, setResults] = useState<SearchResponse>([]);


  return (
    <div className={styles.contentContainer}>
      <motion.div initial={{opacity: 0, y: 100, width: "100%"}} animate={{opacity: 1, y: 0, width: "100%"}}
                  exit={{opacity: 0, y: 0, width: "100%"}}>
        <div className={styles.searcharea}>

          <h1 id= "1" >Burn Your Fat Off!</h1>
          <SearchBar value={""}/>
        </div>
      </motion.div>
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
