import { Drawer } from "@mui/material";

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
    return (
        <Drawer
            variant='permanent'
            onClose={() => setIsSidebarOpen(false)}
            open={isSidebarOpen}
        >
            h222
        </Drawer>
    )
}