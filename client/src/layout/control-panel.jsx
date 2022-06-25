import { Container } from '@mui/material';

import Navbar from './../components/control-panel/navbar';
import Sidebar from '../components/control-panel/sidebar';
import { CpPageWrapper, CpMainPage } from '../style/util.style';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useAuthCpContext } from './../context/auth-cp-context';
import { toast } from 'react-hot-toast';

const ControlPanelLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { authCp, authCpDispatch } = useAuthCpContext();

    window.addEventListener('resize', () => {
        if (window.innerWidth < 1020) setIsSidebarOpen(false)
    });


    useEffect(() => {
        console.log(authCp.isAuth);
        console.log(pathname);
        console.log(pathname.includes('/cp/login'));

        if (!authCp.isAuth && !pathname.includes('/cp/login')) {
            navigate('/cp/login');
            toast.error('please login before access this route')
        }

    }, [pathname])

    return (
        <>
            {
                pathname.includes('/cp/login') ?
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