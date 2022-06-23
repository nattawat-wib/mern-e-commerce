import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './../components/control-panel/navbar';
import Sidebar from '../components/control-panel/sidebar';
import { CpPageWrapper, CpMainPage } from '../style/util.style';
import { Container } from '@mui/material';

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
                            <Container sx={{ py: 4 }}>
                                <CpMainPage >
                                    <Outlet />
                                </CpMainPage>
                            </Container>
                        </CpPageWrapper>
                    </>
            }
        </>
    )
}

export default ControlPanelLayout