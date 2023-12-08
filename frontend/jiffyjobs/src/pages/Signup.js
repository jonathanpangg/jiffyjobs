import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from 'react-router-dom';
import '../styles/JobPosting.css';

import { Button, TextField, ToggleButton, ToggleButtonGroup, Card, 
       CardContent, InputAdornment, IconButton } from '@mui/material';

import { NavBar } from '../components/NavBar';


export function Signup() {
    const [role, setRole] = React.useState('jobSeeker');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [ token, setToken ] = useState(localStorage.getItem("token"));
    const [showToken, setShowToken] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) setShowToken(true);
    },[token]);

    useEffect(()=> {
        if (showToken) {
            console.log(showToken);
            toast.info('Already Logged In!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate('/JobBoard');
            setShowToken(false);
        }

    }, [showToken])

    // handles the role of the user
    const handleRole = (event, newRole) => {
        if (newRole !== null) {
        setRole(newRole);
        }
    };

    // handles the submit button
    const handleSubmit = (event) => {
        event.preventDefault();
        let isEmailError = false;

        if (val.email === '') {
            isEmailError = true;
        } else if (role === 'jobSeeker') {
            isEmailError = !val.email.endsWith('.edu');
        } else {
            isEmailError = !validateEmail(val.email);
        }

        setError({
            firstNameError: val.firstName === '',
            lastNameError: val.lastName === '',
            emailError: isEmailError,
            passwordError: val.password === '',
            confirmPasswordError: confirmPassword === '' || confirmPassword !== val.password,
        });

        console.log(error);

        if (!isEmailError && val.firstName !== '' && val.lastName !== '' &&
        val.password !== '' && confirmPassword !== '' && confirmPassword === val.password) {
            console.log("here");
            signUp();
        }
    };

    // useState for the data
    const [val, setVal] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })

    // useState for errors
    const [error, setError] = useState({
        firstNameError: false,
        lastNameError: false,
        emailError: false,
        passwordError: false,
        confirmPasswordError: false, 
    });


    function handleValues(event) {
        setVal({ ...val, [event.target.id]: event.target.value });
    }

    // handles the password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // handles the confirm password visibility
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // validates the email
    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }

    // handles the sign up
    const signUp = async () => {
        const register = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: val.email,
                first_name: val.firstName,
                last_name: val.lastName,
                school: "Boston University",
                password: val.password
            })
        }
        
        console.log(role);
        let route = "https://jiffyjobs-api-production.up.railway.app/api/auth/providerSignUp";
        if (role === 'jobSeeker' || val.email.endsWith(".edu")) {
            route = "https://jiffyjobs-api-production.up.railway.app/api/auth/seekerSignUp";
        }
        fetch(route, register)
        .then(async (response) => {
            const res = await response.json()
            if (!response.ok) {
                throw new Error(res.message);
            } 
            return res;
        })
        .then((data) => {

            localStorage.setItem("token", data.token);
            localStorage.setItem("email", data.email);
            localStorage.setItem("user", data.role);
            localStorage.setItem("first", data.first_name);
            localStorage.setItem("last", data.last_name);
            console.log(data);
            navigate("/JobBoard");
        })
        .catch((error) => {
            const err = error.message;
            if (err.startsWith('Error: ')) {
                alert(err.slice(7));
                toast.error(err.slice(7), {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
            } else {
                toast.error(err, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
            }
        });
    }

    // checks if there are any errors
    const hasErrors = () => {
        return Object.values(error).some(e => e);
    };
    
    return (
        <>
        <NavBar/>
            <div className={hasErrors() ? 'outerCardSignup2' : 'outerCardSignup1'} style={{paddingTop: '20px'}}>
                <div style={{transform: 'scale(0.90)', marginTop: '-5px'}} >
                <Card sx={{ maxWidth: 650, maxHeight: 7000, mx: 'auto', borderRadius: '20px',}}>
                <CardContent style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Outfit', fontWeight: 'bold', fontSize: '28px', textAlign: 'center', marginTop: '30px', marginBottom: '15px'}}>
                        Welcome to <span className='job-search-logo' style={{color: '#4A4FE4', fontSize: '28px'}}>JIFFYJOBS</span>!
                    </div>
                    <text style={{ fontFamily: 'Outfit', textAlign: 'center', color: '#5B5B5B', fontSize: '16px' }}>Sign up as a...</text>

                    <ToggleButtonGroup value={role} exclusive onChange={handleRole} fullWidth sx={{ mb: 2, justifyContent: 'center',  marginTop: '10px', marginBottom: '25px', }}>
                        <ToggleButton value="jobSeeker" sx={{ width: '30%', borderRadius: '10px', fontFamily: 'Outfit', textTransform: 'none', fontSize: '14px'}}>Job Seeker</ToggleButton>
                        <ToggleButton value="jobProvider" sx={{ width: '30%', borderRadius: '10px', fontFamily: 'Outfit', textTransform: 'none', fontSize: '14px' }}>Job Provider</ToggleButton>
                    </ToggleButtonGroup>

                    <form onSubmit={handleSubmit} noValidate autoComplete="off" style={{ alignItems: 'center' }}> 

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5%' }}>
                        <div style={{ width: '33.5%', }}>
                            <div style={{ textAlign: 'left', width: '100%',  }}>
                                <text className='pop-textfield-title' style={{ fontFamily: 'Outfit', fontSize: '14px' }}>
                                    First Name
                                    <span style={{"color": "red"}}>*</span>
                                </text> <br></br>
                            </div>
                            <TextField error={error.firstNameError} helperText={error.firstNameError ? "*This field is required" : ""} required={true} placeholder="First Name" type="text" square={false} style={{width: '100%', fontFamily: 'Outfit', }} FormHelperTextProps={{ style: { fontFamily: 'Outfit', fontSize: '14px' }}} onChange={(e) => {handleValues(e)}} id='firstName' value={val.firstName}
                                InputProps={{
                                    style: {  borderRadius: '10px', fontFamily: 'Outfit', fontSize: '14px'}
                                }}
                            />
                        </div>
                        <div style={{ width: '33.5%', }}>
                            <div style={{ textAlign: 'left', width: '100%', }}>
                                <text className='pop-textfield-title' style={{ fontFamily: 'Outfit', fontSize: '14px'}}>
                                    Last Name
                                    <span style={{"color": "red"}}>*</span>
                                </text> <br></br>
                            </div>
                            <TextField error={error.lastNameError} helperText={error.lastNameError ? "*This field is required" : ""} required={true} placeholder="Last Name" type="text" square={false} style={{width: '100%', fontFamily: 'Outfit', }} FormHelperTextProps={{ style: { fontFamily: 'Outfit', fontSize: '14px' }}} onChange={(e) => {handleValues(e)}} id='lastName' value={val.lastName}
                                InputProps={{
                                    style: {  borderRadius: '10px', fontFamily: 'Outfit', fontSize: '14px' }
                                }}
                            />
                        </div>
                    </div>
                    <div style={{paddingTop: '1.5%'}}>
                        <div style={{ textAlign: 'left', width: '68.5%', margin: '0 auto' }}>
                            <text className='pop-textfield-title' style={{ fontFamily: 'Outfit', fontSize: '14px'}}>
                                {role === 'jobProvider' ? 'Email' : 'School Email '}
                                <span style={{"color": "red"}}>*</span>
                            </text> <br></br>
                        </div>
                        <TextField error={error.emailError} helperText={error.emailError ? (val.email === '' ? "*This field is required" : (role === 'jobSeeker' ? "*Please enter a valid .edu email address" : "*Please enter a valid email address")) : ""} required={true} placeholder={role === 'jobProvider' ? "example@email.com" : "example@bu.edu"}  type="email" square={false} style={{width: '68.5%', fontFamily: 'Outfit'}} FormHelperTextProps={{ style: { fontFamily: 'Outfit', fontSize: '14px' }}} onChange={(e) => {handleValues(e)}} id='email' value={val.email}
                            InputProps={{
                                style: {  borderRadius: '10px', fontFamily: 'Outfit', fontSize: '14px' }
                            }}
                        />
                    </div>
                    <div style={{paddingTop: '1.5%'}}>
                        <div style={{ textAlign: 'left', width: '68.5%', margin: '0 auto' }}>
                            <text className='pop-textfield-title' style={{ fontFamily: 'Outfit', fontSize: '14px'}}>
                                Password
                                <span style={{"color": "red"}}>*</span>
                            </text> <br></br>
                        </div>
                        <TextField error={error.passwordError} helperText={error.passwordError ? "*This field is required" : ""} required={true} placeholder="Enter Password" type={showPassword ? "text" : "password"}  square={false} style={{width: '68.5%', fontFamily: 'Outfit'}} FormHelperTextProps={{ style: { fontFamily: 'Outfit', fontSize: '14px' }}} onChange={(e) => {handleValues(e)}} id='password' value={val.password}
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
                                style: {  borderRadius: '10px', fontFamily: 'Outfit', fontSize: '14px' }
                            }}
                        />
                    </div>
                    <div style={{paddingTop: '1.5%'}}>
                        <div style={{ textAlign: 'left', width: '68.5%', margin: '0 auto' }}>
                            <text className='pop-textfield-title' style={{ fontFamily: 'Outfit', fontSize: '14px'}}>
                                Confirm Password
                                <span style={{"color": "red"}}>*</span>
                            </text> <br></br>
                        </div>
                        <TextField error={error.confirmPasswordError} helperText={error.confirmPasswordError ? (confirmPassword === '' ? "*This field is required" : "*Passwords do not match") : ""} required={true} placeholder="Confirm Password" type={showConfirmPassword ? "text" : "password"}  square={false} style={{width: '68.5%', fontFamily: 'Outfit'}} FormHelperTextProps={{ style: { fontFamily: 'Outfit', fontSize: '14px' }}} onChange={(e) => setConfirmPassword(e.target.value)} id='confirmPassword' value={confirmPassword}
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
                                style: {  borderRadius: '10px', fontFamily: 'Outfit', fontSize: '14px' }
                            }}
                        />
                    </div>

                    <div style={{paddingTop: '1.5%'}}>

                        <Button type="submit" fullWidth sx={{ width: '68.5%', mt: 1, mb: 2, py: 1.5, backgroundColor: '#4A4FE4', '&:hover': { backgroundColor: '#4A4FE4' }, borderRadius: '30px', textTransform: 'none', color: 'white', fontFamily: 'Outfit'  }}>
                            Sign up as a {role === 'jobSeeker' ? 'Job Seeker' : 'Job Provider'}
                        </Button>
                    </div>
                    </form>
                </CardContent>
                </Card>
                </div>
            </div>
        </>
    )
}


