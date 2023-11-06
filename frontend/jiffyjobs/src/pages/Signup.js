import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate()

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div>
            <h2>Signup</h2>
            <form>
                <button type="button" onClick={handleLogin}>
                    Log In
                </button>
            </form>
        </div>
    );
}

export default Signup;