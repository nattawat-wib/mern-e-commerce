import { Outlet } from 'react-router-dom'

import Navbar from './../components/webpage/navbar';
import Footer from './../components/webpage/footer';

import AuthContextProvider from '../context/auth-context';

const WebpageLayout = () => {
    return (
        <AuthContextProvider>
            <Navbar />
            <Outlet />
            <Footer />
        </AuthContextProvider>
    )
}

export default WebpageLayout