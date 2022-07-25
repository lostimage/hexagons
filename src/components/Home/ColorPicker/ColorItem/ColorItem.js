import React, {useContext} from 'react';

import classes from './ColorItem.module.css';
import HexContext from "../../../../store/hex-context";

const ColorItem = (props) => {
const ctx = useContext(HexContext)

    const colorHandler = () => {
    console.log(ctx.activeHex)
        if(ctx.selectMode === true){
            props.multiColorHandler(props.color)
        } else if(ctx.activeHex !== false && ctx.activeHex !== undefined) {
             props.setActive(props.color);
        }
        props.toggleBoard()
    }

    return (
        <div onClick={colorHandler}  className={classes.picker}>
            <div style={{backgroundColor : props.color}} className={classes.overlay}></div>
        </div>
    );
};

export default ColorItem;