import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material"

const DialogConfirm = (
    {
        isOpen,
        setIsOpen,
        title = 'are you sure to confirm this action ?',
        content = 'are you sure, this action cannot be undone',
        callback
    }
) => {

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
        >
            <DialogTitle> {title} </DialogTitle>
            <DialogContent> {content} </DialogContent>
            <DialogActions>
                <Button
                    size='small'
                    variant='outlined'
                    onClick={
                        () => {
                            callback()
                            setIsOpen(false)
                        }
                    }
                >
                    Confirm
                </Button>
                <Button
                    size='small'
                    variant='contained'
                    onClick={() => setIsOpen(false)}
                > Close </Button>
            </DialogActions>
        </Dialog >
    )
}

export default DialogConfirm