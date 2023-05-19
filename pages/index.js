import * as React from "react";
import Container from "@mui/material/Container";
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Link from 'next/link';
import { useState, useEffect } from "react"
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export default function Index() {

  const users = [
    {
      name: "Venkat",
      email: "venkat@wayfair.com"
    },
    {
      name: "Abhishek",
      email: "Abhishek@wayfair.com"
    },
    {
      name: "Rehman",
      email: "Rehman@wayfair.com"
    }
  ];

  const [value, setValue] = useState(users[0]);
  const [isAdmin, setIsAdmin] = useState(false);
  const isAdminValue = "Venkat"
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword] = useState("");
  const [newUsers, setNewUsers] = useState(users);


  useEffect(() => {
    if (value == null) {
      setIsAdmin(false)
    }
  }, [value]);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Team Retrospective
        </Typography>
        <Autocomplete
          value={value}
          fullWidth
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option) => option.name}
          id="value"
          options={users}

          renderInput={(params) => <TextField {...params} label="Enter Your Name" />}
        />
        {value && value.name && value.name != isAdminValue ? (
          <Box my={4} sx={{ display: "flex", alignItems: "space-between", justifyContent: "space-between" }}>
            <Link href="/retro">
              <Button variant="outlined">Retro page</Button>
            </Link>
            <Link href="/estimate">
              <Button variant="outlined">Estimation page</Button>
            </Link>
          </Box>
        ) : (
            ""
          )}
        {value && value.name == isAdminValue ? (
          <Box my={2}>
            <TextField
              id="outlined-controlled"
              label="Enter Your password"
              type="password"
              value={password}
              fullWidth
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  if (password == "qwerty@123") {
                    setIsAdmin(true)
                  }
                  else {
                    setIsAdmin(false)
                  }
                }
              }}
            />
          </Box>
        ) : (
            ""
          )}
        {
          isAdmin &&
          <Box>

            <Box my={4} sx={{ display: "flex", alignItems: "space-between", justifyContent: "space-between" }}>
              <Link href="/retro">
                <Button variant="outlined">Retro page</Button>
              </Link>
              <Link href="/estimate">
                <Button variant="outlined">Estimation page</Button>
              </Link>
            </Box>
            <Box p={2} boxShadow={1}>
              <Grid container my={1} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Grid item xs={1} >
                  <Typography>Sl.no </Typography>
                </Grid>
                <Grid item xs={5} px={1} >
                  <Typography>Name </Typography>
                </Grid>
                <Grid item xs={5} px={1} >
                  <Typography>Email ID </Typography>
                </Grid>
                <Grid item xs={.5} >
                  <Typography>Options </Typography>
                </Grid>
              </Grid>
              {newUsers.map((newUser, i) => (
                <Grid key={i} container my={1} sx={{ display: "flex", border: 0, alignItems: "center", justifyContent: "center" }}>
                  <Grid item xs={1} >
                    <Typography>{i + 1} </Typography>
                  </Grid>
                  <Grid item xs={5} px={1} >
                    <TextField
                      id="new-name"
                      variant="outlined"
                      sx={{ width: "90%" }}
                      placeholder="Enter team mate name"
                      value={newUsers[i].name}
                      onChange={(event) => {
                        var temp = newUsers;
                        temp[i].name = event.target.value.toLowerCase();
                        setNewUsers([...temp]);
                      }}
                    />
                  </Grid>
                  <Grid item xs={5} >
                    <TextField
                      id="new-email"
                      variant="outlined"
                      sx={{ width: "90%" }} s
                      placeholder="Enter team mate email"
                      value={newUsers[i].email}
                      onChange={(event) => {
                        var temp = newUsers;
                        temp[i].email = event.target.value.toLowerCase();
                        setNewUsers([...temp]);
                      }}
                    />
                  </Grid>
                  <Grid item xs={0.5} >
                    <IconButton
                      sx={{ color: "#000" }}
                      onClick={() => {
                        var temp = newUsers;
                        temp.splice(i, 1);
                        setNewUsers([...temp]);
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Grid container sx={{ display: "flex", alignItems: "space-between", justifyContent: "space-between", mt: 10 }} >
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                  >
                    Submit
                </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    sx={{ color: "#3484E6" }}
                    variant="text"
                    onClick={() => {
                      let temp = newUsers;
                      temp.push({
                        name: "",
                        email: "",
                      });
                      setNewUsers([...temp]);
                    }}
                  >
                    Add more
                </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        }
      </Box>
    </Container>
  );
}
