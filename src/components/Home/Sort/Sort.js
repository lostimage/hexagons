import React, {useContext, useState} from 'react';

import classes from './Sort.module.css';
import HexContext from "../../../store/hex-context";

const Sort = (props) => {
    const ctx = useContext(HexContext)

    const sortHandler = () => {
        if (ctx.selectMode === true) {
            props.sortDataHandler('select')
        } else {
            props.sortDataHandler()
        }
    }
    return (
        <div onClick={sortHandler} className={classes.wrapper}>
            <span className={classes.button}>
                <img className={classes.image} src={require('../../../assets/sort.png')}/>
                <span className={classes.tooltip}>Sort</span>
            </span>
        </div>
    );
};

export default Sort;