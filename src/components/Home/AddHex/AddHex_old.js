import React, {useContext} from 'react';

import classes from './AddHex.module.css';
import HexContext from "../../../store/hex-context";

const AddHex_old = (props) => {
    const ctx = useContext(HexContext);

    const getEmptyHex = () => {
        const $mid = 12;
        for ( let x = 1; x <= 12; x++ ) {
            for (let y = 0; y <= 11; y++){
                const leftBot = ($mid - x) + 'key' + ($mid - y);
                const left = ($mid - x) + 'key' + $mid;
                const leftTop = ($mid - x) + 'key' + ($mid + y);
                const rightBot = ($mid + x) + 'key' + ($mid - y);
                const bottom = $mid + 'key' + ($mid-y);
                const rightTop = ($mid + x) + 'key' + ($mid + y);
                const top = $mid + 'key' + ($mid + y);
                const right = ($mid + x) + 'key' + $mid;
                console.log(props.activeHexes)
                switch (true){
                    case ($mid + y) > 23:
                        break;
                    case ($mid + x) > 24:
                        break;
                    case ($mid - x) < 0:
                        break;
                    case ($mid - y) < 0:
                        break;

                    case props.activeHexes[left].color === false:
                        console.log(left)
                        return props.activeHexes[left].index;
                    case props.activeHexes[leftTop].color === false:
                        console.log(leftTop)
                        return props.activeHexes[leftTop].index;
                    case props.activeHexes[rightBot].color === false:
                        console.log(rightBot)
                        return props.activeHexes[rightBot].index;
                    case props.activeHexes[rightTop].color === false:
                        console.log(rightTop)
                        return props.activeHexes[rightTop].index;
                    case props.activeHexes[leftBot].color === false:
                        console.log(leftBot)
                        return props.activeHexes[leftBot].index;
                    case props.activeHexes[right].color === false:
                        console.log(right)
                        return props.activeHexes[right].index;
                    case props.activeHexes[top].color === false:
                        console.log(top)
                        return props.activeHexes[top].index;
                    case props.activeHexes[bottom].color === false:
                        console.log(bottom)
                        return props.activeHexes[bottom].index;
                    default:
                        break;
                }
            }

            // if(!props.activeHexes[leftBot].active === true ){
            //     return props.activeHexes[leftBot].index;
            // } else if (!props.activeHexes[leftTop].active === true ){
            //     return props.activeHexes[leftTop].index;
            // } else if(!props.activeHexes[rightBot].active === true ){
            //     return props.activeHexes[rightBot].index;
            // } else if(!props.activeHexes[rightTop].active === true ){
            //     return props.activeHexes[rightTop].index;
            // }
        }

    }

    const setActiveSlot = () => {
        const $empty = getEmptyHex();
        props.setActive($empty);
        ctx.enableZoom($empty)
    }

    return (
        <div onClick={setActiveSlot} className={classes.wrapper}>
            <span className={classes.button}>
                <img className={classes.image} src={require('../../../assets/add-new.png')}/>
                <span className={classes.tooltip}>Add</span>
            </span>
        </div>
    );
};

export default AddHex_old;