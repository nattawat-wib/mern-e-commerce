import { Box, Collapse, Divider, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Stack, Tooltip } from "@mui/material";

import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaidIcon from '@mui/icons-material/Paid';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AllInboxIcon from '@mui/icons-material/AllInbox';

import { useState } from "react";
import { StyledControlPanelSidebar } from "../../style/navbar.style";
import { Link } from 'react-router-dom';

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
    const [isCollapseOpen, setIsCollapseOpen] = useState(false);

    const CustomTooltip = ({ title, to, children }) => {
        return (
            <Tooltip component={Link} to={to} title={title} arrow placement='right' disableHoverListener={isSidebarOpen}>
                {children}
            </Tooltip>
        )
    }

    return (
        <StyledControlPanelSidebar
            variant='permanent'
            open={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
        >
            <Stack sx={{ height: 55 }}>
                <img src="/image/favicon.png" width={30} height={30} />
            </Stack>
            <Divider sx={{ mx: 2 }} />
            <List>
                <CustomTooltip title='all ≥member' to='/cp/member'>
                    <ListItemButton >
                        <ListItemIcon> <AccountCircleIcon /> </ListItemIcon>
                        <ListItemText primary='Member' />
                    </ListItemButton>
                </CustomTooltip>

                <ListItemButton onClick={() => setIsCollapseOpen(prev => !prev)}>
                    <ListItemIcon> <Inventory2OutlinedIcon /> </ListItemIcon>
                    <ListItemText primary='Product' />
                    {isCollapseOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemButton>

                <Collapse in={isCollapseOpen}>
                    <CustomTooltip title='add product' to='/cp/product-add'>
                        <ListItemButton dense={true}>
                            <ListItemIcon> <AddBusinessIcon sx={{ fontSize: 17, ml: 1 }} /> </ListItemIcon>
                            <ListItemText sx={{ fontSize: 14, mx: 'auto', whiteSpace: 'nowrap' }} primary='Add Product' />
                        </ListItemButton>
                    </CustomTooltip>
                    <CustomTooltip title='all product' to='/cp/product'>
                        <ListItemButton dense={true}>
                            <ListItemIcon> <AllInboxIcon sx={{ fontSize: 17, ml: 1 }} /> </ListItemIcon>
                            <ListItemText sx={{ fontSize: 14, mx: 'auto', whiteSpace: 'nowrap' }} primary='All Product' />
                        </ListItemButton>
                    </CustomTooltip>
                    <Divider sx={{ mx: 2 }} />
                </Collapse>

                <CustomTooltip title='all order' to='/cp/order'>
                    <ListItemButton>
                        <ListItemIcon> <PaidIcon /> </ListItemIcon>
                        <ListItemText primary='Order' />
                    </ListItemButton>
                </CustomTooltip>

                <CustomTooltip title='all bank' to='/cp/bank'>
                    <ListItemButton>
                        <ListItemIcon> <AccountBalanceIcon /> </ListItemIcon>
                        <ListItemText primary='Bank' />
                    </ListItemButton>
                </CustomTooltip>

                <Divider sx={{ m: 2 }} />

                <CustomTooltip title='logout'>
                    <ListItemButton to='/cp/member' >
                        <ListItemIcon> <LogoutIcon /> </ListItemIcon>
                        <ListItemText primary='Logout' />
                    </ListItemButton>
                </CustomTooltip>
            </List>
        </StyledControlPanelSidebar>
    )
}