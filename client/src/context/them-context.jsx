import { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'

import theme from './../style/theme.style';

const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(JSON.parse(localStorage.getItem('isDarkTheme')) || false);

    useEffect(() => {
        localStorage.setItem('isDarkTheme', isDarkTheme);
    }, [isDarkTheme])

    return (
        <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
            <MuiThemeProvider theme={theme.mui[isDarkTheme ? 'dark' : 'light']}>
                <EmotionThemeProvider theme={theme.emotion[isDarkTheme ? 'dark' : 'light']}>
                    {children}
                </EmotionThemeProvider>
            </MuiThemeProvider>
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => useContext(ThemeContext);
export default ThemeContextProvider;