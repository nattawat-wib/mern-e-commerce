import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Divider } from "@mui/material"

const ConfirmDialog = (
    {
        isConfirmDialogOpen,
        setIsConfirmDialogOpen,
        title = 'are you sure to confirm this action ?',
        content = 'are you sure, this action cannot be undone',
        callback
    }
) => {
    return (
        <Dialog
            open={isConfirmDialogOpen}
            onClose={() => setIsConfirmDialogOpen(false)}
        >
            <DialogTitle> {title} </DialogTitle>
            <DialogContent> {content} </DialogContent>
            <DialogActions>
                <Button
                    size='small'
                    variant='outlined'
                    onClick={callback}
                > 
                Confirm 
                </Button>
                <Button
                    size='small'
                    variant='contained'
                    onClick={() => setIsConfirmDialogOpen(false)}
                > Close </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog