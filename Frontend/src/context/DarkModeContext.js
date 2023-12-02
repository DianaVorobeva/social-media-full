import { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({children}) => {
    const [darkMode, setDarkMode] = useState(
        JSON.parse(localStorage.getItem('data-theme')) || false
        );
     

    const toggle = () => {
        setDarkMode(!darkMode);
    } 

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode)
    }, [darkMode])

    return (
        <DarkModeContext.Provider value={{darkMode, toggle}}>{children}</DarkModeContext.Provider>
    )



}