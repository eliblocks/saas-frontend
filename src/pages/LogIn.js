import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import useUser from '../hooks/use-user';
import AuthContainer from '../components/AuthContainer';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LogIn() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const location = useLocation();
  const { mutate } = useUser();
  const [error, setError] = useState();
  const [SnackbarOpen, setSnackbarOpen] = useState(false);
  const message = queryString.parse(location.search).message;

  useEffect(() => {
    if (message) {
      setSnackbarOpen(true)
    }
  }, [message])

  function onSubmit(data) {
    axios.post('/users/sign_in', {
      user: {
        email: data.email,
        password: data.password
      }
    })
    .then(() => mutate())
    .catch(error => setError(error.response.data.error))
  }

  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  return (
    <AuthContainer>
      <h2>Log in</h2>
      {error && <Typography color="secondary">{error}</Typography>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          inputRef={register}
          autoFocus
          fullWidth
          margin="normal"
          label="Email"
          type="email"
          name="email"
          placeholder="user@saas.com"
        />
        <TextField
          inputRef={register}
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          name="password"
          placeholder="**********"
        />
        <Button
          type="submit"
          fullWidth
          className={classes.submit}
          variant='contained'
          color='primary'
        >
          Log in
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to="/reset_password" component={RouterLink}>Forgot password?</Link>
          </Grid>
          <Grid item>
            <Link to="/sign_up" component={RouterLink}>Don't have an account? Sign up</Link>
          </Grid>
        </Grid>
      </form>
      <Snackbar message={message} open={SnackbarOpen} onClose={handleSnackbarClose} />
    </AuthContainer>
    
  );
}

export default LogIn;