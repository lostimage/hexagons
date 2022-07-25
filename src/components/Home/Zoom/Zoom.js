import React from 'react';

import classes from './Zoom.module.css';

const Zoom = (props) => {
    return (
        <div className={classes.wrapper}>
          <div onClick={props.zoomInc} className={classes.inc}>+</div>
          <div onClick={props.zoomDec} className={classes.dec}>-</div>
        </div>
    );
};

export default Zoom;