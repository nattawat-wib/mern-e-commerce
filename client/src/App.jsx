import { Button, TextField, Container, IconButton, Paper, Avatar, Stack, Dialog } from '@mui/material';

import Skeleton from '@mui/material/Skeleton'

import { ThemeProvider } from '@mui/material/styles';
import { mainTheme } from './style/theme.style';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoadingButton from '@mui/lab/LoadingButton';

import './style/app.scss';
import { useState } from 'react';
import createPalette from '@mui/material/styles/createPalette';

const App = () => {
    return (
        <main>
            <ThemeProvider theme={mainTheme}>

            </ThemeProvider>
        </main >
    )
}

export default App;