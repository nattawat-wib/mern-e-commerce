import { Outlet } from 'react-router-dom'

import Navbar from './../components/webpage/navbar';
import Footer from './../components/webpage/footer';

const ControlPanelLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default ControlPanelLayout