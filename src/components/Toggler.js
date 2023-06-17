import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Toggler({ timeType, onTypeChange }) {
    // const [value, setValue] = React.useState(timeType);

    const handleChange = (event) => {
    // setValue(event.target.value);
    onTypeChange(event.target.value);
    };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Adding Method:</FormLabel>
      <RadioGroup row aria-label="type"
       name="row-radio-buttons-group"
       value={timeType}
       onChange={handleChange}>
        <FormControlLabel value="period" control={<Radio />} label="Period" />
        <FormControlLabel value="openTime" control={<Radio />} label="Open Time" />
        <FormControlLabel value="onTime" control={<Radio />} label="On Time" />
      </RadioGroup>
    </FormControl>
  );
}