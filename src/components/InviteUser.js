import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  mb: {
    marginBottom: theme.spacing(2),
  },
  dialogForm: {
    minWidth: 350,
  }
}));

export default function InviteUser({ mutate }) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const classes = useStyles();

  function onSubmit(data) {
    axios.post('/users/invitation', {
      user: {
        email: data.email,
      }
    })
    .then(() => {
       setOpen(false);
       mutate();
    })
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
       >
        Invite team member
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Invite User</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.dialogForm}>
          <DialogContent>
            <TextField
              inputRef={register}
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              className={classes.mb}
            />
            <FormGroup>
              <FormControlLabel
                control={<Checkbox name="admin" inputRef={register} />}
                label="Admin"
              />
            </FormGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={() => setOpen(false)} color="primary">
              Send Invitation
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
