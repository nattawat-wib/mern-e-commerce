import './style/app.scss';

import ThemeContextProvider from './context/them-context';
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import AuthContextProvider from './context/auth-context';

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
import MemberAll from './page/control-panel/member';
import OrderAll from './page/control-panel/order';
import BankAll from './page/control-panel/bank';
import ProductAll from './page/control-panel/product';
import ProductEdit from './page/control-panel/product-edit';
import OrderManagement from './page/control-panel/order-management';

import NotFound from './page/not-found';

const App = () => {
    return (
        <BrowserRouter>
            <StyledEngineProvider injectFirst>
                <ThemeContextProvider>
                    <AuthContextProvider>
                        <CssBaseline />
                        <Toaster />
                        <Routes>
                            <Route path='/cp' element={<ControlPanelLayout />}>
                                <Route index path='login' element={<Login />} />
                                <Route path='' element={<MemberAll />} />
                                <Route path='product' element={<ProductAll />} />
                                <Route path='product-add' element={<ProductAdd />} />
                                <Route path='product/:productSku' element={<ProductEdit />} />
                                <Route path='member' element={<MemberAll />} />
                                <Route path='order' element={<OrderAll />} />
                                <Route path='order/:orderId' element={<OrderManagement />} />
                                <Route path='bank' element={<BankAll />} />
                            </Route>

                            <Route element={<WebpageLayout />}>
                                <Route index element={<Index />} />
                                <Route path='/product/:categoryId/:productSku' element={<ProductDetail />} />
                                <Route path='/cart' element={<Cart />} />
                                <Route path='/checkout' element={<Checkout />} />
                                <Route path='/member' element={<Member />} />
                                <Route path='/order-history' element={<OrderHistory />} />
                                <Route path='/order/:orderId' element={<Order />} />
                                <Route path='/confirm-slip/:orderId' element={<ConfirmSlip />} />
                            </Route>

                            <Route path='/*' element={<NotFound />} />
                        </Routes>
                    </AuthContextProvider>
                </ThemeContextProvider>
            </StyledEngineProvider>
        </BrowserRouter>
    )
}

export default App;