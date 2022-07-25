import React, {useContext, useState} from 'react';
import {useForm} from "react-hook-form";
import {Form, Button} from 'semantic-ui-react';
import classes from './LoginScreen.module.css';
import Hexagon from "../Hexagon/Hexagon";
import AuthContext from "../../../store/auth-context";
import Guest from "../Guest/Guest";

const LoginScreen = (props) => {
    const ctx = useContext(AuthContext);
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [responseStatus , setResponseStatus] = useState('')
    const onSubmit = (data) => {
        fetch(process.env.REACT_APP_LOGIN_URL ,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            }
        )
            .then((response) => {
                console.log(response)
                return response.json();
            })
            .then((response) => {
                if(response.status === true) {
                    console.log(response)
                    setResponseStatus(response.message)
                    ctx.onLogin(data.userName , response.token);
                } else {
                    setResponseStatus(response.message)
                }

            })
    }

    const loginHandler = () => {
        ctx.onLogin();
    }
    return (
        <div className={classes.login}>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <Hexagon>
                            <div className={classes.login}>
                                <h2 className={classes.guestTitle}>Log in</h2>
                                <Form  className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                                    <Form.Field className={classes.control}>
                                        <input
                                            placeholder='Username'
                                            type="text"
                                            {...register("userName", {required: true})}
                                        />
                                    </Form.Field>
                                    {errors.userName && <p className={classes.message}>Please check the Name</p>}
                                    <Form.Field className={classes.control}>
                                        <input
                                            placeholder='Password'
                                            type="password"
                                            {...register("password", {
                                                required: true,
                                                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                                            })}
                                        />
                                    </Form.Field>
                                    {errors.password && <p className={classes.message}>Please check the Password</p>}
                                    <Button className={classes.btn} type='submit'>Submit</Button>
                                </Form>
                            </div>
                        </Hexagon>
                    </div>
                    <div className="col-6">
                      <Guest />
                    </div>
                </div>
                <h2 className="text-center">{responseStatus}</h2>
            </div>
        </div>
    );
};

export default LoginScreen;