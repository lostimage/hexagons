import React, {useContext, useState} from 'react';

import classes from './Bold.module.css';
import HexContext from "../../../store/hex-context";

const Bold = (props) => {
    const ctx = useContext(HexContext);
    const selectMode = ctx.selectMode;

    const toggleActive = () => {
        // setIsActive(!isActive)
        if(selectMode){
            props.setBold()
        } else if(!ctx.copyMode && ctx.activeHex !== false){
            props.enableBoldItem()
        }
    }
    return (
        <div onClick={toggleActive} className={classes.wrapper}>
            <span className={classes.button}>
                <img className={classes.image} src={require('../../../assets/bold.png')}/>
                <span className={classes.tooltip}>Bold</span>
            </span>
        </div>
    );
};

export default Bold;