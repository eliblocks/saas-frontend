import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({

}));

export default function AuthContainer(props) {
	const maxWidth = props.maxWidth || "xs"
	const classes = useStyles();

	return (
		<Container component="main">
			{props.children}
		</Container>
	)
}