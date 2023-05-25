// WIP: APIs needs to be integrated.
import React from 'react'
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {default as MButton} from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {RetroTable, RetroListView} from '/src/components';
import {GET_SPRINT_TYPE, GET_ACTIVE_SPRINT, POST_COMMENT, POST_CREATE_SPRINT, POST_END_SPRINT} from '/src/api';
import { ADMIN_USERNAME } from "/src/constants";



function Retro() {
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [commentBoxType, setCommentBoxType] = React.useState(null);
  const [sprintName, setSprintName] = React.useState("SPRINT_123");
  const [comment, setComment] = React.useState("");
  const [activeSprintData, setActiveSprintData] = React.useState({});
  
  const [sprintTypes, setSprintTypes] = React.useState();
  let intervalRef = React.useRef().current;



  const refreshSprintData = () => {
    (async ()=>{
    const sprintData = await GET_ACTIVE_SPRINT();
    setSprintName(sprintData.sprint_id);
    setActiveSprintData(sprintData);
    })()
  }

  // Effect to get all init data
  React.useEffect(()=>{
    const logedInUser = JSON.parse(localStorage.getItem("user"));
    console.log("logedInUser: ",logedInUser)
    // Only checking for username
    if(logedInUser.name === ADMIN_USERNAME) {
      setIsAdmin(true);
    }
  }, [])
  React.useEffect(()=>{
    (async ()=>{
      if(!sprintTypes) {
        const sprintTypes = await GET_SPRINT_TYPE();
        setSprintTypes(sprintTypes);
        
      }
      refreshSprintData();

      if(!intervalRef) {
        intervalRef = setInterval(()=>{
          refreshSprintData();
        }, 5000)
      }
      
    })()
    return () => {
      clearInterval(intervalRef);
    }
  }, [])

  
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const createSession = () => {
    POST_CREATE_SPRINT({payload: {id: sprintName}})
  }
  const endSession = () => {
    POST_END_SPRINT({id: activeSprintData.sprint_id})
  }

  const submitComment = () => {
    const payload =  {key: commentBoxType, comment: comment}
    POST_COMMENT({id: activeSprintData.sprint_id, payload});
    setComment();
    handleModalClose();
    refreshSprintData();
  }
  const updateCommentBoxType = (t) => {
    setCommentBoxType(t)
  }

  const accordionTemplate = () => {
    if(!sprintTypes) return null;
    const noComments = <Typography sx={{fontStyle: 'italic', fontSize: 14, pl: 3, mb: 4}}>
      No Comments
    </Typography>
    return <RetroTable handleModalOpen={handleModalOpen} updateCommentBoxType={updateCommentBoxType} noComments={noComments} sprintTypes={sprintTypes} activeSprintData={activeSprintData} />
    // Below code is for List View
    return <RetroListView handleModalOpen={handleModalOpen} updateCommentBoxType={updateCommentBoxType} noComments={noComments} sprintTypes={sprintTypes} activeSprintData={activeSprintData} />
  }
  const textAreaTemplate = () => {
    let label = "";
    sprintTypes?.map(item => {
      if(item.key === commentBoxType) {
        label=  item.name
      }
    })

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };


    return (<Modal
    open={isModalOpen}
    onClose={handleModalClose}
  >
    
    <Box sx={style}>
      <TextField
          id={commentBoxType}
          label={label}
          placeholder={label}
          rows={4}
          multiline
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
        }}
        sx={{
          width: '100%'
        }}
        />
        <Box 
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pt: 2
          }}
        >
          <MButton variant="outlined" onClick={handleModalClose}>Cancel</MButton> 
          <MButton variant="contained" onClick={submitComment}>Submit</MButton> 
        </Box>
      </Box>
    </Modal>)
  }

  const noActiveSprintTemplate = () => {
    return <Container maxWidth="sm">
      <Typography>
        No Active Sprint. Wait for Admin to Start the Session.
      </Typography>
    </Container>
  }

  return (
    <Container maxWidth="lg">
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
      {isAdmin && <MButton variant="contained" onClick={()=>{createSession()}}>Create</MButton>}
      </Box>
      
      <Box>
        {isAdmin && <MButton variant="contained" onClick={endSession}>End Session</MButton>}
        <MButton variant="contained" onClick={()=>{refreshSprintData()}}>Refresh</MButton>
      </Box>

      </Box>
      <Box>
        { activeSprintData.sprint_id ? accordionTemplate() : noActiveSprintTemplate()}
        {textAreaTemplate()}
      </Box>
    </Container>
  );
}



export default Retro;
