import { useState } from "react"
import Button from '@mui/material/Button';
import  Toggler  from "./Toggler";
import Typography from '@mui/material/Typography';
import { OnTimePicker } from "./OnTimePicker";
import { OnPeriodPicker } from "./OnPeriodPicker";
import { OpenTimePicker } from "./OpenTimePicker";
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';


const UpdateForm = ({ task, onEdit, afterAddClose, style }) => {

    const [text, setText] = useState(task.text)
    const [date, setDate] = useState(task.date)
    const initTime = Date.now()
    const parsed = new Date(initTime)
    const [time, setTime] = useState(parsed)
    const [timeType, setTimeType] = useState(task.type)
    const [periodic, setPeriodic] = useState(time)
    const [targetTime, setTargetTime] = useState(time)
    const [otState, setOTState] = useState(time)
    const [onTimeState, setOnTimeState] = useState(time)
    const [reChecked, setReChecked] = useState(task.reserved);
    const [paidChecked, setPaidChecked] = useState(task.paid);
    const [notes, setNotes] = useState(task.notes);
    const [amount, setAmount] = useState(task.amount);
    


    const handleAmount = (event) => {
        setAmount(event.target.value);
      };

    const handleNotes = (event) => {
        setNotes(event.target.value)
      };

    const handleReChange = (event) => {
        setReChecked(event.target.checked);
      };

    const handlePaidChange = (event) => {
        setPaidChecked(event.target.checked);
      };

    const timeTypeChange = (event) => {
        setTimeType(event);
    }

    const setTimeAndDate = (event) => {
        setOnTimeState(event);
        setDate(event);
    }

    const setPeriod = (event) => {
        setPeriodic(event)
    }

    const setOpenTime = (event) => {
        setOTState(event);
        setDate(event);
    }

    const onSubmit = (e) => {
        e.preventDefault()
        switch (timeType) {
            case 'onTime':
                const updatedTask = {
                    text,
                    amount,
                    date,
                    reserved: reChecked,
                    paid: paidChecked,
                    notes,
                    status: "going",
                    type: timeType,
                    id: task.id
                }
            
        
        
                if(!text) {
                    alert('please add task')
                    return
                }
                onEdit(updatedTask)
                
                setText('')
                setDate('')
                afterAddClose()
                break;
            case 'period':
                const pattern = /\d{2}:\d{2}:\d{2}/g

                // define a new instance of regex - currentTime
                const ctRegex = new RegExp(pattern)
                const ctArray = ctRegex.exec(time)

                const ctHours = ctArray[0].split(':')[0]
                const ctMinuts = ctArray[0].split(':')[1]

                // parsing into int - currentTime
                const ctIntHours = parseInt(ctHours)
                const ctIntMinuts = parseInt(ctMinuts)


                // define a new instance of regex - chosenPeriod
                const cpRegex = new RegExp(pattern)
                const cpArray = cpRegex.exec(periodic)

                const cpHours = cpArray[0].split(':')[0]
                const cpMinuts = cpArray[0].split(':')[1]

                // parsing into int - chosenPeriod
                const cpIntHours = parseInt(cpHours)
                const cpIntMinuts = parseInt(cpMinuts)

                //time calculation
                // const the time object to be replaced
                const newHours = ctIntHours+cpIntHours
                const newMinuts = ctIntMinuts+cpIntMinuts

                //set time props
                time.setHours(newHours)
                time.setMinutes(newMinuts)

                setTargetTime(time) 
                setDate(time)

                const updatedTaskBP = {
                    text,
                    amount,
                    type: timeType,
                    date: time,
                    reserved: reChecked,
                    paid: paidChecked,
                    notes,
                    status: "going",
                    id: task.id
                }
                if(!text) {
                    alert('please add task')
                    return
                }
                onEdit(updatedTaskBP)
        
        
                setText('')
                setDate('')
                afterAddClose()
                break;
            case 'openTime':
                const updatedTaskOT = {
                    text,
                    amount,
                    date,
                    reserved: reChecked,
                    paid: paidChecked,
                    notes,
                    type: timeType,
                    status: "going",
                    id: task.id
                }
            
        
        
                if(!text) {
                    alert('please add task')
                    return
                }
                onEdit(updatedTaskOT)
        
        
                setText('')
                setDate('')
                afterAddClose()
                break;

            default:
                break;

    }}

    return (
        <Box sx={style}>
            <form onSubmit={onSubmit}>
                <div>
                    <Typography>
                        {task.text}
                    </Typography>
                </div>
                <Toggler timeType={timeType} onTypeChange={timeTypeChange}/>
                <div>
                Reserved: <Checkbox
                checked={reChecked}
                onChange={handleReChange}
                inputProps={{ 'aria-label': 'controlled' }}/>
                </div>
                
                <div>
                Paid: <Checkbox
                checked={paidChecked}
                onChange={handlePaidChange}
                inputProps={{ 'aria-label': 'controlled' }}/>
                </div>


                {timeType === 'onTime' && <OnTimePicker 
                currentTime={time}
                onTimeState={onTimeState}
                setCurrentTime={setTimeAndDate}/>}

                {timeType === 'period' &&
                <OnPeriodPicker currentTime={time}
                setTimeWithPeriod={setPeriod}
                periodState={periodic}
                />}

                {timeType === 'openTime' && <OpenTimePicker 
                currentTime={time}
                handleOT={setOpenTime}
                otState={otState}/>}

                <div>
                <TextField sx={{mt: 1, mb: 1}} label="Amount" onChange={handleAmount} value={amount}  type="number" InputLabelProps={{
                  shrink: true,
                }}/>

                </div>

                <div>
                    <TextField sx={{mt: 1, mb: 1}} label="Notes" variant="outlined" value={notes} onChange={handleNotes} />
                </div>
                
                <Button sx={{mr: 1}} type="submit" variant="contained" color="primary">
                    Update
                </Button>
                <Button variant="outlined" onClick={afterAddClose}>Close</Button>

            </form>
        </Box>
    )
}

export default UpdateForm
