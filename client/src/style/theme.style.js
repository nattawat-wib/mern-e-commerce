import { createTheme } from "@mui/material/styles";

const defaultTheme = createTheme();

export const mainTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#F76E11',
            light: '#FF9F45',
            dark: '#F7442D',
            contrastText: '#fff'
        },
        // secondary: {
        //     main: '#000fff',
        //     light: '#00ffff',
        //     dark: '#ff0000',
        //     contrastText: '#fff'
        // },
        contrastThreshold: 2,
        action: {
            hover: '#00ff00'
        }
    },
    shape: {
        borderRadius: 7
    },
    typography: {
        button: {
            textTransform: 'none'
        }
    },
    shadows: [
        "none",
        "0 0 24px rgba(0, 0, 0, .15)",
        ...defaultTheme.shadows.slice(2)
    ],
    components: {
        MuiDialog: {
            styleOverrides: {
                root: {
                    // backgroundColor: 'rgba(255, 255, 255, .5)',
                    backdropFilter: 'blur(2px)',
                }
            }
        }
    }
})