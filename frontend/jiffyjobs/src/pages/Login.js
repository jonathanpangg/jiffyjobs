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
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const AllJobs = () => {
        navigate('/JobBoard')
    }

    const handleLogin = () => {
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
        setError({
            emailError: val.email === '',
            passwordError: val.password === '',
        })
    }


    function handleValues(event) {
        setVal({ ...val, [event.target.id]: event.target.value });
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <> 
        <RegNavBar/> 
            <div className={ 'outerCard1' }>
            <Card sx={{ maxWidth: 700, maxHeight: 685, mx: 'auto', borderRadius: '20px'}}>
                <CardContent style={{ textAlign: 'center' }}>
                    <h2 style={{ fontFamily: 'Outfit', textAlign: 'center', margin: '16px 0' }}>Welcome to JIFFYJOBS!</h2>
                        
                    <div style={{paddingTop: '1.5%'}}>
                        <div style={{ textAlign: 'left', width: '68.5%', margin: '0 auto' }}>
                            <text className='pop-textfield-title' style={{ fontFamily: 'Outfit'}}>
                                Email
                            </text> <br></br>
                        </div>
                        <TextField error={error.emailError} helperText={error.emailError ? "*This field is required" : ""} required={true} placeholder={"Enter Email"}  type="email" square={false} style={{width: '68.5%', fontFamily: 'Outfit'}} onChange={(e) => {handleValues(e)}} id='email' value={val.email}
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
                    
                        <FormControlLabel
                            control={<Checkbox name="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Link component="button" variant="body2">
                            Forgot Password?
                        </Link>
                    <div style={{ }}>
                        <Button type="submit" sx={{ width: '68.5%', mt: 1, mb: 2, py: 1.5, backgroundColor: '#333', '&:hover': { backgroundColor: '#555' }, borderRadius: '30px', textTransform: 'none', color: 'white' }} >
                            Log in
                        </Button>
                    </div>
                    <div class="orLine-container">
                        <div class="orLine "></div>
                        <span class="orText">or</span>
                        <div class="orLine "></div>
                    </div>
                    <div style={{ }}>
                        <Button type="submit"  startIcon={<GoogleIcon/>} sx={{ width: '68.5%', mt: 1, mb: 2, py: 1.5, backgroundColor: '#333', '&:hover': { backgroundColor: '#555' }, borderRadius: '30px', textTransform: 'none', color: 'white'}} >
                            Continue with Google
                        </Button>
                    </div>
                    <div style={{ }}>
                        <Button type="submit" onClick={handleSignUp} sx={{ width: '68.5%', mt: 1, mb: 2, py: 1.5, backgroundColor: '#333', '&:hover': { backgroundColor: '#555', }, borderRadius: '30px', textTransform: 'none', color: 'white'}} >
                            Don’t have an account? Join now!
                        </Button>
                    </div>

                    </CardContent>
                </Card>
            </div>
        </>
    )
}

