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
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  mb: {
    marginBottom: theme.spacing(2),
  },
  dialogForm: {
    minWidth: 350,
  }
}));

export default function EditUser({ mutate, user }) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, errors, setError } = useForm();
  const classes = useStyles();

  function onSubmit(data) {
    axios.patch(`/users/${user.id}`, {
      user: {
        full_name: data.full_name,
        admin: data.admin,
      }
    })
    .then(() => {
       setOpen(false);
       mutate();
    })
  }

  return (
    <React.Fragment>
      <IconButton onClick={() => setOpen(true)}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.dialogForm}>
          <DialogContent>
            <TextField
              inputRef={register}
              name="full_name"
              label="Full name"
              type="text"
              fullWidth
              defaultValue={user.full_name}
              className={classes.mb}
            />
            <FormGroup>
              <FormControlLabel
                control={<Checkbox name="admin" inputRef={register} defaultChecked={user.admin} />}
                label="Admin"
              />
            </FormGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={() => setOpen(false)} color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
