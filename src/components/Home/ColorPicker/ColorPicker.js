import React, {useContext, useState} from 'react';

import classes from './ColorPicker.module.css';
import ColorItem from "./ColorItem/ColorItem";
import HexContext from "../../../store/hex-context";
const colorTable = [
    {'color' : "#0ddd92" , 'hex' : "#0ddd92"},
    {'color' : "#cc99f8" , 'hex' : "#cc99f8"},
    {'color' : "#fe6467" , 'hex' : "#fe6467"},
    {'color' : "#ffd508" , 'hex' : "#ffd508"},
    {'color' : "#B8F479" , 'hex' : "#B8F479"},
    {'color' : "#57fbe8" , 'hex' : "#57fbe8"},
    {'color' : "#ffffff" , 'hex' : "#ffffff"},
    {'color' : "#fb9657" , 'hex' : "#fb9657"},
    {'color' : "#8996FC" , 'hex' : "#8996FC"},
    {'color' : "#fb57bc" , 'hex' : "#fb57bc"},
    {'color' : "#C7CBCE" , 'hex' : "#C7CBCE"},
    {'color' : "#57BCFB" , 'hex' : "#57BCFB"},
];

const ColorPicker = (props) => {
    const ctx = useContext(HexContext)
   const [isActive , setIsActive] = useState(false)

    const toggleBoard = () => {
        setIsActive(!isActive)
    }
    const picker = colorTable.map(item => <ColorItem
        setActive={props.setColor}
        color={item.color}
        key={item.color}
        multiColorHandler={props.multiColorHandler}
        toggleBoard={toggleBoard}
        />)
    return (
        <div className={classes.wrapper}>
            <span  onClick={toggleBoard} className={classes.button}>
                <img className={classes.image} src={require('../../../assets/all_colors.png')}/>
                <span className={classes.tooltip}>Color</span>
            </span>
            {isActive
                ?  <div className={classes.board}>{picker}</div>
                : ''
            }
        </div>
    );
};

export default ColorPicker;