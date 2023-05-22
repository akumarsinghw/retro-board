import React from 'react'
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/base";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {default as MButton} from '@mui/material/Button';

function Retro() {
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [commentBoxType, setCommentBoxType] = React.useState(null);
  const [sprintName, setSprintName] = React.useState("SPRINT_123");
  const [comments, setComments] = React.useState({1: [], 2: [], 3: [], 4: []});
  
  const [sprintTypes, setSprintTypes] = React.useState();
  // let sprintTypes = React.useRef().current;


  // Effect to get all init data
  React.useEffect(()=>{
    (async ()=>{
      if(!sprintTypes) {
        const sprintTypesResponse = await fetch("http://localhost:3000/sprint/types");
        const temp = await sprintTypesResponse.json();
        setSprintTypes(temp.data);
        // console.log("sprintTypes: ", sprintTypes)
      }
    })()
  }, [])

  const addComment = (e) => {
    const {id} = e.target;
    const newVal = [...comments[id], e.target.value]
    setComments({
      ...comments,
      id: newVal
    });
  }
  const updateCommentBoxType = (t) => {
    console.log('t : ', t)
    setCommentBoxType(t)
  }

  const accordionTemplate = () => {
    if(!sprintTypes) return null;

    return sprintTypes.map(item => {
      return (<Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id={item.key}
        >
          <Box
            sx={{
              display: 'flex', direction: 'row', justifyContent: "space-between" , alignItems: "center"
            }}
          >
            <Typography>{item.name}</Typography>
            <MButton variant="outlined" onClick={() => updateCommentBoxType(item.key)}>Add</MButton>
          </Box>

        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            List of all comments
          </Typography>
        </AccordionDetails>
      </Accordion>
      )
    })
  }
  const textAreaTemplate = () => {
    let label = "";
    sprintTypes.map(item => {
      if(item.key === commentBoxType) {
        label=  item.name
      }
    })
    return <Box>
    <TextField
        id="1"
        label={label}
        placeholder={label}
        rows={4}
        multiline
      />
      <Box>
        <MButton variant="outlined">Cancel</MButton> 
        <MButton variant="contained">Submit</MButton> 
      </Box>
  </Box>
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, display: 'flex', direction: 'row', justifyContent: "space-between", alignItems: 'center' }}>
        <Box  sx={{  display: 'flex', direction: 'row', justifyContent: "space-between" }}>

        <TextField
          id="outlined-controlled"
          label="Enter Sprint Name"
          value={sprintName}
          fullWidth
          onChange={(event) => {
              setSprintName(event.target.value);
          }}
          InputProps={{
            readOnly: !isAdmin
          }}
        />
      {isAdmin && <MButton variant="contained">Update</MButton>}
      </Box>
      
      <Box>
        {isAdmin && <MButton variant="contained">End Session</MButton>}
        <MButton variant="contained">Refresh</MButton>
      </Box>

      </Box>
      <Box>
        {accordionTemplate()}
        {
          commentBoxType &&
          textAreaTemplate()
        }

      </Box>
    </Container>
  );
}



export default Retro;
