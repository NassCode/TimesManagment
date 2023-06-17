import { useState } from "react";
import Task from "./Task";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CachedIcon from "@mui/icons-material/Cached";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import RestorePageIcon from "@mui/icons-material/RestorePage";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import ClearIcon from '@mui/icons-material/Clear';
import Divider from '@mui/material/Divider';
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Tasks = ({
  tasks,
  onEdit,
  resetTask,
  restoreTask,
  refresh,
  hardRefresh,
  inProgress,
  notes,
  deleteNote,
  addNote
}) => {
  const [value, setValue] = useState(0);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false); setNewNote("")};
  const [newNote, setNewNote] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNewNote = (e) => {
    setNewNote(e.target.value);
    };

  return (
    <div>
      {value === 0 &&
        tasks.map((task) => (
          <Task
            inProgress={inProgress}
            ps
            key={task.id}
            resetTask={resetTask}
            restoreTask={restoreTask}
            task={task}
            onEdit={onEdit}
          />
        ))}

      

      {notes.length > 0 && (
        <div className="notes">
          <p className="moving-text">
            {notes[0].notes.map((note) => (
              <span>{`   .${note}   `}</span>
            ))}
          </p>
        </div>
      )}

      {!inProgress && (
        <div style={{ height: "4px" }}>
          <p></p>
        </div>
      )}

      {inProgress && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}

      <Tabs value={value} onChange={handleChange}>
        <Tab icon={<SportsEsportsIcon />} />
        <CachedIcon onClick={refresh} className="refreshBtn" />
        <RestorePageIcon onClick={hardRefresh} className="restoreBtn" />
        <NoteAddIcon className="noteBtn" onClick={handleOpen} />
      </Tabs>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            {notes.length > 0 &&
              notes[0].notes.map((note, i) => (
                <div >
                    <div className="notesContainer">
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {note}
                    </Typography>
                    <ClearIcon onClick={() => deleteNote(i)} />
                    </div>
                    <Divider />
                    
                </div>
                
                ))}
                
                <div className="notesSubmitContainer">
                    
                    <TextField sx={{mt: 1, mb: 1,width: 220, maxWidth: '100%'}} label="Add a note" variant="outlined" value={newNote} onChange={handleNewNote} multiline />
                    
                   
                   <Button disabled={(newNote.length === 0 ? true: false)} variant="outlined" color="success" onClick={() => {
                        addNote(newNote);
                        setNewNote("");                       
                    }}>Add</Button>
                    
                   
                   
                </div>
                <Button variant="outlined" color="error" onClick={handleClose}>Close</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Tasks;
