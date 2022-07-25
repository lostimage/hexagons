import React, {useContext, useState} from 'react';
import {useForm} from "react-hook-form";
import {Form, Button} from 'semantic-ui-react';
import Guest from "../Guest/Guest";
import classes from './Signup.module.css';
import Hexagon from "../Hexagon/Hexagon";
import AuthContext from "../../../store/auth-context";

const Signup = (props) => {
    const ctx = useContext(AuthContext)
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [responseStatus, setResponseStatus] = useState('')
    const [inviteCode, setInviteCode] = useState('')
    const [authorizedMessage, setAuthorized] = useState(false)
    const onSubmit = (data) => {
        console.log(data);
        fetch(process.env.REACT_APP_CREATE_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }
        )
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                if (response.status == true) {
                    setResponseStatus(response.message)
                    ctx.stageHandler('login')
                } else {
                    setResponseStatus(response.message)
                }

            })
    }

    const loginHandler = () => {
        if (inviteCode === 'thinkfully') {
            ctx.onLogin();
        } else {
            setAuthorized(true)
        }

    }

    const inviteCodeHandler = (e) => {
        console.log(inviteCode)
        setInviteCode(e.target.value)
    }
    return (
        <div className={classes.signup}>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <Hexagon>
                            <h2 className={classes.guestTitle}>Sign Up</h2>
                            <Form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                                <Form.Field className={classes.control}>
                                    <input
                                        placeholder='Invite Code'
                                        type="text"
                                        {...register("inviteCode", {required: true, maxLength: 10})}
                                    />
                                    {errors.inviteCode && <p className={classes.message}>Please check the invite code</p>}
                                </Form.Field>
                                <Form.Field className={classes.control}>
                                    <input
                                        placeholder='Name'
                                        type="text"
                                        {...register("fullName", {required: true, maxLength: 10})}
                                    />
                                    {errors.fullName && <p className={classes.message}>Please check the Name</p>}
                                </Form.Field>

                                <Form.Field className={classes.control}>
                                    <input
                                        placeholder='Email'
                                        type="email"
                                        {...register("userName",
                                            {
                                                required: true,
                                                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                            })}
                                    />
                                    {errors.userName && <p className={classes.message}>Please check the Email</p>}
                                </Form.Field>

                                <Form.Field className={classes.control}>
                                    <input
                                        placeholder='Password'
                                        type="password"
                                        {...register("password", {
                                            required: true,
                                        })}
                                    />
                                    {errors.password && <p className={classes.message}>Please check the Password</p>}
                                </Form.Field>

                                <Form.Field className={classes.control}>
                                    <input
                                        placeholder='Password'
                                        type="password"
                                        {...register("confirmPassword", {
                                            required: true,
                                        })}
                                    />
                                    {errors.confirmPassword &&
                                    <p className={classes.message}>Please check to match Password</p>}
                                </Form.Field>
                                <Button className={classes.btn} type='submit'>Submit</Button>
                            </Form>
                        </Hexagon>
                    </div>
                    <div className="col-6">
                     <Guest />
                    </div>
                </div>
                <h4 className="text-center">
                    {responseStatus}
                </h4>
            </div>
        </div>
    );
};

export default Signup;