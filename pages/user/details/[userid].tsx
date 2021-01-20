import React, {useContext, useState} from "react";
import {AuthContext} from "../../../context/auth-context";
import styles from "./editInfoPage.module.scss";
import {Button, Input, Radio} from "antd";
import {value} from "popmotion";
import PopupAlert from "../../../components/popup-alert";

export default function InfoPage(props) {
  const authContext = useContext(AuthContext);
  const [inputInfoEdit, setInputInfoEdit] = useState({
    height: {
      check: (val) => {return val < 250 && val > 90},
      value: 0,
      alertMsg: "! Please Enter Height between 90 cm and 250 cm",
      showAlert: false,
    },
    weight: {
      check: (val) => {return val < 200 && val > 20},
      value: 0,
      alertMsg: "! Please Enter Weight between 20 kg amd 200 kg",
      showAlert: false,
    },
    age: {
      check: (val) => {return val >= 0 && val < 150},
      value: 0,
      alertMsg: "! Please Enter Age between 0 amd 150",
      showAlert: false,
    },

    gender: {
      check: (val) => {return val === "Male" || val === "Female" || val === "Default"},
      value: "Male",
      alertMsg: null,
      showAlert: false,
    }
  })

  const signupInputChangedHandler = (event, inputIdentifier) => {
    if(event.persist) event.persist();
    setInputInfoEdit((prevState) => {
      if(event.target != null) prevState[inputIdentifier].value = event.target.value;
      if(!prevState[inputIdentifier].check(event.target.value)) prevState[inputIdentifier].showAlert = true;
      else prevState[inputIdentifier].showAlert = false;
      return {...prevState};
    });
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = {};
    let flag = true;
    for(let key in inputInfoEdit){
      if(!inputInfoEdit[key].check(inputInfoEdit[key].value)) {
        flag = false;
        break;
      } else {
        formData[key] = inputInfoEdit[key].value;
      }
    }
    if(flag) {
      console.log(inputInfoEdit);
      const response = await fetch(`/api/update_user_info`, {
        method: "POST",
        body: JSON.stringify(formData),
      })
      if(response.ok){
        PopupAlert.show({
          title: "Edit Submitted",
          message: "Your info is recorded, please go back to the home page."
        })
      } else {
        PopupAlert.show({
          title: "Network Error",
          message: "Please try again later."
        })
      }
    } else {
      PopupAlert.show({
        title: "Error",
        message: "There's error in your input values, please check."
      })
    }
  }

  return (<div className={styles.editPageContainer}>
    <form onSubmit={submitHandler} className={styles.editForm}>
      <h3>Hi! {authContext.userInfo.displayed_name}, please input your information here. </h3>
      <h4 className={styles.editFormAlert}>This is a experimenting project, we cannot assure the safety of your data.</h4>
      <div className={styles.editFormElements}>
        <h4 className={styles.editFormInputTitle}>Height</h4>
        <h4 className={styles.editFormInputAlert} style={{color:"red"}}>{inputInfoEdit.height.showAlert ? inputInfoEdit.height.alertMsg : null}</h4>
        <Input className={styles.editFormInput} type={"number"} placeholder={"Please enter your height"} onChange={(e) => signupInputChangedHandler(e, "height")}/>
      </div>
      <div className={styles.editFormElements}>
        <h4 className={styles.editFormInputTitle}>Weight</h4>
        <h4 className={styles.editFormInputAlert} style={{color:"red"}}>{inputInfoEdit.weight.showAlert ? inputInfoEdit.weight.alertMsg : null}</h4>
        <Input className={styles.editFormInput} type={"number"} placeholder={"Please enter your weight"} onChange={(e) => signupInputChangedHandler(e, "weight")}/>
      </div>
      <div className={styles.editFormElements}>
        <h4 className={styles.editFormInputTitle}>Age</h4>
        <h4 className={styles.editFormInputAlert} style={{color:"red"}}>{inputInfoEdit.age.showAlert ? inputInfoEdit.age.alertMsg : null}</h4>
        <Input className={styles.editFormInput} type={"number"} placeholder={"Please enter your age"} onChange={(e) => signupInputChangedHandler(e, "age")}/>
      </div>
      <div className={styles.editFormElements}>
        <h4 className={styles.editFormInputTitle}>gender</h4>
        <h4 className={styles.editFormInputAlert} style={{color:"red"}}>{inputInfoEdit.gender.showAlert ? inputInfoEdit.gender.alertMsg : null}</h4>
        <Radio.Group className={styles.editFormInput} value={inputInfoEdit.gender.value} onChange={(e) => signupInputChangedHandler(e, "gender")}>
          <Radio value={"Male"}>Male</Radio>
          <Radio value={"Female"}>Female</Radio>
        </Radio.Group>
      </div>
      <Button type="primary" htmlType="submit" className={styles.loginFormSubmitBtn}>Record Value</Button>
    </form>
  </div>)
}