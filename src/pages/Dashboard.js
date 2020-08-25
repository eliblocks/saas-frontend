import React, { useEffect, useState } from 'react'
import axios from 'axios';
import useUser from '../hooks/use-user';

function Dashboard() {
  const { mutate } = useUser();
  const [message, setMessage] = useState()

  useEffect(() => {
    axios.get('/dashboard')
    .then(response => setMessage(response.data.message))
  }, [message]);

  function logOut(e) {
    e.preventDefault();
    axios.delete("/users/sign_out").then(() => mutate(null));
  }

  return (
    <div>
      <p>{message}</p>
      <br />
      <button onClick={logOut}>Log Out</button>
    </div>
  );
}

export default Dashboard