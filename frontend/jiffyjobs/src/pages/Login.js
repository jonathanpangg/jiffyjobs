import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, ToggleButton, ToggleButtonGroup, Card, CardContent } from '@mui/material';
import { Checkbox, FormControlLabel, Link } from '@mui/material';
import { InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import { RegNavBar } from '../components/RegNavBar';

export function Login() {

    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const AllJobs = () => {
        navigate('/JobBoard')
    }

    const handleForgotPassword = () => {
        navigate('/ForgotPass');
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleError(); 
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

    // handles the error of the input boxes
    function handleError() {
        let isEmailError = !val.email || !validateEmail(val.email); 

        setError({
            emailError: isEmailError,
            passwordError: val.password === '',
        });
    }

    function handleValues(event) {
        setVal({ ...val, [event.target.id]: event.target.value });
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    return (
        <> 
        <RegNavBar/> 
            <div className={ 'outerCard' }>
            <Card sx={{ maxWidth: 700, maxHeight: 685, mx: 'auto', borderRadius: '20px'}}>
                <CardContent style={{ textAlign: 'center' }}>
                    <h2 style={{ fontFamily: 'Outfit', textAlign: 'center', margin: '16px 0' }}>Welcome to JIFFYJOBS!</h2>
                    
                    <form onSubmit={handleSubmit} noValidate autoComplete="off" style={{ alignItems: 'center' }}>

                    <div style={{paddingTop: '1.5%'}}>
                        <div style={{ textAlign: 'left', width: '68.5%', margin: '0 auto' }}>
                            <text className='pop-textfield-title' style={{ fontFamily: 'Outfit'}}>
                                Email
                            </text> <br></br>
                        </div>
                        <TextField error={error.emailError} helperText={error.emailError ? (val.email === '' ? "*This field is required" : "*Please enter a valid email address") : ""} required={true} placeholder={"Enter Email"}  type="email" square={false} style={{width: '68.5%', fontFamily: 'Outfit'}} onChange={handleValues} id="email" value={val.email}
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
                        <TextField error={error.passwordError} helperText={error.passwordError ? "*This field is required" : ""} required={true} placeholder="Enter Password" type={showPassword ? "text" : "password"}  square={false} style={{width: '68.5%', fontFamily: 'Outfit'}} onChange={handleValues} id="password" value={val.password}
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
                                
                    <div style={{ display: 'flex',  justifyContent: 'space-between',  alignItems: 'center', width: '68.5%', margin: '0 auto', }}>
                        <FormControlLabel control={<Checkbox name="remember" color="primary" />} label={ <span style={{ fontFamily: 'Outfit', color: '#5B5B5B', fontSize: '0.9rem'  }}>Remember me</span> } style={{ marginRight: 'auto',}} />
                        <Link onClick={handleForgotPassword} variant="body2" style={{ fontFamily: 'Outfit', color: '#5B5B5B', textDecorationColor: '#5B5B5B', fontSize: '0.85rem' }} > Forgot Password?</Link>
                    </div>
                    <div style={{ }}>
                        <Button type="submit" sx={{ width: '68.5%', mt: 1, mb: 2, py: 1.5, backgroundColor: '#A4A4A4', '&:hover': { backgroundColor: '#7D7D7D' }, borderRadius: '30px', textTransform: 'none', color: 'white', fontFamily: 'Outfit', border: '1px solid #5B5B5B' }} >
                            Log in
                        </Button>
                    </div>
                    <div class="orLine-container">
                        <div class="orLine "></div>
                        <span class="orText">or</span>
                        <div class="orLine "></div>
                    </div>
                    <div style={{ }}>
                        <Button startIcon={<GoogleIcon/>} sx={{ width: '68.5%', mt: 1, mb: 2, py: 1.5, backgroundColor: '#white', '&:hover': { backgroundColor: '#f5f5f5' }, borderRadius: '30px', textTransform: 'none', color: '#5B5B5B', fontFamily: 'Outfit', border: '1px solid #5B5B5B'}} >
                            Continue with Google
                        </Button>
                    </div>
                    <div style={{ }}>
                        <Button onClick={handleSignUp} sx={{ width: '68.5%', mt: 1, mb: 2, py: 1.5, backgroundColor: '#5B5B5B', '&:hover': { backgroundColor: '#7D7D7D' }, borderRadius: '30px', textTransform: 'none', color: 'white', fontFamily: 'Outfit'}} >
                            Don’t have an account? Join now!
                        </Button>
                    </div>
                    </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

