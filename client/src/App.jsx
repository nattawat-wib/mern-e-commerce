import './style/app.scss';

import ThemeContextProvider from './context/them-context';
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import WebpageLayout from './layout/webpage';
import ControlPanelLayout from './layout/control-panel';

import Index from './page/webpage/index';
import ProductDetail from './page/webpage/product-detail';
import Cart from './page/webpage/cart';
import Checkout from './page/webpage/checkout';
import Member from './page/webpage/member';

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
                                <Route path='/cart' element={<Cart />} />
                                <Route path='/checkout' element={<Checkout />} />
                                <Route path='/member' element={<Member />} />
                                <Route path='/purchase-history' element={<Member />} />
                            </Route>

                            <Route element={<ControlPanelLayout />}>
                                <Route index element={<Index />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </ThemeContextProvider>
            </StyledEngineProvider>
        </main >
    )
}

export default App;