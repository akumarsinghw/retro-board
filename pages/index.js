import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/base";

export default function Index() {
  const [name, setName] = React.useState("");

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Team Retrospective
        </Typography>
        <TextField
          id="outlined-controlled"
          label="Enter Your Name"
          value={name}
          fullWidth
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        {name ? (
          <Box>
            <Button>Restro page</Button>
            <Button>Estimation page</Button>
          </Box>
        ) : (
          ""
        )}
        {name === "venkat" ? (
          <Box>
            <h4>Enter team members</h4>
            <TextField
          id="outlined-controlled"
          label="Enter Your Name"
          value={name}
          fullWidth
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        </Box>
        ) : (
          ""
        )}
      </Box>
    </Container>
  );
}
