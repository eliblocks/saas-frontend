import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import InviteUser from '../components/InviteUser';
import useUsers from '../hooks/use-users';

export default function Team() {
  const { users, mutate, error } = useUsers();


  if (!users) { return "Loading" }

  return (
    <div>
      <Grid container justify="flex-end">
        <InviteUser mutate={mutate} />
      </Grid>
      <br />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Actions
              </TableCell>
              <TableCell>
                Team Member
              </TableCell>
              <TableCell>
                Role
              </TableCell>
              <TableCell>
                Last Login
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  {user.email}
                </TableCell>
                <TableCell>
                  Admin
                </TableCell>
                <TableCell>
                  Yesterday
                </TableCell>
              </TableRow>
             ))}
            </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}