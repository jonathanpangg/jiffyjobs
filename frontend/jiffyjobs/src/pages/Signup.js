import React, { useState } from 'react';
import { Button, TextField, ToggleButton, ToggleButtonGroup, Card, CardContent } from '@mui/material';

const SignUpForm = () => {
    const [role, setRole] = React.useState('jobSeeker');
    const [background, setBackground] = useState("")

    const handleRole = (event, newRole) => {
        if (newRole !== null) {
        setRole(newRole);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
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
    // changes the vals for all except date and time
    function handleValues(event) {
    }

  return (
    <div className={'job-board-outer' + background}>
        <Card sx={{ maxWidth: 500, mx: 'auto', mt: 5, p: 3 }}>
        <CardContent>
            <h2 style={{ textAlign: 'center', margin: '16px 0' }}>Welcome to JIFFYJOBS!</h2>
            <ToggleButtonGroup value={role} exclusive onChange={handleRole} fullWidth sx={{ mb: 2, justifyContent: 'center' }}>
            <ToggleButton value="jobProvider" sx={{ width: '50%', borderRadius: '4px 0 0 4px' }}>Job Provider</ToggleButton>
            <ToggleButton value="jobSeeker" sx={{ width: '50%', borderRadius: '0 4px 4px 0' }}>Job Seeker</ToggleButton>
            </ToggleButtonGroup>

            <form onSubmit={handleSubmit} noValidate autoComplete="off">

            <div>
                <text className='pop-textfield-title'>
                    School
                </text> <br></br>
                <TextField error={error.schoolError} helperText={error.schoolError ? "*This field is required" : ""} required={true} placeholder="Search for your school" type="search" square={false} style={{width: '98.5%'}} onChange={(e) => {handleValues(e)}} id='title' value={val.school}/>
            </div> 
            <div style={{paddingTop: '2.5%'}}>
                <text className='pop-textfield-title'>
                    Name
                </text> <br></br>
                <TextField error={error.nameError} helperText={error.nameError ? "*This field is required" : ""} required={true} placeholder="Your Name" type="search" square={false} style={{width: '98.5%'}} onChange={(e) => {handleValues(e)}} id='title' value={val.name}/>
            </div>
            <div style={{paddingTop: '2.5%'}}>
                <text className='pop-textfield-title'>
                    School Email Address
                </text> <br></br>
                <TextField error={error.emailError} helperText={error.emailError ? "*This field is required" : ""} required={true} placeholder="example@bu.edu" type="search" square={false} style={{width: '98.5%'}} onChange={(e) => {handleValues(e)}} id='title' value={val.email}/>
            </div>
            <div style={{paddingTop: '2.5%'}}>
                <text className='pop-textfield-title'>
                    Password
                </text> <br></br>
                <TextField error={error.passwordError} helperText={error.passwordError ? "*This field is required" : ""} required={true} placeholder="Your Password" type="search" square={false} style={{width: '98.5%'}} onChange={(e) => {handleValues(e)}} id='title' value={val.password}/>
            </div>

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 2, py: 1.5, backgroundColor: '#333', '&:hover': { backgroundColor: '#555' } }} >
                Sign up as a Job Seeker
            </Button>
            </form>
        </CardContent>
        </Card>
    </div>
  );
};

export default SignUpForm;
