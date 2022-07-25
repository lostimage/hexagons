import React, {useContext, useState} from 'react';

import classes from './Guest.module.css';
import Hexagon from "../Hexagon/Hexagon";
import AuthContext from "../../../store/auth-context";

const Guest = () => {
    const ctx = useContext(AuthContext)
    const [inviteCode, setInviteCode] = useState('')
    const [authorizedMessage, setAuthorized] = useState(false)

    const loginHandler = () => {
        if (inviteCode === 'thinkfully') {
            ctx.onLogin();
        } else {
            setAuthorized(true)
        }

    }

    const inviteCodeHandler = (e) => {
        setInviteCode(e.target.value)
    }
    return (

        <Hexagon>
            <h2 className={classes.guestTitle} > Continue as guest </h2>
            <p className={classes.guestMessage}>
                (I want to start emptying my head straight away, I don’t need to save my canvas just
                yet)
            </p>
            <div className={classes.control}>
                <input onChange={inviteCodeHandler} type="text" placeholder="Enter Invite code"/>
                {authorizedMessage && <p className={classes.message}>Please check invite code</p>}
                <button onClick={loginHandler} className={classes.btn}>Log in as guest</button>
            </div>
        </Hexagon>

    );
};

export default Guest;