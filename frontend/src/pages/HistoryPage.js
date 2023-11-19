import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HistoryCard from '../components/HistoryCard'; // Import the Card component

const HistoryPage = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate(); // useNavigate instead of useHistory

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (!token) {
            navigate('/sign-up'); // use navigate for redirection
            return;
        }
        if (user) {
            setUserData(JSON.parse(user));
            return;
        }
        fetch(`${process.env.REACT_APP_API_URL}/api/users/user`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setUserData(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, [navigate]);

    if (!userData) {
        return <div>Loading...</div>;
    }
    
    const historyItems = JSON.parse(userData.history).map((item, index) => (
        <HistoryCard key={index} duration={item.duration} detectionCount={item.detection_count} />
    ));

    return (
        <div>
            <h1>Here is the history for your previous sessions</h1>
            <div>{historyItems}</div>
        </div>
    );
};

export default HistoryPage;
