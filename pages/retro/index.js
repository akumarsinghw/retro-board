// WIP: APIs needs to be integrated.
import React from 'react'
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {default as MButton} from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {GET_SPRINT_TYPE, GET_ACTIVE_SPRINT, POST_COMMENT, POST_CREATE_SPRINT, POST_END_SPRINT} from '/src/api';




function Retro() {
  const [isAdmin, setIsAdmin] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [commentBoxType, setCommentBoxType] = React.useState(null);
  const [sprintName, setSprintName] = React.useState("SPRINT_123");
  const [comment, setComment] = React.useState("");
  const [activeSprintData, setActiveSprintData] = React.useState({});
  
  const [sprintTypes, setSprintTypes] = React.useState();
  // let sprintTypes = React.useRef().current;


  // Effect to get all init data
  React.useEffect(()=>{
    (async ()=>{
      if(!sprintTypes) {
        const sprintTypes = await GET_SPRINT_TYPE();
        setSprintTypes(sprintTypes);
        
      }

      const sprintData = await GET_ACTIVE_SPRINT();
      setSprintName(sprintData.sprint_id);
      setActiveSprintData(sprintData);
    })()
  }, [])

  
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const refreshSprintData = () => {
    (async ()=>{
    const sprintData = await GET_ACTIVE_SPRINT();
    setSprintName(sprintData.sprint_id);
    setActiveSprintData(sprintData);
    })()
  }
  const createSession = () => {
    POST_CREATE_SPRINT({payload: {id: sprintName}})
  }
  const endSession = () => {
    POST_END_SPRINT({id: activeSprintData.sprint_id})
  }

  const submitComment = () => {
    const payload =  {key: commentBoxType, comment: comment}
    POST_COMMENT({id: activeSprintData.sprint_id, payload})
  }
  const updateCommentBoxType = (t) => {
    setCommentBoxType(t)
  }

  const accordionTemplate = () => {
    if(!sprintTypes) return null;
    const noComments = <Typography sx={{fontStyle: 'italic', fontSize: 14, pl: 3, mb: 4}}>
      No Comments
    </Typography>

    return sprintTypes.map(item => {
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
                return <li>comment</li>;
              }) }
              </ul>
              : noComments}
        </Box>

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

  if(!activeSprintData.sprint_id) {
    return <Container maxWidth="sm">
      <Typography>
        No Active Sprint. Wait for Admin to Start the Session.
      </Typography>
    </Container>
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
      {isAdmin && <MButton variant="contained" onClick={()=>{createSession()}}>Create</MButton>}
      </Box>
      
      <Box>
        {isAdmin && <MButton variant="contained" onClick={()=>{endSession()}}>End Session</MButton>}
        <MButton variant="contained" onClick={()=>{refreshSprintData()}}>Refresh</MButton>
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
