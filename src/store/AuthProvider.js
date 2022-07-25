import {useState, useReducer, useEffect} from "react";
import AuthContext from "./auth-context";

const AuthProvider = props => {
    const [menuToggle , setMenuToggle] = useState('open')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userName, setUserName] = useState(false)
    const [token, setToken] = useState(false)
    const [board, setBoard] = useState('')
    const [stage, setStage] = useState('intro');
    useEffect(
        ()=>{
            const user = sessionStorage.getItem('login');
            const token = sessionStorage.getItem('token');
            if(  user !== null && token !== null && user !== undefined && token !== undefined){
                setIsLoggedIn(true);
                setUserName(user)
                setToken(token)
                if(getSearchParameters()){
                  setBoard(getSearchParameters)
                }else {
                    const boardId = Date.now().toString(36);
                    setBoard(boardId)
                    const urlParams = new URLSearchParams(window.location.search);
                    urlParams.set('board', boardId);
                    window.location.search = urlParams;
                }
            }
        } , [userName , token]
    )

    useEffect(()=>{
        window.innerWidth < 640 && setMenuToggle('closed')
    }, [])

    const loginHandler = (email, token) => {
        sessionStorage.setItem('login', email);
        sessionStorage.setItem('token', token);
        setIsLoggedIn(true );
        setUserName(email)
        setToken(token)
    };

    const logoutHandler = () => {
        sessionStorage.clear()
        setIsLoggedIn(false);
        setStage('intro')
    };

    const stageHandler = (stage) => {
        setStage(stage)
    }

    const menuToggleHandler = () => {
        setMenuToggle(menuToggle === 'open' ? 'closed' : 'open')
    }

    const getSearchParameters = () => {
        const board = new URLSearchParams(window.location.search.slice(1));
        return board != null && board != "" ? board.get('board') : false;
    }

    const getBoardsHandler = () => {};

    const authContent = {
        isLoggedIn: isLoggedIn,
        userName : userName,
        token : token,
        stage : stage,
        menuToggle : menuToggle,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        stageHandler : stageHandler,
        menuToggleHandler : menuToggleHandler
    }

    return <AuthContext.Provider value={authContent}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthProvider