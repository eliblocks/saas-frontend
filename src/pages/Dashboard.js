import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  paper: {
    minWidth: 300,
    minHeight: 75,
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(2),
  },
}));

function Dashboard() {
  const classes = useStyles();
  const [dashboard, setDashboard] = useState();

  useEffect(() => {
    axios.get('/dashboard')
    .then(response => setDashboard(response.data))
  }, []);

  if (!dashboard) { return null };

  return (
    <div>
     <h2>Dashboard</h2>
     <Grid container>
     <Paper className={classes.paper}>
        <Typography>Account Age: {dashboard.account_age}</Typography>
      </Paper>
      <Paper className={classes.paper}>
          <Typography>Plan: {dashboard.plan}</Typography>
      </Paper>
      <Paper className={classes.paper}>
          <Typography>Team size: {dashboard.users_count}</Typography>
      </Paper>
    </Grid>
    </div>
  );
}

export default Dashboard
