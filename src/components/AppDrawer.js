import React from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import useUser from '../hooks/use-user';

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
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }
}));

export default function AppDrawer() {
	const classes = useStyles();
  const { user, mutate } = useUser();

  function logOut() {
    axios.delete("/users/sign_out").then(() => mutate(null));
  }

	return (
		<Drawer variant="permanent" anchor="left" className={classes.drawer} classes={{paper: classes.drawerPaper}}>
			<Typography className={classes.navLogo} variant="h4">SaaS</Typography>
			<List>
  			<ListItem button component={RouterLink} to="/tasks">
  				<ListItemText>
  					Tasks
  				</ListItemText>
  			</ListItem>
        { user.admin &&
          <React.Fragment>
      			<ListItem button component={RouterLink} to="/team">
      				<ListItemText >
      					Team
      				</ListItemText>
      			</ListItem>
      			<ListItem button component={RouterLink} to="/settings">
      				<ListItemText>
      					Settings
      				</ListItemText>
      			</ListItem>
          </React.Fragment>
        }
        <Divider className={classes.divider} />
        <ListItem button onClick={logOut}>
          <ListItemText>
            Log out
          </ListItemText>
        </ListItem>
			</List>

		</Drawer>
	);
}