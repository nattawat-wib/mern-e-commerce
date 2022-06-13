import './style/app.scss';

import ThemeContextProvider from './context/them-context';
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import WebpageLayout from './layout/webpage';
// import ControlPanelLayout from './layout/control-panel';

import Index from './page/webpage/index';

const App = () => {
    return (
        <main>
            <StyledEngineProvider injectFirst>
                <CssBaseline />
                <ThemeContextProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route element={<WebpageLayout />}>
                                <Route index element={<Index />} />
                            </Route>
                            {/* <Route element={<ControlPanelLayout />}>

                            </Route> */}
                        </Routes>
                    </BrowserRouter>
                </ThemeContextProvider>
            </StyledEngineProvider>
        </main >
    )
}

export default App;