import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import useAccount from '../hooks/use-account';
import ChangePlan from '../components/ChangePlan';

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 400,
    padding: theme.spacing(2),
  },
}));

export default function Settings() {
  const { account, mutate } = useAccount();
  const classes = useStyles();

  if (!account) { return "Loading..." }

  return (
    <div>
      <Paper className={classes.paper}>
        <Typography variant="h6">Account plan: {account.plan}</Typography>
        <ChangePlan account={account} mutate={mutate} />
      </Paper>
    </div>
  );
}
