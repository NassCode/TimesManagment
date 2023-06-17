import React from "react";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "react-modal";
import UpdateForm from "./UpdateForm";
import Countdown from "react-countdown";
import StopWatch from "./OPcomponents/StopWatch";
import StaticTimestamp from "./StaticTimestamp";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import NotesIcon from "@mui/icons-material/Notes";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RestoreIcon from "@mui/icons-material/Restore";


Modal.setAppElement("#root");

const Task = ({
  task,
  onEdit,
  resetTask,
  restoreTask,
  ps,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const parsedTaskDate = new Date(task.date);
  // const taskDateMs = parsedTaskDate
  const initTime = Date.now();
  const parsed = new Date(initTime);
  const [isReserved, setIsReserved] = useState(task.reserved);
  const [isPaid, setIsPaid] = useState(task.paid);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);

  useEffect(() => {
    setIsReserved(task.reserved);
    setIsPaid(task.paid);
  }, [task.reserved, task.paid]);

  const dateDifference = initTime - parsedTaskDate.getTime();

  function msToTime(duration) {
    let milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }

  const timeDict = {
    intHours: parseInt(msToTime(dateDifference).split(":")[0]),
    intMinutes: parseInt(msToTime(dateDifference).split(":")[1]),
    intSeconds: parseInt(msToTime(dateDifference).split(":")[2]),
  };

  const paperStyle = {
    mb: 1.5,
    pb: 1,
    mt: 1.5,
    bgcolor: isReserved ? "#e6e6e6" : "#fff",
    borderLeft: isPaid ? 0 : "4px solid #ff0000",
  };

  const donePaperStyle = {
    mb: 1.5, pb: 1, mt:1.5
  }

  const style = {
    // position: 'absolute',
    // right: '50%',
    // left: '50%',
    margin: "auto",
    width: window.innerWidth > 555 ? 400 : "95%",
    // transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  //handle edit task
  const handleEditTask = () => {
    setModalIsOpen(true);
  };
  //handle onclose
  const handleOnClose = () => {
    setModalIsOpen(false);
  };

  const renderer = ({ hours, minutes, seconds }) => {
    return (
      <span>
        {hours >= 10 ? hours : "0" + hours}:
        {minutes >= 10 ? minutes : "0" + minutes}:
        {seconds >= 10 ? seconds : "0" + seconds}
      </span>
    );
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const open2 = Boolean(anchorEl2);
  const id2 = open ? "simple-popper" : undefined;

  return (
    <Paper elevation={3} sx={task.status === "going" ? paperStyle : donePaperStyle }>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid xs={4} sx={{ padding: "9px" }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {task.text}
          </Typography>

          {task.type === "onTime" && task.status === "going" ? (
            <Countdown date={task.date} renderer={renderer} />
          ) : null}

          {task.type === "period" && task.status === "going" ? (
            <Countdown date={task.date} renderer={renderer} />
          ) : null}

          {task.type === "openTime" && task.status === "going" ? (
            <StopWatch date={parsedTaskDate} times={timeDict} />
          ) : null}

          {task.status === "done" ? <Typography>00:00:00</Typography> : null}
        </Grid>
        <Grid xs={4} className="statusContainer">
          {task.type === "onTime" && task.status === "going" ? (
            <StaticTimestamp timeStamp={task.date} taskType={task.type} />
          ) : null}

          {task.type === "period" && task.status === "going" ? (
            <StaticTimestamp timeStamp={task.date} taskType={task.type} />
          ) : null}

          {task.type === "openTime" && task.status === "going" ? (
            <StaticTimestamp timeStamp={task.date} taskType={task.type} />
          ) : null}
        </Grid>
        <Grid xs={4} className="editContainer">
          <span>
            {task.status === "going" ? <h3>{task.amount}</h3> : null}
          </span>
          {task.notes !== "" && task.status === "going" ? (
            <span>
              <NotesIcon onClick={handleClick} />
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Typography sx={{ p: 2 }}>{task.notes}</Typography>
              </Popover>
            </span>
          ) : null}

          <span>
            <MoreVertIcon onClick={handleClick2} />
            <Popover
              id={id2}
              open={open2}
              anchorEl={anchorEl2}
              onClose={handleClose2}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              {ps && (
                <div className="optionsBtn">
                <RestartAltIcon onClick={() => resetTask(task)} />
                <RestoreIcon onClick={() => restoreTask(task)} />
                </div>
              )}

              
            </Popover>
          </span>
          <span>
            <EditIcon onClick={handleEditTask} />
          </span>
        </Grid>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <UpdateForm
            style={style}
            task={task}
            onEdit={onEdit}
            afterAddClose={handleOnClose}
          />
        </Modal>
      </Grid>

     
      
    </Paper>
  );
};

export default Task;
