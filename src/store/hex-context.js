import React, {useState, useEffect} from "react";

const HexContext = React.createContext({
    selectMode: false,
    copyMode: false,
    copyData: {},
    selectData: [],
    activeHex: false,
    enableSelectMode: () => {},
    setCopyData: () => {},
    enableCopyMode: () => {},
    disableCopyMode: () => {},
    enableHexItem: () => {},
    enableZoom: () => {},
    setSelectData: () => {}
})

// export const HexContentProvider = (props) => {
//     const [hexagonsData, setHexagonsData] = useState({});
//     const [selectedHexes, setselectedHexes] = useState([]);
//
//     // useEffect(()=>{
//     //     const storedHexes = {
//     //         '1key3' : {
//     //             id: '1key3',
//     //
//     //         }
//     //     }
//     // })
//     //
//     // const hexagonsHandler = (list)=>{
//     //     setHexagonsData(
//     //         list
//     //     )
//     // }
//     return (
//         <HexContext.Proivder value={{
//             hexagonsData: hexagonsData,
//             selectedHexes: selectedHexes,
//             // onHexUpdate: hexagonsHandler
//         }}>
//             {props.children}
//         </HexContext.Proivder>
//     );
// }

export default HexContext;