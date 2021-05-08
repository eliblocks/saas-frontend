import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

export default function DeleteUser({ mutate, user }) {
  const [open, setOpen] = useState(false);

  function handleDeleteUser() {
    axios.delete(`/users/${user.id}`)
    .then(() => {
       setOpen(false);
       mutate();
    })
  }

  return (
    <React.Fragment>
      <IconButton onClick={() => setOpen(true)}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Delete {user.full_name}</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete {user.full_name}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleDeleteUser} color="secondary">
            Delete
          </Button>
        </DialogActions>

      </Dialog>
    </React.Fragment>
  );
}
