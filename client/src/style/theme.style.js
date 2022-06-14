import { createTheme } from "@mui/material/styles";

const defaultTheme = createTheme();

const light = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#F76E11',
            light: '#FF9F45',
            dark: '#F7442D',
            contrastText: '#fff'
        },
        light: '#fff'
        // secondary: {
        //     main: '#000fff',
        //     light: '#00ffff',
        //     dark: '#ff0000',
        //     contrastText: '#fff'
        // },
    },
    // shape: {
    //     borderRadius: 7
    // },
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
        },
        MuiStack: {
            defaultProps: {
                direction: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }
        }
    }
})

const dark = createTheme(light, {
    palette: {
        mode: 'dark',
    }
})

const emotion = {
    light: {
        bg: '#fff',
        mui: light
    },
    dark: {
        bg: '#121212',
        mui: dark
    }
}

export default {
    mui: {
        default: defaultTheme,
        light,
        dark
    },
    emotion: {
        ...emotion
    }
}