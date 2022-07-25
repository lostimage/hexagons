import React from "react";

const AuthContext = React.createContext({
    menuToggle : true,
    isLoggedIn: false,
    userName: false,
    token: false,
    stage: 'intro',
    onLogin: () => {},
    onLogout: () => {},
    menuToggleHandler: () => {}
})

export default AuthContext;