import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import AuthContainer from '../components/AuthContainer';

export default function EmailConfirmation() {
	const location = useLocation();
	const history = useHistory();
	const [error, setError] = useState();

	useEffect(() => {
		axios.get("/users/confirmation" + location.search)
		.then(() => history.push("/login?message=Email confirmed! Please log in."))
		.catch(error => {
			const errorData = error.response.data
			if (errorData.email) {
				setError(`Email ${errorData.email[0]}`)
			}
			if (errorData.confirmation_token) {
				setError(`Confirmation token ${errorData.confirmation_token}`)
			}
		});
	}, [history, location.search]);

	return (
	  <AuthContainer maxWidth="sm">
	  	{error && <Typography color='secondary'>{error}</Typography>}
	  </AuthContainer>
	)
}
