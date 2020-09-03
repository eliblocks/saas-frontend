import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    minWidth: 350,
  }
}));

export default function InviteUser({ mutate, account }) {
  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState(account.plan)
  const classes = useStyles();

  function handleSave() {
    axios.patch('/account', {
      account: {
        plan: plan,
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
        color="primary"
        onClick={() => setOpen(true)}
       >
        Change Plan
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Change plan</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1" value={plan} onChange={(e) => setPlan(e.target.value)}>
              <FormControlLabel value="free" control={<Radio />} label="Free" />
              <FormControlLabel value="pro" control={<Radio />} label="Pro" />
              <FormControlLabel value="enterprise" control={<Radio />} label="Enterprise" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
