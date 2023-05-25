import React, { useEffect } from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ADMIN_USERNAME } from "/src/constants";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const index = () => {
  const [taskID, setTaskID] = useState();
  const [taskInfo, setTaskInfo] = useState();
  const [allRatings, setAllRatings] = useState({});
  const [showCards, setShowCards] = useState(false);
  const [user, setUser] = useState();
  const [selected, setSelected] = useState();
  const [showTable, setTable] = useState(false);
  const isAdminValue = ADMIN_USERNAME;

  var ratings = [
    {
      rating: 1,
      label: "One",
    },
    {
      rating: 2,
      label: "Two",
    },
    {
      rating: 3,
      label: "Three",
    },
    {
      rating: 5,
      label: "Five",
    },
    {
      rating: 8,
      label: "Eight",
    },
    {
      rating: 13,
      label: "Thirteen",
    },
    {
      rating: 21,
      label: "Twenty-one",
    },
    {
      rating: 34,
      label: "Thirty-four",
    },
  ];

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const getData = () => {
    const res = axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/estimation/current`,
    })
      .then((res) => {
        setTaskInfo(res.data);
        setShowCards(true);
        console.log(res.data);
      })
      .catch((err) => {});
  };

  const submitVote = () => {
    const res = axios({
      method: "post",
      url:
        `${process.env.NEXT_PUBLIC_DOMAIN}/estimation/` +
        taskInfo?.data.task_id,
      data: {
        email: user.email,
        vote: selected.rating,
      },
    })
      .then((res) => {
        console.log("Submitted", res.data);
      })
      .catch((err) => {
        console.log("error", res.err);
      });
  };

  const submitTask = () => {
    const res = axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/task/`,
      data: {
        id: taskID,
      },
    })
      .then((res) => {
        console.log("Submitted", res.data);
      })
      .catch((err) => {
        console.log("error", res.err);
      });
  };

  const endSession = () => {
    const res = axios({
      method: "put",
      url:
        `${process.env.NEXT_PUBLIC_DOMAIN}/estimation/end/` +
        taskInfo?.data.task_id,
    })
      .then((res) => {
        console.log("ended", res.data);
      })
      .catch((err) => {
        console.log("error", res.err);
      });
  };

  const getPreSession = () => {
    const res = axios({
      method: "get",
      url:
        `${process.env.NEXT_PUBLIC_DOMAIN}/estimations/` +
        taskInfo?.data.task_id,
    })
      .then((res) => {
        setAllRatings(res.data.data.ratings);
        setTable(true);
        console.log("fetched", res.data);
      })
      .catch((err) => {
        console.log("error", res.err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Container maxWidth="md">
        {console.log(allRatings,"rat")}
        {user && user.name == isAdminValue && (
          <Box
            my={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              id="task-id"
              variant="outlined"
              sx={{ width: "90%" }}
              autoFocus
              // disabled={user && user.name != isAdminValue ? true : false}
              placeholder="Enter task ID"
              value={taskID}
              onChange={(event) => {
                setTaskID(event.target.value.replace(/\s/g, ""));
              }}
            />
            <Button
              variant="outlined"
              onClick={submitTask}
              disabled={!taskID}
              sx={{ my: 2 }}
            >
              Submit
            </Button>
            <Button variant="outlined" sx={{ my: 2 }} onClick={endSession}>
              End Session
            </Button>
            <Button variant="outlined" sx={{ my: 2 }} onClick={getPreSession}>
              Get Previous session Info
            </Button>
            {showTable && (
              <TableContainer component={Paper}>
                <h4>Submissions</h4>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Email ID</StyledTableCell>
                      <StyledTableCell align="right">Ratings</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allRatings.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                          {row.email}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.vote}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        )}
        <Button variant="outlined" sx={{ my: 2 }} onClick={getData}>
          Get Data
        </Button>

        <h3>{taskInfo?.data.task_id}</h3>
        {showCards && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid
              container
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {ratings.map((rating, i) => (
                <Grid
                  item
                  key={i}
                  xs={3}
                  onClick={() => {
                    setSelected(ratings[i]);
                  }}
                  sx={{
                    m: 2,
                    borderRadius: "10px",
                    height: 100,
                    border:
                      selected?.rating == rating.rating
                        ? "1px solid #556cd6"
                        : "1px solid black",
                    boxShadow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "block",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6" mx={6}>
                      {rating.rating} points
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Button
              variant="outlined"
              disabled={!selected}
              onClick={submitVote}
              sx={{ my: 2 }}
            >
              Submit Response
            </Button>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default index;
