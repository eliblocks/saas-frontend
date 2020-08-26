import React, { useState } from 'react';
import axios from 'axios';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AuthContainer from '../components/AuthContainer';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp() {
  const classes = useStyles();
  const { register, handleSubmit, errors, setError } = useForm();
  const history = useHistory();
  const [isError, setIsError] = useState();

  function onSubmit(data) {
    axios.post('/users.json', {
      user: {
        full_name: data.full_name,
        email: data.email,
        password: data.password
      }
    })
    .then(() => {
      history.push('/confirmation_email_sent');
    })
    .catch(error => {
      console.log(error)
      setIsError(true)
      const errors = error.response.data.errors
      if (errors.full_name) {
        setError('full_name', { type: "manual", message: `Full name ${errors.full_name[0]}` })
      }
      if (errors.email) {
        setError('email', { type: "manual", message: `Email ${errors.email[0]}` })
      }
      if (errors.password) {
        setError('password', { type: "manual", message: `Password ${errors.password[0]}` })
      }
    })
  }

  return (
    <AuthContainer>
      <h2>Sign up</h2>
      {isError && <Typography color='secondary'>Signup failed</Typography>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={!!errors.full_name}
          helperText={errors.full_name?.message}
          inputRef={register}
          autoFocus
          fullWidth
          margin="normal"
          label="Full name"
          name="full_name"
          type="text"
          placeholder="John Smith"
        />
        <TextField
          error={!!errors.email}
          helperText={errors.email?.message}
          inputRef={register}
          autoFocus
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          placeholder="user@saas.com"
        />
        <TextField
          error={!!errors.password}
          helperText={errors.password?.message}
          inputRef={register}
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type="password"
          placeholder="**********"
        />
        <Button
          type="submit"
          fullWidth
          className={classes.submit}
          variant='contained'
          color='primary'
        >
          Sign up
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link to="/" component={RouterLink}>Already have an account? Log in</Link>
          </Grid>
        </Grid>
      </form>
    </AuthContainer>
  );
}

export default SignUp;