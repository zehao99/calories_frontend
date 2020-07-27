import React from "react";
import ReactDOM from "react-dom";
import {Button} from "antd";
import {motion} from "framer-motion";

const PopupAlert = (props) => {
  return (
    <React.Fragment>

      <div className="error-container" onClick={props.onClickHandler}></div>
      <motion.div initial={{opacity: 0, y: -10}} animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: 0}}>
        <div className="error-pop-card">
          <h3>{props.title}</h3>
          <p>{props.message}</p>
          <Button type="primary" onClick={props.onClickHandler} style={{margin: "1rem"}}>Close</Button>
        </div>
      </motion.div>
      <style>
        {/* language=CSS*/}
        {`
          .error-container {
            z-index: 50;
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100%;
            background: rgba(0, 0, 0, 0.5);
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

          .error-pop-card h3 {
            font-size: 1rem;
            text-align: center;
            padding: 1rem;
          }

          .error-pop-card p {
            text-align: center;
            padding: 1rem 1rem;
            margin: 1rem 0;
          }
        `}
      </style>

    </React.Fragment>)
};

const PopModal = WrappedComponent => {
  function EnhancedComponent(props) {
    return (<WrappedComponent onClickHandler={props.onClose} message={props.message} title={props.title}/>);
  }

  EnhancedComponent.show = params => {
    let container = document.createElement("div");
    document.body.appendChild(container);

    function closeHandle() {
      ReactDOM.unmountComponentAtNode(container);
      document.body.removeChild(container);
      container = null;
    }

    ReactDOM.render(<EnhancedComponent {...params} onClose={closeHandle}/>, container);
  };

  return EnhancedComponent;
};


export default PopModal(PopupAlert);