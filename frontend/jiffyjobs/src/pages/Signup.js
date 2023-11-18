import React, { useState, useEffect } from 'react';
import { Button, TextField, ToggleButton, ToggleButtonGroup, Card, CardContent } from '@mui/material';
import { InputAdornment, IconButton } from '@mui/material';
import { RegNavBar } from '../components/RegNavBar';
import { Navigate, useNavigate } from 'react-router-dom';

export function Signup() {
    const [role, setRole] = React.useState('jobSeeker');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        const loggedin = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (loggedin) {
            alert('Already logged in!');
            navigate('/JobBoard');
        }
    },[]);

    const handleRole = (event, newRole) => {
        if (newRole !== null) {
        setRole(newRole);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleError();
    };

    // useState for the data
    const [val, setVal] = useState({
        name: '',
        email: '',
        password: '',
    })

    // useState for errors
    const [error, setError] = useState({
        nameError: false,
        emailError: false,
        passwordError: false,
        confirmPasswordError: false, 
    });

    // handles the error of the input boxes
    function handleError() {
        let isEmailError = false;

        if (val.email === '') {
            isEmailError = true;
        } else if (role === 'jobSeeker') {
            isEmailError = !val.email.endsWith('.edu');
        } else {
            isEmailError = !validateEmail(val.email);
        }

        setError({
            nameError: val.name === '',
            emailError: isEmailError,
            passwordError: val.password === '',
            confirmPasswordError: confirmPassword === '' || confirmPassword !== val.password,
        });
    }

    function handleValues(event) {
        setVal({ ...val, [event.target.id]: event.target.value });
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }

    const signUp = async () => {
        const register = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: val.email,
                name: val.name,
                school: "Boston University",
                password: val.password
            })
        }
        
        console.log(role);
        let route = "https://jiffyjobs-api-production.up.railway.app/api/auth/providerSignUp";
        if (role === 'jobSeeker') {
            route = "https://jiffyjobs-api-production.up.railway.app/api/auth/seekerSignUp";
        }

        try {
            await fetch(route, register)
            .then(async (response) => {
            if (!response.ok) {
                throw new Error(`${response.status}`);
            }

            const data = await response.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("email", data.email);
            localStorage.setItem("user", JSON.stringify(data));
            navigate("/JobBoard")
            })
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <>
        <RegNavBar/>
            <div className={ 'outerCard' }>
                <Card sx={{ maxWidth: 700, maxHeight: 685, mx: 'auto', borderRadius: '20px'}}>
                <CardContent style={{ textAlign: 'center' }}>
                    <h2 style={{ fontFamily: 'Outfit', textAlign: 'center', margin: '16px 0' }}>Welcome to JIFFYJOBS!</h2>
                    <text style={{ fontFamily: 'Outfit', textAlign: 'center', margin: '16px 0' }}>Sign up as a...</text>
                    <ToggleButtonGroup value={role} exclusive onChange={handleRole} fullWidth sx={{ mb: 2, justifyContent: 'center', paddingTop: '1.5%' }}>
                    <ToggleButton value="jobProvider" sx={{ width: '30%', borderRadius: '10px', fontFamily: 'Outfit',  }}>Job Provider</ToggleButton>
                    <ToggleButton value="jobSeeker" sx={{ width: '30%', borderRadius: '10px', fontFamily: 'Outfit',  }}>Job Seeker</ToggleButton>
                    </ToggleButtonGroup>

                    <form onSubmit={handleSubmit} noValidate autoComplete="off" style={{ alignItems: 'center' }}> 

                    <div>
                        <div style={{ textAlign: 'left', width: '68.5%', margin: '0 auto' }}>
                            <text className='pop-textfield-title' style={{ fontFamily: 'Outfit', }}>
                                Name
                            </text> <br></br>
                        </div>
                        <TextField error={error.nameError} helperText={error.nameError ? "*This field is required" : ""} required={true} placeholder="Your Name" type="text" square={false} style={{width: '68.5%', fontFamily: 'Outfit', }} onChange={(e) => {handleValues(e)}} id='name' value={val.name}
                            InputProps={{
                                style: {  borderRadius: '10px' }
                            }}
                        />
                    </div>
                    <div style={{paddingTop: '1.5%'}}>
                        <div style={{ textAlign: 'left', width: '68.5%', margin: '0 auto' }}>
                            <text className='pop-textfield-title' style={{ fontFamily: 'Outfit'}}>
                                {role === 'jobProvider' ? 'Email' : 'School Email '}
                            </text> <br></br>
                        </div>
                        <TextField error={error.emailError} helperText={error.emailError ? (val.email === '' ? "*This field is required" : (role === 'jobSeeker' ? "*Please enter a valid .edu email address" : "*Please enter a valid email address")) : ""} required={true} placeholder={role === 'jobProvider' ? "example@email.com" : "example@bu.edu"}  type="email" square={false} style={{width: '68.5%', fontFamily: 'Outfit'}} onChange={(e) => {handleValues(e)}} id='email' value={val.email}
                            InputProps={{
                                style: {  borderRadius: '10px' }
                            }}
                        />
                    </div>
                    <div style={{paddingTop: '1.5%'}}>
                        <div style={{ textAlign: 'left', width: '68.5%', margin: '0 auto' }}>
                            <text className='pop-textfield-title' style={{ fontFamily: 'Outfit'}}>
                                Password
                            </text> <br></br>
                        </div>
                        <TextField error={error.passwordError} helperText={error.passwordError ? "*This field is required" : ""} required={true} placeholder="Enter Password" type={showPassword ? "text" : "password"}  square={false} style={{width: '68.5%', fontFamily: 'Outfit'}} onChange={(e) => {handleValues(e)}} id='password' value={val.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={togglePasswordVisibility}
                                            edge="end"
                                            style={{ fontFamily: 'Outfit', textTransform: 'none', fontSize: '0.8rem'}} 
                                        >
                                            {showPassword ? 'Hide' : 'Show'}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                style: {  borderRadius: '10px' }
                            }}
                        />
                    </div>
                    <div style={{paddingTop: '1.5%'}}>
                        <div style={{ textAlign: 'left', width: '68.5%', margin: '0 auto' }}>
                            <text className='pop-textfield-title' style={{ fontFamily: 'Outfit'}}>
                                Confirm Password
                            </text> <br></br>
                        </div>
                        <TextField error={error.confirmPasswordError} helperText={error.confirmPasswordError ? (confirmPassword === '' ? "*This field is required" : "*Passwords do not match") : ""} required={true} placeholder="Confirm Password" type={showConfirmPassword ? "text" : "password"}  square={false} style={{width: '68.5%', fontFamily: 'Outfit'}} onChange={(e) => setConfirmPassword(e.target.value)} id='confirmPassword' value={confirmPassword}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={toggleConfirmPasswordVisibility}
                                            edge="end"
                                            style={{ fontFamily: 'Outfit', textTransform: 'none', fontSize: '0.8rem'}} 
                                        >
                                            {showConfirmPassword ? 'Hide' : 'Show'}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                style: {  borderRadius: '10px' }
                            }}
                        />
                    </div>

                    <div style={{paddingTop: '1.5%'}}>
                        <Button type="submit" fullWidth onClick={signUp} sx={{ width: '68.5%', mt: 1, mb: 2, py: 1.5, backgroundColor: '#5B5B5B', '&:hover': { backgroundColor: '#7D7D7D' }, borderRadius: '30px', textTransform: 'none', color: 'white', fontFamily: 'Outfit'  }}>
                            Sign up as a {role === 'jobSeeker' ? 'Job Seeker' : 'Job Provider'}
                        </Button>
                    </div>
                    </form>
                </CardContent>
                </Card>
            </div>
        </>
    )
}


