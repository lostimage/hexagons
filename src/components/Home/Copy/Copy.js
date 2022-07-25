import React , { useContext} from 'react';

import classes from './Copy.module.css';
import HexContext from "../../../store/hex-context";

const Copy = (props) => {
    const ctx = useContext(HexContext);
    const copyMode = ctx.copyMode;

    const toggleActive = () => {
       ctx.enableCopyMode()
    }
    return (
        <div onClick={toggleActive} className={`${classes.wrapper} ${classes[copyMode === true ? 'active' : '']}`}>
            <span className={classes.button}>
                <img className={classes.image} src={require('../../../assets/copy.png')}/>
                <span className={classes.tooltip}>Copy</span>
            </span>
        </div>
    );
};

export default Copy;