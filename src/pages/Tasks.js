import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import AddTask from '../components/AddTask';
import useTasks from '../hooks/use-tasks';

const useStyles = makeStyles((theme) => ({
  completedTask: {
    textDecoration: "line-through",
  },
}));

export default function Team() {
  const classes = useStyles();
  const { tasks, isLimited, mutate } = useTasks();

  function handleUpdate(id) {
    axios.patch(`/tasks/${id}`).then(() => mutate());
  }

  function handleDelete(id) {
    axios.delete(`/tasks/${id}`).then(() => mutate());
  }

  return (
    <div>
      <Grid container justify="flex-end">
        <AddTask mutate={mutate} isLimited={isLimited} />
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
                Task
              </TableCell>
              <TableCell>
                Created by
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks?.map(task => (
              <TableRow key={task.id}>
                <TableCell>
                  <IconButton>
                    { task.completor ?
                      <ClearIcon onClick={() => handleUpdate(task.id)} />
                    :
                      <CheckIcon onClick={() => handleUpdate(task.id)} />
                    }
                  </IconButton>
                  <IconButton onClick={() => handleDelete(task.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell className={task.completor ? classes.completedTask : ''}>
                  {task.content}
                </TableCell>
                 <TableCell>
                  {task.creator}
                 </TableCell>
              </TableRow>
             ))}
            </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
