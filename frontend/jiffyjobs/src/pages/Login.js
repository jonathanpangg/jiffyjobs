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
        school: '',
        name: '',
        email: '',
        password: '',
    })

    // useState for errors
    const [error, setError] = useState({
        schoolError: false,
        nameError: false,
        emailError: false,
        passwordError: false,
    })

    // handles the error of the input boxes
    function handleError() {
        setError({
            schoolError: val.school === '',
            nameError: val.name === '',
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
            <div className={ 'outerCard' }>
                <Card sx={{ maxWidth: 700, maxHeight: 600, mx: 'auto'}}>
                    <CardContent>
                    <h2 style={{ fontFamily: 'Outfit', textAlign: 'center', margin: '16px 0' }}>Welcome to JIFFYJOBS!</h2>
                        
                    <div style={{paddingTop: '2.5%'}}>
                        <text className='pop-textfield-title' style={{ fontFamily: 'Outfit'}}>
                            Email Address
                        </text> <br></br>
                        <TextField error={error.emailError} helperText={error.emailError ? "*This field is required" : ""} required={true} placeholder={"example@email.edu"}  type="email" square={false} style={{width: '98.5%', fontFamily: 'Outfit'}} onChange={(e) => {handleValues(e)}} id='email' value={val.email}/>
                    </div>
                    <div style={{paddingTop: '2.5%'}}>
                        <text className='pop-textfield-title' style={{ fontFamily: 'Outfit'}}>
                            Password
                        </text> <br></br>
                        <TextField error={error.passwordError} helperText={error.passwordError ? "*This field is required" : ""} required={true} placeholder="Your Password" type={showPassword ? "text" : "password"}  square={false} style={{width: '98.5%', fontFamily: 'Outfit'}} onChange={(e) => {handleValues(e)}} id='password' value={val.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={togglePasswordVisibility}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
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
                    <div style={{paddingTop: '2.5%'}}>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 2, py: 1.5, backgroundColor: '#333', '&:hover': { backgroundColor: '#555' } }} >
                            Log in
                        </Button>
                    </div>
                    <div style={{paddingTop: '1%'}}>
                        <Button type="submit" fullWidth variant="contained" startIcon={<GoogleIcon/>} sx={{ mt: 1, mb: 2, py: 1.5, backgroundColor: '#333', '&:hover': { backgroundColor: '#555' } }} >
                            Continue with Google
                        </Button>
                    </div>
                    <div style={{paddingTop: '1%'}}>
                        <Button type="submit" fullWidth variant="contained" startIcon={<GoogleIcon/>} onClick={handleSignUp} sx={{ mt: 1, mb: 2, py: 1.5, backgroundColor: '#333', '&:hover': { backgroundColor: '#555' } }} >
                            Don’t have an account? Join now!
                        </Button>
                    </div>

                    </CardContent>
                </Card>
            </div>
        </>
    )
}

