import React, {useContext} from 'react';

import Boards from "../AddHex/Boards";
import classes from './Sidebar.module.css';
import ColorPicker from "../ColorPicker/ColorPicker";
import MultiSelect from "../MultiSelect/MultiSelect";
import Booster from "../Booster/Booster";
import Copy from "../Copy/Copy";
import Sort from "../Sort/Sort";
import Trash from "../Trash/Trash";
import Bold from "../Bold/Bold";
import Save from "../Save/Save";
import Logout from "../Logout/Logout";
import Shuffle from "../Shuffle/Shuffle";
import AuthContext from "../../../store/auth-context";

const Sidebar = (props) => {
    const authCtx = useContext(AuthContext)
    return (
        <section style={{'--mobZoom': props.mobileZoom}} className={`${classes.navbar} ${classes[authCtx.menuToggle]}`}>
            <img tabindex="0" className={classes.logo} src={require('../../../assets/logo.png')}/>
            <Boards activeHexes={props.activeHexes}
                    // setActive={props.setActive}
            />
            <div className={classes.iconWrapper}>
                <Copy removeSelected={props.removeSelected} />
                <ColorPicker selectMode={props.selectMode} multiColorHandler={props.multiColorHandler} setColor={props.setColor}/>
                <Sort sortDataHandler={props.sortDataHandler}/>
                <Shuffle shuffleDataHandler={props.shuffleDataHandler}/>
                <Booster />
                <MultiSelect removeSelected={props.removeSelected} />
                <Bold setBold={props.setBold} enableBoldItem={props.enableBoldItem}/>
                <Trash removeData={props.removeData} deleteAllSelected={props.deleteAllSelected} removeSelected={props.removeSelected} />
                <Save saveDataHandler={props.saveDataHandler} />
            <Logout clearDataHandler={props.clearDataHandler} />
            </div>
        </section>
    );
};

export default Sidebar;
