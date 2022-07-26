import React, {useContext, useEffect, useReducer, useState, useRef, useCallback} from 'react';

import HexagonBoard from "./HexagonBoard/HexagonBoard";
import Sidebar from "./Sidebar/Sidebar";
import HexContext from "../../store/hex-context";
import AuthContext from "../../store/auth-context";
import classes from './Home.module.css';
import TopBar from "./TopBar/TopBar";

const hexagonX = 24;
const hexagonY = 24;
let hexagonList = [];
let hexIndex = 0;
for (let i = 1; i <= hexagonX; i++) {
    let p = 1;
    for (let j = 0; j < hexagonY; j++) {
        const key = i + 'key' + j;
        hexagonList = [...hexagonList,
            {
                id: key,
                hexX: i,
                hexY: j,
                hexP: p,
                index: hexIndex,
                active: false,
                color: false,
                selected: false,
                bold: false,
                content: false
            }
        ]
        p += 2;
        hexIndex++;
    }
}

// hexagonList = hexagonList.reduce((a , x) => {
//     a[x.id] = x;
//     return a;
// },{})
// // console.log(resExample)
const resetScrollEffect = ({element}) => {
    // console.log(element.current)
    const middleTop = element.current.offsetHeight / 2 - window.innerHeight / 2;
    const middleWidth = window.innerWidth / 2;
    window.scrollTo(middleWidth, middleTop)
}

