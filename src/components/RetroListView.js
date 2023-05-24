import React from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {default as MButton} from '@mui/material/Button';

export const RetroListView = ({sprintTypes, activeSprintData, noComments, updateCommentBoxType, handleModalOpen}) => {
    const template =  sprintTypes.map(item => {
        return (
          <Box sx={{mb: 4, borderWidth: 0, borderBottomWidth: 2, borderStyle: 'solid'}}>
            <Box
              sx={{display: 'flex', direction: 'row', justifyContent: "space-between" , alignItems: "center"
              }}
            >
              <Typography>{item.name}</Typography>
              <MButton variant="outlined" onClick={() => {
                updateCommentBoxType(item.key)
                handleModalOpen();
                }}>Add</MButton>
            </Box>
              {activeSprintData?.comments && activeSprintData.comments[item.key].length ? 
                <ul>
                {activeSprintData.comments[item.key].map(comment => {
                  // TODO: Add better UI component.
                  return <li>{comment}</li>;
                }) }
                </ul>
                : noComments}
          </Box>
  
        )
      })

      return (<Box>
      {template}
      </Box>)
}