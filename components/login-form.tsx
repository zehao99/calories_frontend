import React, {useState, useContext, useEffect} from "react";
import {Input, Button} from 'antd';
import styles from './login-form.module.scss';
import {AuthContext} from '../context/auth-context';
import PopupAlert from "./popup-alert";
import Cookie from "js-cookie";
import {CartContext} from "../context/cart-context";

const currURL = "http://localhost:3000";

const LoginForm = (props) => {
  const cartContext = useContext(CartContext);
  const authContext = useContext(AuthContext);
  const [isAuthed, setisAuthed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputInfoLogin, setInputInfoLogin] = useState({
    username: {
      config: {
        name: "Username",
        type: 'text',
        placeholder: 'Please enter your username',
      },
      value: "",
    },

    password: {
      config: {
        name: "Password",
        type: 'password',
        placeholder: 'Please enter your password',
        autoComplete: 'current-password',
      },
      value: "",
    }
  })

  const [inputInfoSignup, setInputInfoSignup] = useState({
    username: {
      config: {
        name: "Username",
        type: 'text',
        placeholder: 'Please enter your username',
      },
      value: "",
      alertMsg: "! Please Choose Another Username",
      showAlert: false,
    },
    display_name: {
      config: {
        name: "Nickname",
        type: 'text',
        placeholder: 'Please enter your nickname',
      },
      value: "",
      alertMsg: "",
      showAlert: false,
    },
    password: {
      config: {
        name: "Password",
        type: 'password',
        placeholder: 'Please enter your password',
        autoComplete: 'new-password',
      },
      value: "",
      alertMsg: "! Please choose a longer password",
      showAlert: false,
    },

    password_confirm: {
      config: {
        name: "Password Confirm",
        type: 'password',
        placeholder: 'Please confirm your password',
        autoComplete: 'new-password',
      },
      value: "",
      alertMsg: "! Two passwords are different",
      showAlert: false,
    },

    email: {
      config: {
        name: "Email Address",
        type: 'email',
        placeholder: 'Please enter your email',
      },
      value: "",
      alertMsg: "",
      showAlert: false,
    }
  })

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formDataIn = {};
    for (let key in inputInfoLogin) {
      formDataIn[key] = inputInfoLogin[key].value;
    }
    const formData = new URLSearchParams();
    formData.append('username', formDataIn["username"]);
    formData.append('password', formDataIn["password"]);
    const body = formData.toString();
    let url = "/api/login";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: body,
    });
    if (response.ok) {
      authContext.login();
      const userToken = await response.json();
      console.log(userToken);
      props.onClose();
      setIsLoading(false);
      // location.reload();
    } else {
      PopupAlert.show({
        title: "Alert",
        message: "Username or password error."
      })
      setIsLoading(false);
    }
  }

  const signupSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formDataIn = {};
    const formData = new URLSearchParams();
    for (let key in inputInfoSignup) {
      if(key !== "password_confirm" && key !== "email"){
        formData.append(key, inputInfoSignup[key].value);
      }
    };
    const body = formData.toString();
    let url =  "/api/signup";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: body,
    });
    if (response.ok) {
      props.onClose();
      setIsLoading(false);
      PopupAlert.show({
        title: "Thank you for joining us",
        message: "Please log in and record your body information. Today's menu is on the right-bottom side of the page."
      })
    } else {
      PopupAlert.show({
        title: "Failed",
        message: "Please try again."
      })
      setIsLoading(false);
    }
  }

  const loginInputChangedHandler = (event, inputIdentifier) => {
    setInputInfoLogin((prevState) => {
      prevState[inputIdentifier].value = event.target.value;
      return prevState;
    });
  }

  const signupInputChangedHandler = (event, inputIdentifier) => {
    event.persist();
    setInputInfoSignup((prevState) => {
      if(event.target != null) prevState[inputIdentifier].value = event.target.value;
      if(prevState.username.value === "admin") prevState.username.showAlert = true;
      else prevState.username.showAlert = false;
      if(prevState.password.value.length > 0 && prevState.password.value.length < 4) prevState.password.showAlert = true;
      else prevState.password.showAlert = false;
      if(prevState.password.value !== "" && prevState.password_confirm.value !== "" && prevState.password.value !== prevState.password_confirm.value){
        prevState.password_confirm.showAlert = true;
      }else prevState.password_confirm.showAlert = false;
      return {...prevState};
    });
  }


  const [isUser, setIsUser] = useState(true);

  const signupSwitcher = () => {
    setIsUser(false);
  }

  const loginFormElementArray = [];
  for (let key in inputInfoLogin) {
    loginFormElementArray.push({
      id: key,
      config: inputInfoLogin[key].config,
    })
  }
  const signupFormElementArray = [];
  for (let key in inputInfoSignup) {
    signupFormElementArray.push({
      id: key,
      config: inputInfoSignup[key].config,
      alertMsg: inputInfoSignup[key].alertMsg,
      showAlert: inputInfoSignup[key].showAlert
    })
  }

  // @ts-ignore
  // noinspection JSDeprecatedSymbols

  const loginForm = (<div>
    <form onSubmit={loginSubmitHandler} className={styles.loginForm}>
      {loginFormElementArray.map(formElement => (
        <div key={formElement.id} className={styles.loginFormElements}>
          <h4 className={styles.loginFormInputTitle}>{formElement.config.name}</h4>
          <Input className={styles.loginFormInput} {...formElement.config} onChange={(e) => loginInputChangedHandler(e, formElement.id)}/>
        </div>
      ))}
      <p className={styles.loginFromText}>Not a user yet? <a onClick={signupSwitcher}>Sign Up</a></p>
      <Button type="primary" htmlType="submit"> Log In</Button>
    </form>
  </div>)

  const signupForm = ((<div>
    <form onSubmit={signupSubmitHandler} className={styles.signUpForm}>
      <h3>Welcome to Calories Search</h3>
      {signupFormElementArray.map(formElement => (
        <div key={formElement.id} className={styles.loginFormElements}>
          <h4 className={styles.loginFormInputTitle}>{formElement.config.name}</h4>
          <h4 className={styles.loginFormInputAlert} style={{color:"red"}}>{formElement.showAlert ? formElement.alertMsg : null}</h4>
          <Input className={styles.loginFormInput} {...formElement.config} onChange={(e) => signupInputChangedHandler(e, formElement.id)}/>
        </div>
      ))}
      <Button type="primary" htmlType="submit" className={styles.loginFormSubmitBtn}> Sign Up</Button>
    </form>
  </div>))

  return <div>
    <div className={styles.formContainerBg} onClick={props.onClose}></div>
    {isUser ? loginForm : signupForm}</div>;
}

export default LoginForm;