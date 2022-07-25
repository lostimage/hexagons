import React, {useContext, useState} from 'react';

import classes from './Login.module.css';
import Intro from "./Intro/Intro";
import LoginScreen from "./LoginScreen/LoginScreen";
import Signup from "./Signup/Signup";
import AuthContext from "../../store/auth-context";

const Login = (props) => {
    const stage = useContext(AuthContext)
    const loginHandler = () => {
        stage.stageHandler('login')
    }

    const signUpHandler = () => {
        stage.stageHandler('signup')
    }

    return (
        <div className={classes.login}>
            <header className={classes.header}>
                    <button onClick={loginHandler} className={classes.button}> Log in</button>
                    <button onClick={signUpHandler} className={classes.button}> Sign up</button>
            </header>
            {stage.stage === 'intro' && <Intro />}
            {stage.stage === 'login' && <LoginScreen />}
            {stage.stage === 'signup' && <Signup />}
        </div>
    );
};

export default Login;