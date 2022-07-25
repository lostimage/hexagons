import React , {useState} from 'react';

import classes from './Booster.module.css';

const Booster = (props) => {
    const [isActive , setIsActive] = useState(false)

    const toggleActive = () => {
        setIsActive(!isActive)
    }
    return (
        <div className={classes.wrapper}>
            <span  onClick={toggleActive} className={classes.button}>
                <img className={classes.image} src={require('../../../assets/booster.png')}/>
                <span className={classes.tooltip}>Booster</span>
            </span>
        </div>
    );
};

export default Booster;