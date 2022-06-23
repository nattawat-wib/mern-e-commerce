import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './../components/control-panel/navbar';
import Sidebar from '../components/control-panel/sidebar';
import { CpPageWrapper } from '../style/util.style';

const ControlPanelLayout = (prop) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    window.addEventListener('resize', () => {
        if (window.innerWidth < 1020) setIsSidebarOpen(false)
    })

    return (
        <>
            {
                location.pathname.includes('/cp/login') ?
                    <Outlet />
                    :
                    <>
                        <Navbar
                            isSidebarOpen={isSidebarOpen}
                            setIsSidebarOpen={setIsSidebarOpen}
                        />
                        <Sidebar
                            isSidebarOpen={isSidebarOpen}
                            setIsSidebarOpen={setIsSidebarOpen}
                        />
                        <CpPageWrapper
                            open={isSidebarOpen}
                        >
                            <Outlet />
                        </CpPageWrapper>
                    </>
            }
        </>
    )
}

export default ControlPanelLayout