import './style/app.scss';

import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';

import AuthCpContextProvider from './context/auth-cp-context';
import AuthContextProvider from './context/auth-context';
import ThemeContextProvider from './context/them-context';
import ToggleContextProvider from './context/toggle-context';

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

// console.log("import.meta.env.VITE_BASE_API", import.meta.env.VITE_BASE_API);

const App = () => {
    return (
        <BrowserRouter>
            <StyledEngineProvider injectFirst>
                <ThemeContextProvider>
                    <AuthCpContextProvider>
                        <AuthContextProvider>
                            <ToggleContextProvider>
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
                                        <Route path='order/:orderNumber' element={<OrderManagement />} />
                                        <Route path='bank' element={<BankAll />} />
                                    </Route>

                                    <Route element={<WebpageLayout />}>
                                        <Route index element={<Index />} />
                                        <Route path='/product/:categoryId/:productSku' element={<ProductDetail />} />
                                        <Route path='/cart' element={<Cart />} />
                                        <Route path='/checkout' element={<Checkout />} />
                                        <Route path='/member' element={<Member />} />
                                        <Route path='/order-history' element={<OrderHistory />} />
                                        <Route path='/order/:orderNumber' element={<Order />} />
                                        <Route path='/confirm-slip/:orderNumber' element={<ConfirmSlip />} />
                                    </Route>

                                    <Route path='/*' element={<NotFound />} />
                                </Routes>
                            </ToggleContextProvider>
                        </AuthContextProvider>
                    </AuthCpContextProvider>
                </ThemeContextProvider>
            </StyledEngineProvider>
        </BrowserRouter >
    )
}

export default App;