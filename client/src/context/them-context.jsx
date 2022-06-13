import { createContext, useContext } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'

import theme from './../style/theme.style';

const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {

    return (
        <ThemeContext.Provider value={{}}>
            <MuiThemeProvider theme={theme.mui.dark}>
                <EmotionThemeProvider theme={theme.emotion.dark}>
                    {children}
                </EmotionThemeProvider>
            </MuiThemeProvider>
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => useContext(ThemeContext);
export default ThemeContextProvider;