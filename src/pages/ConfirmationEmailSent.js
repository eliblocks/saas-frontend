import React from 'react'
import Typography from '@material-ui/core/Typography';
import AuthContainer from '../components/AuthContainer';

export default function ConfirmationEmailSent() {
	return (
	  <AuthContainer maxWidth="sm">
  		<Typography variant="h6">
				Signup Successful! You will receive an email confirmation shortly.
  		</Typography>
	  </AuthContainer>
	)
}