const Home = (props) => {
    // console.log(process.env)
    const ctx = useContext(HexContext)
    const authCtx = useContext(AuthContext)
    const [cursor, setCursor] = useState('auto')
    const [hexagonData, setHexagonData] = useState({});
    const [hexagons, setHexagons] = useState(hexagonList);
    const [color, setColor] = useState('lightgrey');
    const tableRef = useRef(null)
    const homeRef = useRef(null)

    const hexagonHandler = (list) => {
        setHexagons(
            [...list]
        )
    }

    useEffect(() => {
        const keyList = hexagonList.reduce((a, x) => {
            a[x.id] = x;
            return a;
        }, {})
        setHexagonData(keyList)

        hexagons.forEach(item => hexagonData[item.id] !== undefined ? hexagonData[item.id] : item);

        if (authCtx.userName !== 'undefined' && authCtx.userName !== false && authCtx.userName !== undefined) {
            fetch(process.env.REACT_APP_GET_BOARD_URL + encodeURIComponent(authCtx.userName),
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authCtx.token}`,
                    },
                }
            )
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                    // console.log(response)
                    const responseData = response.data.canvasId
                    if (responseData !== undefined) {
                        setHexagons((prevState) => {
                            responseData.forEach(item => {
                                prevState[item.index].color = item.color
                                prevState[item.index].content = item.content
                            })
                            return [...prevState]
                        })
                    }
                })
        }

    }, [])
    useEffect(() => resetScrollEffect({element: tableRef}), [authCtx.isLoggedIn])

    const activeAddHexagonHandler = useCallback((activeHexIndex) => {
        // setHexagons((prevState) => {
        //     prevState[activeHexIndex].color = prevState[activeHexIndex].color === false ? color : prevState[activeHexIndex].color;
        //     return prevState
        // })
    }, [])

    const contentDataHandler = useCallback((content, index) => {
        setHexagons((prevState) => {
            prevState[index].content = content;
            return [...prevState]
        })
    }, [])

    const copyContentDataHandler = useCallback((index) => {
        setHexagons((prevState) => {
            prevState[index].content = ctx.copyData.content;
            prevState[index].color = ctx.copyData.color;
            return [...prevState]
        })
    }, [])

    const selectedHexesHandler = useCallback((index, status) => {
        setHexagons((prevState) => {
            prevState[index].selected = !status;
            return [...prevState]
        })
    }, [])

    const colorHandler = (color) => {
        setHexagons((prevState) => {
            prevState[ctx.activeHex].color = color
            return [...prevState]
        })
        // setColor(color)
    }

    const removeSelected = useCallback(() => {
        setHexagons((prevState) => {
            const removedSelected = prevState.map(item => item.selected === true
                ? {...item, selected: false}
                : item);
            return [...removedSelected]
        })
    }, [])

    const multiColorHandler = (color) => {
        setHexagons((prevState) => {
            const changedColors = prevState.map(item => item.selected === true
                ? {...item, color: color}
                : item);
            return [...changedColors]
        })
    }

    const boldWeightHandler = () => {
        setHexagons((prevState) => {
            const selected = prevState.filter(item => item.selected === true);
            const checkBold = obj => obj.bold === true;
            const type = selected.some(checkBold);
            const changedWeight = prevState.map(item => item.selected === true
                ? {...item, bold: !type}
                : item);
            return [...changedWeight]
        })
    }

    const removeDataHandler = (index) => {
        setHexagons((prevState) => {
            prevState[index].content = false;
            prevState[index].color = false;
            return [...prevState]
        })
    }

    const removeSelectedHandler = () => {
        setHexagons((prevState) => {
            const cleanedHexes = prevState.map(item => item.selected === true
                ? {...item, content: false, color: false}
                : item);
            return [...cleanedHexes]
        })
    }

    const enableBoldItem = () => {
        setHexagons((prevState) => {
            const state = prevState[ctx.activeHex].bold
            prevState[ctx.activeHex].bold = !state;
            return [...prevState];
        })
    }

    const multiCopyHandler = useCallback((index, posX, posY) => {
        const data = [...hexagons];
        const selectedData = data.filter(item => item.selected === true);
        if (selectedData.length == 0) return;
        const dataOrdered = selectedData.sort((a, b) => {
            if (a.hexY > b.hexY) {
                return 1;
            } else if (a.hexY === b.hexY) {
                return a.hexX > b.hexX ? 1 : -1;
            } else {
                return -1;
            }
        })
        const startX = dataOrdered[0].hexX;
        const startY = dataOrdered[0].hexY;

        const arrayPositions = dataOrdered.map(item => {
                let newPosX = (posX + item.hexX - startX);
                let newPosY = (posY + item.hexY - startY);
                if (startY % 2 !== posY % 2) {
                    if (startY % 2 !== 0 && item.hexY % 2 === 0) {
                        newPosX = (posX + item.hexX - startX - 1);
                    } else if (startY % 2 === 0 && item.hexY % 2 !== 0) {
                        newPosX = (posX + item.hexX - startX + 1);
                    }
                } else {
                    newPosX = (posX + item.hexX - startX);
                }
                return (
                    {
                        ...item,
                        newPos: newPosX + 'key' + newPosY,
                    }
                )
            }
        )
        setHexagons((prevState) => {
            arrayPositions.map(item => {
                const newItem = prevState.find(prev => prev.id === item.newPos);
                if (newItem !== undefined) {
                    prevState[newItem.index].content = item.content;
                    prevState[newItem.index].color = item.color;
                }
            })
            return [...prevState]
        })
    }, [hexagons])

    const saveDataHandler = () => {
        const saveData = hexagons.filter(item => item.color !== false)
            .map(({bold, index, id, content, color}) => ({bold, index, id, content, color}));
        const objectData = {canvasId: saveData}
        if (authCtx.token !== 'undefined' && authCtx.token !== false) {
            const data = {json: objectData, userName: authCtx.userName}
            fetch(process.env.REACT_APP_SET_BOARD_URL,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authCtx.token}`,
                    },
                    body: JSON.stringify(data)
                }
            )
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                    // console.log(response)
                })

        }
    }

    const clearDataHandler = () => {
        setHexagons((prevState) => {
            prevState.map(item => {
                    item.color = false
                    item.selected = false
                    item.content = false
                    item.bold = false
                    return ({
                        ...item,
                    })
                }
            )
            return [...prevState]
        })
    }

    const sortDataHandler = (sortType) => {
        setHexagons((prevState) => {
            function compare(a, b) {

                if (a.color === false || a.color === undefined) {
                    return 1;
                } else if (a.color.localeCompare(b.color)) {
                    return a.color.localeCompare(b.color);
                }
                return 0;
            }

            const sortData = sortType === 'select' ? prevState.filter(item => item.selected === true) : prevState;
            const prevPositions = sortData.map(item => ({
                ...item
            }))
            sortData.sort(compare);
            const sorted = sortData.map((item, index) => (
                {
                    ...prevPositions[index],
                    color: item.color,
                    bold: item.bold,
                    content: item.content,
                    oldIndex: prevPositions[index].index
                }
            ))
            sorted.forEach(item => {
                prevState[item.oldIndex] = {...item}
            })
            return [...prevState]
        })
    }

    const shuffleDataHandler = (shuffleType) => {
        setHexagons(prevState => {
            const shuffleData = shuffleType === 'select' ? prevState.filter(item => item.selected === true) : prevState;
            const prevPositions = shuffleData.map(item => ({
                ...item
            }))
            // console.log(prevPositions)
            let shuffled = shuffleData
                .map(value => ({value, sort: Math.random()}))
                .sort((a, b) => a.sort - b.sort)
                .map(({value}) => value)
                .map((item, index) => {
                        return {
                            ...prevPositions[index],
                            color: item.color,
                            bold: item.bold,
                            content: item.content,
                            oldIndex: prevPositions[index].index
                        }
                    }
                )


            shuffled.forEach(item => {
                prevState[item.oldIndex] = {...item}
            })

            return [...prevState]
        })
    }

    return (
        <div ref={homeRef} style={{cursor: cursor}} className={`${classes.home} ${classes[authCtx.menuToggle]}`}>
            <div onClick={authCtx.menuToggleHandler}
                 className={`${classes.menuToggler} ${classes[authCtx.menuToggle]}`}>
                <span/>
            </div>

            <TopBar/>
            <Sidebar
                multiColorHandler={multiColorHandler}
                setColor={colorHandler}
                activeHexes={hexagonData}
                enableBoldItem={enableBoldItem}
                setBold={boldWeightHandler}
                removeSelected={removeSelected}
                // setActive={activeAddHexagonHandler}
                deleteAllSelected={removeSelectedHandler}
                saveDataHandler={saveDataHandler}
                clearDataHandler={clearDataHandler}
                sortDataHandler={sortDataHandler}
                shuffleDataHandler={shuffleDataHandler}
                removeData={removeDataHandler}
            />
            <HexagonBoard
                ref={tableRef}
                copyContentDataHandler={copyContentDataHandler}
                multiCopyHandler={multiCopyHandler}
                removeSelected={removeSelected}
                setSelected={selectedHexesHandler}
                contentHandler={contentDataHandler}
                activeColor={color}
                hexagons={hexagons}
                // setActive={activeAddHexagonHandler}
            />
        </div>
    );
};

export default Home;
