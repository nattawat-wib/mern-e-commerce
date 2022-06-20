import { IconButton, Button, Dialog, DialogContent, DialogActions, Typography, TextField } from "@mui/material"

import CloseIcon from '@mui/icons-material/Close';

const RegisterDialog = ({ isRegisterDialogOpen, setIsRegisterDialogOpen }) => {


    return (
        <Dialog
            open={isRegisterDialogOpen}
            onClose={() => setIsRegisterDialogOpen(false)}
        >
            <div className='flex justify-between items-center px-4 pt-4'>
                <Typography>
                    Register
                </Typography>
                <IconButton onClick={() => setIsRegisterDialogOpen(false)}>
                    <CloseIcon />
                </IconButton>
            </div>

            <DialogContent>
                <TextField color='primary' size='small' fullWidth />
                <TextField color='primary' size='small' fullWidth />
                <TextField color='primary' size='small' fullWidth />
            </DialogContent>
            <DialogActions>
                <Button>
                    Register
                </Button>
            </DialogActions>

        </Dialog>
    )
}

export default RegisterDialog