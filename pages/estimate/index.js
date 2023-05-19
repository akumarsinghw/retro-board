import React from "react";
import { useState } from "react";
import { Box, Container, TextField } from "@mui/material";

const index = () => {
  const [taskID, setTaskID] = useState();

  return (
    <div>
      <Container maxWidth="md">
        <Box my={2}>
          <TextField
            id="task-id"
            variant="outlined"
            sx={{ width: "90%" }}
            placeholder="Enter task ID"
            value={taskID}
            onChange={(event) => {
              setTaskID(event.target.value);
            }}
          />
        </Box>
      </Container>
    </div>
  );
};

export default index;
