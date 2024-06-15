import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface SingUpThanksProps {
    open: boolean;
    handleClose: () => void;
}

export default function SingUpThanks({open, handleClose}: SingUpThanksProps) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    handleClose();
                },
            }}
        >
            <DialogTitle>Спасибо за регистрацию</DialogTitle>
            <DialogContent
                sx={{display: 'flex', flexDirection: 'column', gap: 2, width: '100%'}}
            >
                <DialogContentText>
                    Спасибо за регистраци. Теперь можете войти на сайт с своими учётными данными.
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{pb: 3, px: 3}}>
                <Button onClick={handleClose}>Благодарю!</Button>
            </DialogActions>
        </Dialog>
    );
}
