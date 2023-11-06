import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const AllJobs = () => {
        navigate('/JobBoard')
    }

    const handleLogin = () => {
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    return (
        <div>
        <h2>Login</h2>
        <form>
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={handleLogin}>
                Log In
            </button>
            <button type="button" onClick={handleSignUp}>
                Sign Up
            </button>
            <button type="button" onClick={AllJobs}>
                Temporary Button
            </button>
        </form>
        </div>
    );
}

export default Login;

