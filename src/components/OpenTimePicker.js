import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';




export const OpenTimePicker = ({ currentTime, handleOT, otState }) => {

  

  return (
     <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
            label="Pick time:"
            value={otState}
            // ampm={false}
            onChange={handleOT}
            renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
    </div>
  );
}
