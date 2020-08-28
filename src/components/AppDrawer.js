import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0
  },
  drawerPaper: {
    width: 240,
  },
  navLogo: {
  	color: "purple",
  	fontWeight: "bold",
 		padding: theme.spacing(3)
  }
}));

export default function AppDrawer() {
	const classes = useStyles();

	return (
		<Drawer variant="permanent" anchor="left" className={classes.drawer} classes={{paper: classes.drawerPaper}}>
			<Typography className={classes.navLogo} variant="h4">SaaS</Typography>
			<List>
  			<ListItem button component={RouterLink} to="/posts">
  				<ListItemText>
  					Posts
  				</ListItemText>
  			</ListItem>
  			<ListItem button component={RouterLink} to="/team">
  				<ListItemText >
  					Team
  				</ListItemText>
  			</ListItem>
  			<ListItem button component={RouterLink} to="/billing">
  				<ListItemText>
  					Billing
  				</ListItemText>
  			</ListItem>
  			<ListItem button component={RouterLink} to="/settings">
  				<ListItemText>
  					Settings
  				</ListItemText>
  			</ListItem>
			</List>
		</Drawer>
	);
}