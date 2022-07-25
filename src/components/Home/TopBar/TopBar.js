import React, {useContext} from "react";
import classes from './TopBar.module.css';
import AuthContext from "../../../store/auth-context";

const TopBar = (props) => {
    const authCtx = useContext(AuthContext)
    return (
        <div className={`${classes.navbar} ${classes[authCtx.menuToggle]}`}>
            <div className={classes.content} contentEditable={true}/>
        </div>
    )
}

export default TopBar;