import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    padding: theme.spacing(4),
  },
  authLogo: {
  	marginTop: theme.spacing(10),
  	color: "purple",
  	fontWeight: "bold",
  }
}));

export default function AuthContainer(props) {
	const maxWidth = props.maxWidth || "xs"
	const classes = useStyles();

	return (
		<Container component="main" maxWidth={maxWidth}>
			<Typography align="center" variant="h4" className={classes.authLogo}>SaaS</Typography>
			<Paper className={classes.paper}>
				{props.children}
			</Paper>
		</Container>
	)
}
