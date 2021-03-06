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
            main: '#23a6d5',
            light: '#8ecae6',
            dark: '#8ecae6',
            contrastText: '#fff'
        },
        secondary: {
            main: '#8ecae6',
            light: '#8ecae6',
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
            main: '#E6EAEE',
            light: '#E6EAEE',
            dark: '#E6EAEE',
            contrastText: '#121212'
        },
        secondary: {
            main: '#8ecae6',
            light: '#8ecae6',
            dark: '#23a6d5',
            contrastText: '#fff'
        },
        light: '#fff'
    },
})

const emotion = {
    light: {
        cpBg: '#E6EAEE',
        bg: '#E6EAEE',
        inputColor: '#121212',
        inputBg: '#fff',
        sidebarBg: '#F0F7FF',
        sidebarTextColor: cpLight.palette.secondary.dark,
        mui: light,
        muiCp: cpLight
    },
    dark: {
        cpBg: '#3d3d3d',
        bg: '#3d3d3d',
        inputColor: '#fff',
        inputBg: '#121212',
        sidebarBg: '#121212',
        sidebarTextColor: cpLight.palette.secondary.light,
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