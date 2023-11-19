import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HistoryCard from '../components/HistoryCard'; // Import the Card component
import Nav from '../components/Navbar.ln/Nav';
import AboutComponent from '../components/AboutComponent';

const HistoryPage = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate(); // useNavigate instead of useHistory

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (!token) {
            alert("you are not signed in yet \nplease become a user before any further action:>");
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
        <div className="bg-blue h-screen">
            <AboutComponent></AboutComponent>
            <div className="pt-7">
                <Nav></Nav>
            </div>
            <div  >{historyItems}</div>
        </div>
    );
};

export default HistoryPage;
