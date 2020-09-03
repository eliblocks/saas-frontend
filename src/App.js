import axios from 'axios';
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import useUser from './hooks/use-user';
import AppDrawer from './components/AppDrawer'
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import ResetPassword from './pages/ResetPassword';
import EditPassword from './pages/EditPassword';
import ResetEmailSent from './pages/ResetEmailSent';
import ConfirmationEmailSent from './pages/ConfirmationEmailSent';
import EmailConfirmation from './pages/EmailConfirmation';
import AcceptInvitation from './pages/AcceptInvitation';
import Settings from './pages/Settings';

import Team from './pages/Team';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6)
  }
}));

export default function App() {
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Accept'] = 'application/json';
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
  axios.defaults.withCredentials = true;



  const { user, loading } = useUser();
  if (loading) { return "loading"}

  return (
    <Router>
      <CssBaseline />
      { user ? <AuthenticatedApp /> : <UnauthenticatedApp /> }
    </Router>
  );
}

function AuthenticatedApp() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppDrawer />
      <Container className={classes.content}>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/tasks">
            <Tasks />
          </Route>
          <Route path="/team">
            <Team />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Redirect to="/dashboard" />
        </Switch>
      </Container>
    </div>
  );
}

function UnauthenticatedApp() {
  return (
    <div>
      <Switch>
        <Route path="/sign_up">
          <SignUp />
        </Route>
        <Route path="/reset_password">
          <ResetPassword />
        </Route>
        <Route path="/users/password/edit">
          <EditPassword />
        </Route>
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path="/reset_email_sent">
          <ResetEmailSent />
        </Route>
        <Route path="/confirmation_email_sent">
          <ConfirmationEmailSent />
        </Route>
        <Route path="/confirm_email">
          <EmailConfirmation />
        </Route>
        <Route path="/accept_invitation">
          <AcceptInvitation />
        </Route>
        <Redirect to="/login" />
      </Switch>
    </div>
  );
}

