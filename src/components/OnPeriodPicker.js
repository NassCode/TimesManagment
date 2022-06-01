import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';



export const OnPeriodPicker = ({ setTimeWithPeriod, periodState }) => {


    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
                label="Pick time:"
                value={periodState}
                ampm={false}
                onChange={setTimeWithPeriod}
                renderInput={(params) => <TextField {...params} />}
            />
            </LocalizationProvider>
        </div>
        
    )
}
