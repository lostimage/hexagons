import React , {useState , useContext} from 'react';

import classes from './Trash.module.css';
import HexContext from "../../../store/hex-context";

const Trash = (props) => {
    const hexCtx = useContext(HexContext);
    const trashMode = hexCtx.trashMode;

    const toggleActive = () => {
        if(hexCtx.selectMode === true) {
            props.deleteAllSelected()
        } else {
            props.removeData(hexCtx.activeHex)
        }
    }
    return (
        <div onClick={toggleActive} className={`${classes.wrapper} ${classes[trashMode ? 'active' : '']}`}>
            <span className={classes.button}>
                <img className={classes.image} src={require('../../../assets/delete.png')}/>
                <span className={classes.tooltip}>Trash</span>
            </span>
        </div>
    );
};

export default Trash;