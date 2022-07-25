import React, {useContext, useEffect, useRef, useState} from 'react';
import Hexagon from "../../Login/Hexagon/Hexagon";
import HexagonItem from "../HexagonItem/HexagonItem";
import classes from './HexagonBoard.module.css';
import AuthContext from "../../../store/auth-context";
import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";

const HexagonBoard = React.forwardRef((props, ref) => {
    const [clickable, setClickable] = useState(true)
    const [isMoving, setIsMoving] = useState(false)
    const [popupActive, setPopupActive] = useState(false)
    const authCtx = useContext(AuthContext)
    const [panning, setPanning] = useState(false)

    const popupHandler = () => {
        setPopupActive(!popupActive)
    }
    const panningHandler = (state) => {
        setPanning(state)
    }
    const hexagonsList = props.hexagons.map((item, index) => <HexagonItem
        popupHandler={popupHandler}
        hexagons={props.hexagons}
        multiCopyHandler={props.multiCopyHandler}
        copyContentDataHandler={props.copyContentDataHandler}
        setSelected={props.setSelected}
        removeSelected={props.removeSelected}
        contentHandler={props.contentHandler}
        setActive={props.setActive}
        activeColor={props.activeColor}
        cursorHandler={props.setCursor}
        selected={item.selected}
        index={item.index}
        content={item.content}
        active={item.active}
        color={item.color}
        key={item.id}
        bold={item.bold}
        click={clickable}
        info={item.info}
        hexP={item.hexP}
        hexX={item.hexX}
        hexY={item.hexY}
        panningHandler={panningHandler}
    />)
    let content = null
    const preventPan = (event, x, y) => {
        // if the target is the content container then prevent panning
        if (event.target === content) {

            return true
        }
    }

    const moveHandler = (e) => {
        setIsMoving(false)
        setTimeout(() => {
            setClickable(true);
        }, 100);
    }

    const checkIfDragging = () => {
        if (isMoving && clickable) {
            setClickable(false)
        }
    }

    const preventClickHandler = () => {
        setIsMoving(true)
    }

    // const stopClickable = () => {
    //     console.log('stop')
    //     setClickable(false)
    // }
    //
    // const enableClickable = () => {
    //     console.log('start')
    //     setTimeout(() => {
    //         setClickable(true);
    //     }, 100);
    // }

    const borderSize = 25;
    let borderListTop = [];
    let borderListBottom = [];
    let borderListLeft = [];
    let borderListRight = [];
    let borders = [{name: 't', array: borderListTop}, {name: 'b', array: borderListBottom}, {
        name: 'l',
        array: borderListLeft
    }, {name: 'r', array: borderListRight}]
    let col = 1;
    for (let i = 1; i <= borderSize; i++) {
        borders.map(item => {
            return (
                item.array = [
                    <div key={item.name + i} style={{gridColumn: col + '/span 3'}} className={classes.hex}>
                        <div className={classes.box}/>
                        <div className={classes.overlay}/>
                    </div>
                    , ...item.array]
            )
        })

        col += 2;
    }


    return (

        <section className={`${classes.board} ${classes[authCtx.menuToggle]}`}
                 ref={ref}>

            {/*<div className={classes.wrapper}>*/}
            <TransformWrapper initialScale={1.5}
                              doubleClick={{disabled: true}}
                              disabled={panning}
            >
                {({zoomIn, zoomOut, resetTransform, ...rest}) => (
                    <React.Fragment>
                        <div className={classes.tools}>
                            <button className={classes.zoom} onClick={() => zoomIn()}>+</button>
                            <button className={classes.zoom} onClick={() => zoomOut()}>-</button>
                            <button className={classes.zoom} onClick={() => resetTransform()}>x</button>
                        </div>
                        <TransformComponent
                            wrapperClass={classes.testWrapper}
                        >
                            <div
                                onMouseMove={checkIfDragging}
                                onMouseDown={preventClickHandler}
                                onMouseUp={moveHandler}
                                className={classes.grid}>
                                <div className={classes.borderWrapTop}>
                                    <div className={`${classes.border} ${classes.top}`}>{borders[0].array}</div>
                                </div>
                                <div className={classes.borderWrapBottom}>
                                    <div className={`${classes.border} ${classes.bottom}`}>{borders[1].array}</div>
                                </div>
                                <div className={classes.borderWrapLeft}>
                                    <div className={`${classes.left}`}>{borders[2].array}</div>
                                </div>
                                <div className={classes.borderWrapRight}>
                                    <div className={`${classes.right}`}>{borders[3].array}</div>
                                </div>
                                {hexagonsList}
                            </div>
                        </TransformComponent>
                    </React.Fragment>
                )}
            </TransformWrapper>
            {popupActive &&
            <div onClick={popupHandler} className={`${classes.popup}`}>
                {/*<div className={classes.shapeLeft}/>*/}
                {/*<div className={classes.shapeRight}/>*/}
                <Hexagon popup={'popup'}>
                    Looks like you’ve got a big idea. Summarise it further to fit into one hexagon, or break your
                    idea down into component parts and use more than one hexagon
                </Hexagon>
            </div>
            }
            {/*</div>*/}

        </section>
    );
});

export default HexagonBoard;