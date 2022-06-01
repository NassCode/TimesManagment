import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';




export const OnTimePicker = ({ currentTime, setCurrentTime, onTimeState }) => {


    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
                label="Pick time:"
                value={onTimeState}
                minTime={currentTime}
                // ampm={false}
                onChange={setCurrentTime}
                renderInput={(params) => <TextField {...params} />}
            />
            </LocalizationProvider>
        </div>
        
    )
}
