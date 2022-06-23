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
    },
    typography: {
        fontFamily: 'Noto Sans Thai, sans-serif',
    }
})

const dark = createTheme({
    ...light,
    palette: {
        mode: 'dark',
        primary: {
            main: '#F76E11',
            light: '#FF9F45',
            dark: '#F7442D',
            contrastText: '#fff'
        },
        light: '#fff'
    },
})

const cpLight = createTheme({
    ...light,
    palette: {
        mode: 'light',
        primary: {
            main: '#121212',
            light: '#121212',
            dark: '#121212',
            contrastText: '#fff'
        },
        secondary: {
            main: '#23a6d5',
            light: '#23a6d5',
            dark: '#23a6d5',
            contrastText: '#fff'
        },
        light: '#fff'
    },
})

const cpDark = createTheme({
    ...light,
    palette: {
        mode: 'dark',
        primary: {
            main: '#121212',
            light: '#121212',
            dark: '#121212',
            contrastText: '#fff'
        },
        secondary: {
            main: '#23a6d5',
            light: '#23a6d5',
            dark: '#23a6d5',
            contrastText: '#fff'
        },
        light: '#fff'
    },
})

const emotion = {
    light: {
        bg: '#F0F7FF',
        inputColor: '#121212',
        inputBg: '#fff',
        mui: light,
        muiCp: cpLight
    },
    dark: {
        bg: '#3d3d3d',
        inputColor: '#fff',
        inputBg: '#121212',
        mui: dark,
        muiCp: cpDark
    }
}

export default {
    mui: {
        default: defaultTheme,
        light,
        dark,
    },
    muiCp: {
        default: defaultTheme,
        light: cpLight,
        dark: cpDark,
    },
    emotion: {
        ...emotion
    }
}