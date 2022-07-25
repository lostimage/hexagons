import React, {useContext, useState} from 'react';

import classes from './Shuffle.module.css';
import HexContext from "../../../store/hex-context";

const Shuffle = (props) => {
    const ctx = useContext(HexContext)

    const shuffleHandler = () => {
        if(ctx.selectMode === true) {
            props.shuffleDataHandler('select')
        } else {
            props.shuffleDataHandler()
        }

    }
    return (
        <div onClick={shuffleHandler} className={classes.wrapper}>
            <span className={classes.button}>
                <img className={classes.image} src={require('../../../assets/shuffle.png')}/>
                <span className={classes.tooltip}>Shuffle</span>
            </span>
        </div>
    );
};

export default Shuffle;