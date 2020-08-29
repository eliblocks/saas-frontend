import React, { useState, useEffect } from 'react'
import axios from 'axios';
import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AuthContainer from '../components/AuthContainer';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AcceptInvitation() {
  const location = useLocation();
  const history = useHistory();
  const invitationToken = queryString.parse(location.search).invitation_token
  const classes = useStyles();
  const { register, handleSubmit, errors, setError } = useForm();
  const [isInvalid, setIsInvalid] = useState();

  function onSubmit(data) {
    axios.patch("/users/invitation", {
      user: {
        full_name: data.full_name,
        password: data.password,
        invitation_token: invitationToken
      },
    })
    .then(() => history.push("/dashboard"))
    .catch(error => {
      const errors = error.response.data.errors
      if (errors.invitation_token) {
        setIsInvalid(true)
      }
      if (errors.password) {
        setError('password', { type: "manual", message: `Password ${errors.password[0]}` })
      }
      if (errors.full_name) {
        setError('full_name', { type: "manual", message: `Full name ${errors.full_name[0]}` })
      }
    })
  }

  return (
    <AuthContainer>
      {isInvalid && <Typography color='secondary'>Invalid token</Typography>}
      <h2>Complete your signup</h2>
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
          Set password
        </Button>
      </form>
    </AuthContainer>
  )
}