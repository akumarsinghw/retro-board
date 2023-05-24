import React from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {default as MButton} from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const RetroTable = ({sprintTypes, activeSprintData, noComments, updateCommentBoxType, handleModalOpen}) => {
  return (<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        {sprintTypes.map(item => <TableCell>
          <Box  sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography>{item.name}</Typography>
            <MButton variant="outlined" onClick={() => {
              updateCommentBoxType(item.key)
              handleModalOpen();
              }}>Add</MButton>
          </Box>
          </TableCell>)}
      </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
        {sprintTypes.map(item => 
          {return activeSprintData?.comments && activeSprintData.comments[item.key].length ? 
            <TableCell>
                {activeSprintData.comments[item.key].map(comment => {
                  console.log("kfjdsalkf: ", comment)
                  // TODO: Add better UI component.
                  return <Typography>{'- ' + comment}</Typography>;
                }) }
            </TableCell>
            :  <TableCell>{noComments}</TableCell>
            }
          )}
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>)
}