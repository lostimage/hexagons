import React, {useContext} from 'react';

import classes from './Hexagon.module.css';
import AuthContext from "../../../store/auth-context";

const Hexagon = (props) => {
    const authCtx = useContext(AuthContext)
    return (
        <div className={`${classes.hexagon} ${classes[props.popup]} ${classes[authCtx.menuToggle]}`}>
            <div className={classes.box}>
                <div className={classes.textcontent}>
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default Hexagon;