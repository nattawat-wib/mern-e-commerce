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

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
    const [isCollapseOpen, setIsCollapseOpen] = useState(false);

    const CustomTooltip = ({ title, children }) => {
        return (
            <Tooltip title={title} arrow placement='right' disableHoverListener={isSidebarOpen}>
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
            <Box sx={{ height: 55 }}> </Box>
            <Divider />
            <List>
                <CustomTooltip title='all ≥member'>
                    <ListItemButton>
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
                    <CustomTooltip title='add product'>
                        <ListItemButton dense={true}>
                            <ListItemIcon> <AddBusinessIcon sx={{ fontSize: 17, ml: 1 }} /> </ListItemIcon>
                            <ListItemText sx={{ fontSize: 14, mx: 'auto', whiteSpace: 'nowrap' }} primary='Add Product' />
                        </ListItemButton>
                    </CustomTooltip>
                    <CustomTooltip title='all product'>
                        <ListItemButton dense={true}>
                            <ListItemIcon> <AllInboxIcon sx={{ fontSize: 17, ml: 1 }} /> </ListItemIcon>
                            <ListItemText sx={{ fontSize: 14, mx: 'auto', whiteSpace: 'nowrap' }} primary='All Product' />
                        </ListItemButton>
                    </CustomTooltip>
                    <Divider />
                </Collapse>

                <CustomTooltip title='all order'>
                    <ListItemButton>
                        <ListItemIcon> <PaidIcon /> </ListItemIcon>
                        <ListItemText primary='Order' />
                    </ListItemButton>
                </CustomTooltip>

                <CustomTooltip title='all bank'>
                    <ListItemButton>
                        <ListItemIcon> <AccountBalanceIcon /> </ListItemIcon>
                        <ListItemText primary='Bank' />
                    </ListItemButton>
                </CustomTooltip>

                <Divider sx={{ my: 2 }} />

                <CustomTooltip title='logout'>
                    <ListItemButton>
                        <ListItemIcon> <LogoutIcon /> </ListItemIcon>
                        <ListItemText primary='Logout' />
                    </ListItemButton>
                </CustomTooltip>
            </List>
        </StyledControlPanelSidebar>
    )
}