import { useState } from "react";
import Task from "./Task";
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';



const Tasks = ({ tasks, wheels, onEdit, onWheelsEdit, resetTask, resetWheel, logout }) => {   
    
    const [value, setValue] = useState(0);
      
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


      
    return (
        <div>
            
            { value === 0 && tasks.map((task) => (
                <Task key={task.id} resetTask={resetTask} task={task} onEdit={onEdit}/>))}
            
            { value === 1 && wheels.map((wheel) => (
                <Task key={wheel.id} resetTask={resetWheel} task={wheel} onEdit={onWheelsEdit}/>))}

            <Tabs value={value} onChange={handleChange} >
                    <Tab icon={<SportsEsportsIcon />} />
                    <Tab icon={<DirectionsCarIcon />} />
            </Tabs>
            
            <Button sx={{mt: 1}} variant="outlined"color="error"onClick={logout}>
                    Sign Out
            </Button>
        </div>
    )
}

export default Tasks



