import React, {useContext, useState} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import HexProvider from "./store/HexProvider";
import AuthContext from "./store/auth-context";
function App() {
   const ctx = useContext(AuthContext);
   const isLoggedIn = ctx.isLoggedIn;

    return (
        <React.Fragment>
                <main>

                    {!isLoggedIn && <Login />}
                    {isLoggedIn &&  <HexProvider><Home /> </HexProvider>}
                </main>
        </React.Fragment>
    );
}

export default App;
