import { useState } from "react";
import Task from "./Task";
import Button from "@mui/material/Button";
import CachedIcon from "@mui/icons-material/Cached";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import RestorePageIcon from "@mui/icons-material/RestorePage";
import ClearIcon from "@mui/icons-material/Clear";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

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
  addTask,
  deleteTask,
  onEdit,
  resetTask,
  restoreTask,
  refresh,
  hardRefresh,
  inProgress,
}) => {
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => {
    setOpen2(false);
    setNewTask("");
  };
  const [newTask, setNewTask] = useState("");

  const handleNewTask = (e) => {
    setNewTask(e.target.value);
  };

  return (
    <div>
      {tasks.length > 0 &&
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

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "5px",
          margin: "8px 0",
        }}
      >
        <CachedIcon onClick={refresh} className="refreshBtn" />
        <RestorePageIcon onClick={hardRefresh} className="restoreBtn" />
        <AddIcon className="noteBtn" onClick={handleOpen2} />
      </div>

      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            {tasks.length > 0 &&
              tasks.map((task, i) => (
                <div key={i}>
                  <div className="notesContainer">
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      {task.text}
                    </Typography>
                    <ClearIcon onClick={() => deleteTask(task.id)} />
                  </div>
                  <Divider />
                </div>
              ))}

            <div className="notesSubmitContainer">
              <TextField
                sx={{ mt: 1, mb: 1, width: 220, maxWidth: "100%" }}
                label="Name new timer"
                variant="outlined"
                value={newTask}
                onChange={handleNewTask}
                multiline
              />

              <Button
                disabled={newTask.length === 0 ? true : false}
                variant="outlined"
                color="success"
                onClick={() => {
                  addTask(newTask);
                  setNewTask("");
                  handleClose2();
                }}
              >
                Add
              </Button>
            </div>
            <Button variant="outlined" color="error" onClick={handleClose2}>
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Tasks;
