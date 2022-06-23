import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './../components/control-panel/navbar';
import Sidebar from '../components/control-panel/sidebar';

const ControlPanelLayout = (prop) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    return (
        <>
            {
                location.pathname.includes('/cp/login') ?
                    <Outlet />
                    :
                    <>
                        <Sidebar
                            isSidebarOpen={isSidebarOpen}
                            setIsSidebarOpen={setIsSidebarOpen}
                        />
                        <Navbar
                            isSidebarOpen={isSidebarOpen}
                            setIsSidebarOpen={setIsSidebarOpen}
                        />
                        <Outlet />
                    </>
            }
        </>
    )
}

export default ControlPanelLayout