import React, {useCallback, useContext, useState} from 'react';

import classes from './MultiSelect.module.css';
import HexContext from "../../../store/hex-context";

const MultiSelect = (props) => {
    const ctx = useContext(HexContext)

    const toggleActiveMode =() => {
        if(ctx.selectMode === true){
            props.removeSelected()
        }
        ctx.enableSelectMode()
    }

    return (
        <div onClick={toggleActiveMode} className={`${classes.wrapper} ${classes[ctx.selectMode ? 'active' : '']}`}>
            <span   className={classes.button}>
                <img className={classes.image} src={require('../../../assets/multi-select-new.png')}/>
                <span className={classes.tooltip}>Select</span>
            </span>
        </div>
    );
};

export default MultiSelect;