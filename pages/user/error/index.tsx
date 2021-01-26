import React from "react";
import styles from "./UserNoDataErrorPage.module.scss";
import Link from "next/link";
import {Button} from "antd";

export default function UserNoDataErr(props) {
  return (<div className={styles.noDataPrompt}>
    <div className={styles.promptContainer}>
      <p>No User Data. <br/> Please add some food to your meal.</p>
      <Link href={"/"}>
        <Button type="primary"> Back to Home </Button>
      </Link>
    </div>
  </div>)
}