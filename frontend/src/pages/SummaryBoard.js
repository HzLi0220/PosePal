import {useNavigate, useLocation} from "react-router-dom";
import React, { useState } from 'react';

const SummaryBoard = () => {
    let navigate = useNavigate();
    let location = useLocation();
    let remainingTime = location.state?.remaining_time;
    const [completionTime, setCompletionTime] = useState(new Date().toLocaleTimeString());

    const handleClose = () => {
       navigate('/');
    };

    return (
        <div>
            <h2>Task Completed!</h2>
            <p>Time of Completion: {remainingTime}</p>
            <button onClick={handleClose}>Close</button>
        </div>
    );
};

export default SummaryBoard;
