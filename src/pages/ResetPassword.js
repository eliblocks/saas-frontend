import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AuthContainer from '../components/AuthContainer';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ResetPassword() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const [emailError, setEmailError] = useState(false);

  function onSubmit(data) {
    axios.post('/users/password', {
      user: {
        email: data.email,
      }
    })
    .then(() => {
      history.push("/reset_email_sent")
    })
    .catch(error => {
      if (error.response.data.errors.email.includes('not found')) {
        setEmailError(true)
      }
    })
  }

  return (
    <AuthContainer maxWidth="xs">
      <h2>Forgot your password?</h2>
      {emailError && <Typography color='secondary'>Email not found</Typography>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name="email"
          inputRef={register}
          autoFocus
          fullWidth
          margin="normal"
          label="Email"
          type="email"
          placeholder="user@saas.com"
        />
        <Button
          type="submit"
          fullWidth
          className={classes.submit}
          variant='contained'
          color='primary'
        >
          Send me reset password instructions
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to="/sign_up" component={RouterLink}>Sign up</Link>
          </Grid>
          <Grid item>
            <Link to="" component={RouterLink}>Log in</Link>
          </Grid>
        </Grid>
      </form>
    </AuthContainer>
  );
}
