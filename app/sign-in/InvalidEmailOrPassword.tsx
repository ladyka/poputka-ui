import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface InvalidEmailOrPasswordProps {
  open: boolean;
  handleClose: () => void;
}

export default function InvalidEmailOrPassword({ open, handleClose }: InvalidEmailOrPasswordProps) {
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
      <DialogTitle>Ваш емеил или пароль не верны</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <DialogContentText>
          Ваш адрес электронной почты или пароль не верны, проверьте данные и повторите попытку.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Понятно</Button>
      </DialogActions>
    </Dialog>
  );
}
