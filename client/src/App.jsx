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
import OrderHistory from './page/webpage/order-history';
import ConfirmSlip from './page/webpage/confirm-slip';
import Order from './page/webpage/order';

import Login from './page/control-panel/login';
import ProductAdd from './page/control-panel/product-add';

const App = () => {
    return (
        <BrowserRouter>
            <StyledEngineProvider injectFirst>
                <ThemeContextProvider>
                    <CssBaseline />
                    <Routes>
                        <Route element={<WebpageLayout />}>
                            <Route index element={<Index />} />
                            <Route path='/:categoryId/:productSku' element={<ProductDetail />} />
                            <Route path='/cart' element={<Cart />} />
                            <Route path='/checkout' element={<Checkout />} />
                            <Route path='/member' element={<Member />} />
                            <Route path='/order-history' element={<OrderHistory />} />
                            <Route path='/order/:orderId' element={<Order />} />
                            <Route path='/confirm-slip/:orderId' element={<ConfirmSlip />} />
                        </Route>

                        <Route path='/cp' element={<ControlPanelLayout />}>
                            <Route path='login' index element={<Login />} />
                            <Route path='product-add' index element={<ProductAdd />} />
                        </Route>
                    </Routes>
                </ThemeContextProvider>
            </StyledEngineProvider>
        </BrowserRouter>
    )
}

export default App;