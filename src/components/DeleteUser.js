import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  mb: {
    marginBottom: theme.spacing(2),
  },
  dialogForm: {
    minWidth: 350,
  }
}));

export default function DeleteUser({ mutate, user }) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, errors, setError } = useForm();
  const classes = useStyles();

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
