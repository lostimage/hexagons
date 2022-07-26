import {useReducer} from "react";
import HexContext from "./hex-context";

const defaultHexState = {
    selectMode: false,
    copyMode: false,
    trashMode: false,
    activeHex: false,
    selectData: [],
    copyData: {}
}

const hexReducer = (state, action) => {
    switch (action.type) {
        case 'SELECT':
            return {
                ...state,
                selectMode: !state.selectMode,
                copyMode: false,
            }
        case 'COPY':
            return {
                ...state,
                selectMode: state.selectMode,
                copyMode: !state.copyMode,
            }
        case 'DISABLE':
            return {
                ...state,
                selectMode: false,
                copyMode: false,
            }
        case 'COPY_DATA' :
            return {
                ...state , copyData : action.data , zoomHex : ''
            }
        case 'ACTIVE_HEX':
            return {
                ...state , activeHex : action.item , zoomHex : ''
            }
        case 'ZOOM_HEX':
            return {
                ...state , zoomHex : action.item
            }
        case 'SELECT_DATA':
            const selectedData = [action.data , ...state.selectData ]
            // console.log(selectedData)
            return  {
                ...state , selectData: selectedData
            }
        default:
            return defaultHexState
    }
}

const HexProvider = props => {

    const [hexState, dispatcHexAction] = useReducer(hexReducer, defaultHexState);

    const enableSelectMode = () => {
            dispatcHexAction({type: 'SELECT'})
        },
        enableZoom = (zoomId) => {
            dispatcHexAction({type: 'ZOOM_HEX' , item:zoomId})
        },
        disableModes = () => {
            dispatcHexAction({type: 'DISABLE'})
        },
        enableCopyMode = () => {
            dispatcHexAction({type: 'COPY'})
        },
        enableHexItem = (id) => {
            dispatcHexAction({type: 'ACTIVE_HEX' , item:id})
        },
        setCopyData = (data) => {
            dispatcHexAction({type: 'COPY_DATA' , data: data})
        },
    setSelectData = (index , position ,  content) => {
        const data = {id: index , position:position , content: content}
        dispatcHexAction({type: 'SELECT_DATA' , data : data})
    };
    const hexContent = {
        selectMode: hexState.selectMode,
        copyMode: hexState.copyMode,
        copyData: hexState.copyData,
        activeHex: hexState.activeHex,
        zoomHex: hexState.zoomHex,
        selectData: hexState.selectData,
        enableHexItem: enableHexItem,
        enableZoom: enableZoom,
        enableSelectMode: enableSelectMode,
        disableModes: disableModes,
        enableCopyMode: enableCopyMode,
        setCopyData: setCopyData,
        setSelectData: setSelectData,
    }

    return <HexContext.Provider value={hexContent}>
        {props.children}
    </HexContext.Provider>
}

export default HexProvider
