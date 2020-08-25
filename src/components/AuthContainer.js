import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

export default function AuthContainer(props) {
	const maxWidth = props.maxWidth || "xs"
	const classes = useStyles();

	return (
		<Container component="main" maxWidth={maxWidth}>
			<div className={classes.paper}>
				{props.children}
			</div>
		</Container>
	)
}