import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useUser from '../hooks/use-user';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    maxWidth: 450,
  },
  mb: {
    marginBottom: theme.spacing(2),
  }
}));

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isError, setIsError] = useState();
  const { user, error, mutate } = useUser();
  const { register, handleSubmit, errors, setError } = useForm();
  const classes = useStyles();

  function onSubmit(data) {
    axios.patch(`/users`, {
      user: {
        email: data.email,
        full_name: data.full_name,
        current_password: data.current_password,
        password: data.password,
      }
    })
    .then(() => {
       mutate();
       setIsEditing(false);
    })
    .catch(error => {
      setIsError(true)
      const errors = error.response.data.errors
      console.log(errors)
      if (!errors) { return }

      if (errors.full_name) {
        setError('full_name', { type: "manual", message: `Full name ${errors.full_name[0]}` })
      }
      if (errors.email) {
        setError('email', { type: "manual", message: `Email ${errors.email[0]}` })
      }
      if (errors.current_password) {
        setError('current_password', { type: "manual", message: `Password ${errors.current_password[0]}` })
      }
      if (errors.password) {
        setError('password', { type: "manual", message: `Password ${errors.password[0]}` })
      }
    })
  }

  if (!user) { return "Loading..." }

	return (
		<div>
      {isEditing ? (
        <Paper className={classes.paper}>
          {isError && <Typography className={classes.mb} color='secondary'>Update failed</Typography>}
    			<form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              error={!!errors.full_name}
              helperText={errors.full_name?.message}
              inputRef={register}
              name="full_name"
              label="Full name"
              type="text"
              fullWidth
              defaultValue={user.full_name}
              className={classes.mb}
            />
            <TextField
              error={!!errors.email}
              helperText={errors.email?.message}
              inputRef={register}
              name="email"
              label="Email"
              type="email"
              fullWidth
              defaultValue={user.email}
              className={classes.mb}
            />
            <TextField
              error={!!errors.current_password}
              helperText={errors.current_password?.message}
              inputRef={register}
              name="current_password"
              label="Current password (to confirm your changes)"
              type="password"
              fullWidth
              className={classes.mb}
            />
            <TextField
              error={!!errors.password}
              helperText={errors.password?.message}
              inputRef={register}
              name="password"
              label="New password (if you want to change it)"
              type="password"
              fullWidth
              className={classes.mb}
            />
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </form>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Grid container justify="space-between">
            <Grid>
              <Typography className={classes.mb} variant="h4">Profile</Typography>
            </Grid>
            <Grid>
              <IconButton onClick={() => setIsEditing(true)}>
                <EditIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Typography variant="h6">Full name</Typography>
          <Typography>{user.full_name}</Typography>
          <Typography variant="h6">Email</Typography>
          <Typography>{user.email}</Typography>
          <Typography variant="h6">Joined</Typography>
          <Typography>{user.created_at}</Typography>
        </Paper>
      )}
		</div>
	);
}