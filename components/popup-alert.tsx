import React from "react";
import {Button} from "antd";

const PopupAlert = (props) => {
  return (
    <React.Fragment>
    <div className="error-container" onClick={props.onClickHandler}></div>
    <div className="error-pop-card">
      <h3>{props.title}</h3>
      <p>{props.message}</p>
      <Button type = "primary" onClick={props.onClickHandler} style={{margin: "1rem"}}>Close</Button>
    </div>
    <style>
      {/* language=CSS*/}
      {`
        .error-container {
            z-index: 50;
            position: fixed;
            top:0;
            left: 0;
            height: 100vh;
            width: 100%;
            background: rgba(0,0,0,0.5);
        }
        .error-pop-card {
            z-index: 100;
            position: fixed;
            top: calc(50% - 8rem);
            left: calc(50% - 7.5rem);
            
            background-color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 15rem;
            max-width: 300px;
            border-radius: 20px;
        }
        .error-pop-card h3{
            font-size: 1rem;
            text-align: center;
            padding: 1rem;
        }
        .error-pop-card p{
            text-align: center;
            padding: 1rem 1rem;
            margin: 1rem 0;
        }
      `}
    </style>

    </React.Fragment>)
};

export default PopupAlert;