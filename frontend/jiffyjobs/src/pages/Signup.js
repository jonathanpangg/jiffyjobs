import React, { useState } from 'react';
import { Button, TextField, ToggleButton, ToggleButtonGroup, Card, CardContent } from '@mui/material';
import { InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { RegNavBar } from '../components/RegNavBar';

export function Signup() {
    const [role, setRole] = React.useState('jobSeeker');
    const [showPassword, setShowPassword] = useState(false);

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
                    <ToggleButtonGroup value={role} exclusive onChange={handleRole} fullWidth sx={{ mb: 2, justifyContent: 'center' }}>
                    <ToggleButton value="jobProvider" sx={{ width: '50%', borderRadius: '4px 0 0 4px', fontFamily: 'Outfit' }}>Job Provider</ToggleButton>
                    <ToggleButton value="jobSeeker" sx={{ width: '50%', borderRadius: '0 4px 4px 0', fontFamily: 'Outfit' }}>Job Seeker</ToggleButton>
                    </ToggleButtonGroup>

                    <form onSubmit={handleSubmit} noValidate autoComplete="off">

                    {/* <div>
                        <text className='pop-textfield-title'>
                            School
                        </text> <br></br>
                        <TextField error={error.schoolError} helperText={error.schoolError ? "*This field is required" : ""} required={true} placeholder="Search for your school" type="text" square={false} style={{width: '98.5%'}} onChange={(e) => {handleValues(e)}} id='school' value={val.school}/>
                    </div>  */}
                    <div style={{paddingTop: '2.5%'}}>
                        <text className='pop-textfield-title' style={{ fontFamily: 'Outfit'}}>
                            Name
                        </text> <br></br>
                        <TextField error={error.nameError} helperText={error.nameError ? "*This field is required" : ""} required={true} placeholder="Your Name" type="text" square={false} style={{width: '98.5%', fontFamily: 'Outfit'}} onChange={(e) => {handleValues(e)}} id='name' value={val.name}/>
                    </div>
                    <div style={{paddingTop: '2.5%'}}>
                        <text className='pop-textfield-title' style={{ fontFamily: 'Outfit'}}>
                            {role === 'jobProvider' ? 'Email Address' : 'School Email Address'}
                        </text> <br></br>
                        <TextField error={error.emailError} helperText={error.emailError ? "*This field is required" : ""} required={true} placeholder={role === 'jobProvider' ? "example@example.com" : "example@bu.edu"}  type="email" square={false} style={{width: '98.5%', fontFamily: 'Outfit'}} onChange={(e) => {handleValues(e)}} id='email' value={val.email}/>
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

                    <div style={{paddingTop: '2.5%'}}>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 2, py: 1.5, backgroundColor: '#333', '&:hover': { backgroundColor: '#555' } }} >
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


