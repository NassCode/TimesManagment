import { format } from 'date-fns'

// create react arrow function
const StaticTimestamp = ({ timeStamp, taskType }) => {
    const newDate = new Date(timeStamp)

    return (
        <div>
        <p>
        {taskType === 'openTime'
            ? <span> Started at: <br /> {format((newDate), 'h:mm aa')}</span>
            : <span> Ends at: <br /> {format((newDate), 'h:mm aa')}</span>}
        </p>
        </div>
    );
    }


export default StaticTimestamp;