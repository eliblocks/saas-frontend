import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link'
import useUser from '../hooks/use-user';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar() {
	const classes = useStyles();
	const { user } = useUser();

	return (
		<AppBar position="static">
		  <Toolbar>
		    <Typography variant="h6" className={classes.title}>
		    	<Link to="/dashboard" component={RouterLink} color='inherit' underline="none">
		      	SaaS
		      </Link>
		    </Typography>
		    {user && 
			    <Typography>
				    <Link to="/profile" component={RouterLink} color='inherit' underline='none'>
				    	<Button color="inherit">{user.email}</Button>
				    </Link>
				  </Typography>
				}
		  </Toolbar>
		</AppBar>
	);
}

export default Navbar;