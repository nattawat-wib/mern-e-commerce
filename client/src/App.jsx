import './style/app.scss';

import ThemeContextProvider from './context/them-context';
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import WebpageLayout from './layout/webpage';
// import ControlPanelLayout from './layout/control-panel';

import Index from './page/webpage/index';
import ProductDetail from './page/webpage/product-detail';

const App = () => {
    return (
        <main>
            <StyledEngineProvider injectFirst>
                <ThemeContextProvider>
                    <CssBaseline />
                    <BrowserRouter>
                        <Routes>
                            <Route element={<WebpageLayout />}>
                                <Route index element={<Index />} />
                                <Route path='/:categoryId/:productSku' element={<ProductDetail />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </ThemeContextProvider>
            </StyledEngineProvider>
        </main >
    )
}

export default App;