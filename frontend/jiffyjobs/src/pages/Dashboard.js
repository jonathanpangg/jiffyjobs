import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

    const navigate = useNavigate();

    useEffect(() => {
        const loggedin = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (!loggedin) {
            alert('Please login!');
            navigate('/login')
        }
    },[])
    return (
        <div>
            Dashboard Page
        </div>
    );
}

export default Dashboard;