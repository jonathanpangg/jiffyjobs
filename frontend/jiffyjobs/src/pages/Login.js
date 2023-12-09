import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import '../styles/JobPosting.css';

import { Button, TextField, ToggleButton, ToggleButtonGroup, Card, 
        CardContent, Checkbox, FormControlLabel, Link, InputAdornment, 
        IconButton } from '@mui/material';

import { NavBar } from '../components/NavBar';
import logo from '../images/Logo.png';
import reject from '../images/Reject.png';


export function Login() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [ token, setToken ] = useState(localStorage.getItem("token"));
    const [showToken, setShowToken] = useState(false);

    useEffect(() => {
        if (token) setShowToken(true);
    },[token]);

    useEffect(()=> {
        if (showToken) {
            console.log(showToken);
            toast.dismiss()
            toast.info('Already logged in!', {
                icon: ({theme, type}) =>  <img src={logo} style={{ width: '24px', height: '24px', marginRight: '10px', marginBottom:'6px'}}/>,
                progressStyle: {backgroundColor: '#4A4FE4'},
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

    // go to sign up page
    const handleSignUp = () => {
        navigate('/signup');
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        let isEmailError = !val.email || !validateEmail(val.email); 

        setError({
            emailError: isEmailError,
            passwordError: val.password === '',
        });

        if (!isEmailError && val.password !== '') {
            login();
        }
    };

    // useState for the data
    const [val, setVal] = useState({
        email: '',
        password: '',
    })

    // useState for errors
    const [error, setError] = useState({
        emailError: false,
        passwordError: false,
    })

    function handleValues(event) {
        setVal({ ...val, [event.target.id]: event.target.value });
    }

    // handles the password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // validates the email
    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // handles the login
    const login = async () => {
        const Login = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: val.email,
                password: val.password
            })
        }

        const route = "https://jiffyjobs-api-production.up.railway.app/api/auth/Login";
        fetch(route, Login)
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
        console.log(data)
        navigate("/JobBoard");
        })
        .catch((error) => {
            const err = error.message;
            if (err.startsWith('Error: ')) {
                alert(err.slice(7));
                toast.error(err.slice(7), {
                    icon: ({theme, type}) =>  <img src={reject} style={{ width: '24px', height: '24px', marginRight: '10px', marginBottom:'6px'}}/>,
                    progressStyle: {backgroundColor: '#C12020'},
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
                    icon: ({theme, type}) =>  <img src={reject} style={{ width: '24px', height: '24px', marginRight: '10px', marginBottom:'6px'}}/>,
                    progressStyle: {backgroundColor: '#C12020'},
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


    return (
        <> 
        <NavBar/> 
            <div className={ 'outerCardLogin' } style={{paddingTop: '30px'}} >
            <div style={{transform: 'scale(0.90)', marginTop: '30px', }}>
            <Card sx={{ maxWidth: 650, maxHeight: 7000, mx: 'auto', borderRadius: '20px'}}>
                <CardContent style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Outfit', fontWeight: 'bold', fontSize: '28px', textAlign: 'center', marginTop: '30px', marginBottom: '15px'}}>
                        Welcome to <span className='job-search-logo' style={{color: '#4A4FE4', fontSize: '28px'}}>JIFFYJOBS</span>!
                    </div>
                    
                    <form onSubmit={handleSubmit} noValidate autoComplete="off" style={{ alignItems: 'center' }}>

                    <div style={{paddingTop: '1.5%'}}>
                        <div style={{ textAlign: 'left', width: '68.5%', margin: '0 auto' }}>
                            <text className='pop-textfield-title' style={{ fontFamily: 'Outfit', fontSize: '14px'}}>
                                Email
                            </text> <br></br>
                        </div>
                        <TextField error={error.emailError} helperText={error.emailError ? (val.email === '' ? "*This field is required" : "*Please enter a valid email address") : ""} required={true} placeholder={"Enter Email"}  type="email" square={false} style={{width: '68.5%', fontFamily: 'Outfit',}} FormHelperTextProps={{ style: { fontFamily: 'Outfit', fontSize: '14px' }}} onChange={handleValues} id="email" value={val.email}
                            InputProps={{
                                style: {  borderRadius: '10px', fontFamily: 'Outfit', fontSize: '14px' }
                            }}
                        />
                    </div>
                    <div style={{paddingTop: '1.5%', paddingBottom: '1.5%'}}>
                        <div style={{ textAlign: 'left', width: '68.5%', margin: '0 auto' }}>
                            <text className='pop-textfield-title' style={{ fontFamily: 'Outfit', fontSize: '14px'}}>
                                Password
                            </text> <br></br>
                        </div>
                        <TextField error={error.passwordError} helperText={error.passwordError ? "*This field is required" : ""} required={true} placeholder="Enter Password" type={showPassword ? "text" : "password"}  square={false} style={{width: '68.5%', fontFamily: 'Outfit',}} FormHelperTextProps={{ style: { fontFamily: 'Outfit', fontSize: '14px' }}} onChange={handleValues} id="password" value={val.password}
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
                                
                    <div style={{ }}>
                        <Button type="submit" sx={{ width: '68.5%', mt: 1, mb: 2, py: 1.5, backgroundColor: '#4A4FE4', '&:hover': { backgroundColor: '#4A4FE4' }, borderRadius: '30px', textTransform: 'none', color: 'white', fontFamily: 'Outfit', border: '1px solid #5B5B5B' }} >
                            Log in
                        </Button>
                    </div>
                    <div class="orLine-container">
                        <div class="orLine "></div>
                        <span class="orText">or</span>
                        <div class="orLine "></div>
                    </div>
                    <div style={{ }}>
                        <Button onClick={handleSignUp} sx={{ width: '68.5%', mt: 1, mb: 2, p: '1.5%', marginTop: '10px', marginBottom: '30px', color: 'black', borderColor: '#4A4FE4', '&:hover': { backgroundColor: 'white', borderColor: '#4A4FE4', }, borderRadius: '30px', textTransform: 'none', fontFamily: 'Outfit', fontSize: '16px'}} variant="outlined">
                            Don’t have an account? Join now!
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

