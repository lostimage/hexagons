import React, {useContext} from 'react';

import classes from './AddHex.module.css';
import HexContext from "../../../store/hex-context";

const Boards = () => {
    return (
        <div className={classes.wrapper}>
            <span className={classes.button}>
                <img className={classes.image} src={require('../../../assets/add-new.png')}/>
                <span className={classes.tooltip}>Add</span>
            </span>
        </div>
    );
}

export default Boards;