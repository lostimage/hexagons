import React, {useState, useEffect, useRef, useContext} from 'react';
import classes from './HexagonItem.module.css';
import HexContext from "../../../store/hex-context";

const resetScrollEffect = ({element}, x) => {
    const zoomX = x <= 21 ? 'center' : 'end';
    element.current.scrollIntoView({inline: 'center', block: zoomX, behavior: "smooth"})
}
const focusInput = ({element}) => {
    document.getElementsByTagName("META")[1].content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
    setTimeout(function () {
        element.current.focus();
    }, 0);
}
const HexagonItem = (props) => {
    console.log('1');
    const [editable, setEditable] = useState(false)
    const [active, setActive] = useState(false);
    const itemRef = useRef(null)
    const contentRef = useRef('')
    const editRef = useRef(null)
    const ctx = useContext(HexContext);
    const [clickable, setClickable] = useState(true)
    const [isMoving, setIsMoving] = useState(false)

    useEffect(() => {
        if (ctx.zoomHex === props.index) {
            resetScrollEffect({element: itemRef}, props.hexX)
        }
        contentRef.current = props.content !== undefined ? props.content : '';
    }, [ctx.zoomHex, props.content])

    useEffect(() => {
        updatePadding(editRef.current)
    }, [props.content])

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

    const row = props.hexY % 2 !== 0 ? (2 * props.hexX) + '/span 2' : (2 * props.hexX - 1) + '/span 2';
    const position = {
        '--counter': props.hexX,
        gridColumn: props.hexP + '/span 3',
        gridRow: row,
    }

    const backgroundColor = {
        backgroundColor: props.color
            ? props.color
            : active
                ? "lightgray"
                : props.color
    }

    const onActiveHexHandler = (e) => {
        if (!ctx.selectMode && !ctx.copyMode) {
            props.panningHandler(true)
            setEditable(true)
            focusInput({element: editRef})
        }
        if (clickable && !ctx.selectMode && !ctx.copyMode) {
            setActive(true)
            ctx.enableHexItem(props.index)
            // props.setActive(props.index)
        }
    };

    const onDoubleClickHandler = () => {
        if(props.color !== false){
            if (!ctx.selectMode && !ctx.copyMode) {
                props.panningHandler(true)
                setEditable(true)
                focusInput({element: editRef})
            }
            if (clickable && !ctx.selectMode && !ctx.copyMode) {
                setActive(true)
                ctx.enableHexItem(props.index)
                // props.setActive(props.index)
            }
        }
    }
    const maxLength = 40

    const setContent = (e) => {
        const currentContent = e.currentTarget.textContent;
        if (currentContent.length >= maxLength && e.keyCode !== 8 && e.keyCode !== 127) {
           e.currentTarget.blur()
            props.popupHandler(true)
            return;
        }
        contentRef.current = currentContent;
        updatePadding(e.target)
    }

    const updatePadding = (hex) => {
        let padding = 0
        let lines = 1
        let text = hex
        let styles = window.getComputedStyle(text)
        let hexHeight = text.offsetHeight
        let lineHeight = styles.lineHeight
        let paddingTop = styles.paddingTop
        let paddingTopParsed = parseFloat(paddingTop.split('px')[0])
        let lineHeightParsed = parseFloat(lineHeight.split('px')[0])
        hexHeight -= Math.round(paddingTopParsed)
        lines = Math.round(hexHeight) / lineHeightParsed
        padding = (Math.round(lines) < 8) ? (lineHeightParsed * 2.1) - ((Math.round(lines) - 1) * (lineHeightParsed / 2)) + "px" : "0px"
        text.style.paddingTop = padding
    }

    const selectHandler = () => {
        if (clickable && !ctx.copyMode) {
            // ctx.selectData
            props.setSelected(props.index, props.selected);
        }
    }

    const copyActionHandler = () => {
        if (ctx.selectMode === true) {
            if (props.color === false) {
                props.multiCopyHandler(props.index, props.hexX, props.hexY)
                ctx.enableCopyMode()
            }
        } else {
            if (props.color !== false) {
                ctx.setCopyData({content: props.content, color: props.color})
            } else if (
                props.color === false && ctx.copyData !== undefined
            ) {
                props.copyContentDataHandler(props.index)
            }
        }

    }

    const clickHandler = (e) => {
        // console.log(clickable)
        if(!clickable){
            return;
        }
        if (ctx.selectMode && props.color !== false) {
            selectHandler();
        }
        else if (ctx.selectMode && !ctx.copyMode && props.color === false){
            props.removeSelected()
        }
        else if (ctx.copyMode) {
            copyActionHandler();
            // props.cursorHandler('cell')
        } else if (props.color === false) {
            onActiveHexHandler();
        }
    }
    const handleBlur = () => {
        props.contentHandler(contentRef.current, props.index)
        document.getElementsByTagName("META")[1].content="width=device-width, initial-scale=1.0";
        props.panningHandler(false)
    };

    const useSingleAndDoubleClick = (actionSimpleClick, actionDoubleClick, delay = 250) => {
        const [click, setClick] = useState(0);

        useEffect(() => {
            const timer = setTimeout(() => {
                // simple click
                if (click === 1) actionSimpleClick();
                setClick(0);
            }, delay);

            // the duration between this click and the previous one
            // is less than the value of delay = double-click
            if (click === 2) actionDoubleClick();

            return () => clearTimeout(timer);

        }, [click]);

        return () => setClick(prev => prev + 1);
    }
    const click = useSingleAndDoubleClick(clickHandler, onDoubleClickHandler);

    return (
        <div ref={itemRef}
             onMouseMove={checkIfDragging}
             onMouseDown={preventClickHandler}
             onMouseUp={moveHandler}
             onClick={click}
             data-position={props.color}
             data-x={props.hexX}
             data-y={props.hexY}
             style={position} className={`
             ${classes.hexagon} 
             ${classes[props.color !== false ? 'active' : '']}
             ${classes[props.color !== false && props.selected === true ? 'selected' : '']}
             `}>
            <div className={classes.content}>
                <div className={classes.box}>
                    <div style={backgroundColor} className={classes.overlay}/>
                    <div className={classes.textcontent}>
                        <div className={classes.shapeLeft}/>
                        <div className={classes.shapeRight}/>
                        <div className={classes.textItem}>
                            <div ref={editRef} onBlur={handleBlur}
                                 className={`${classes.textItemValue} ${classes[props.bold !== false ? 'bold' : '']}`}
                                 contentEditable={editable}
                                 suppressContentEditableWarning={true}
                                 onInput={setContent}>
                                {props.content}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default React.memo(HexagonItem);
