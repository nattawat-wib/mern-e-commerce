import { Outlet } from 'react-router-dom'

import Navbar from './../components/webpage/navbar';
import Footer from './../components/webpage/footer';

const WebpageLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default WebpageLayout