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

export default function AddTask({ mutate, isLimited }) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, errors, setError } = useForm();
  const classes = useStyles();

  function onSubmit(data) {
    axios.post('/tasks', {
      task: {
        content: data.content,
      }
    })
    .then(() => {
       setOpen(false);
       mutate();
    })
  }

  return (
    <div>
      { isLimited ?
        <Button variant="contained" disabled>Upgrade to add more tasks</Button>
      :
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
         >
          Add task
        </Button>
      }
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add task</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.dialogForm}>
          <DialogContent>
            <TextField
              inputRef={register}
              name="content"
              label="Task"
              type="text"
              fullWidth
              className={classes.mb}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add task
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
