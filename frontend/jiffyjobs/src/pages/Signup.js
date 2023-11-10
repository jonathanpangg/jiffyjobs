import React, { useState } from 'react';
import { Button, TextField, ToggleButton, ToggleButtonGroup, Card, CardContent } from '@mui/material';
import { RegNavBar } from '../components/RegNavBar';

export function Signup() {
    const [role, setRole] = React.useState('jobSeeker');
    const [background, setBackground] = useState("")

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
    

    return (
        <>
        <RegNavBar/>
            <div className={'job-board-outer' + background}>
                <Card sx={{ maxWidth: 600, maxHeight: 600, mx: 'auto', mt: '50px', p: '1%'}}>
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
                        <TextField error={error.schoolError} helperText={error.schoolError ? "*This field is required" : ""} required={true} placeholder="Search for your school" type="text" square={false} style={{width: '98.5%'}} onChange={(e) => {handleValues(e)}} id='school' value={val.school}/>
                    </div> 
                    <div style={{paddingTop: '2.5%'}}>
                        <text className='pop-textfield-title'>
                            Name
                        </text> <br></br>
                        <TextField error={error.nameError} helperText={error.nameError ? "*This field is required" : ""} required={true} placeholder="Your Name" type="text" square={false} style={{width: '98.5%'}} onChange={(e) => {handleValues(e)}} id='name' value={val.name}/>
                    </div>
                    <div style={{paddingTop: '2.5%'}}>
                        <text className='pop-textfield-title'>
                            School Email Address
                        </text> <br></br>
                        <TextField error={error.emailError} helperText={error.emailError ? "*This field is required" : ""} required={true} placeholder="example@bu.edu" type="email" square={false} style={{width: '98.5%'}} onChange={(e) => {handleValues(e)}} id='email' value={val.email}/>
                    </div>
                    <div style={{paddingTop: '2.5%'}}>
                        <text className='pop-textfield-title'>
                            Password
                        </text> <br></br>
                        <TextField error={error.passwordError} helperText={error.passwordError ? "*This field is required" : ""} required={true} placeholder="Your Password" type="password" square={false} style={{width: '98.5%'}} onChange={(e) => {handleValues(e)}} id='password' value={val.password}/>
                    </div>

                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 2, py: 1.5, backgroundColor: '#333', '&:hover': { backgroundColor: '#555' } }} >
                        Sign up as a {role === 'jobSeeker' ? 'Job Seeker' : 'Job Provider'}
                    </Button>
                    </form>
                </CardContent>
                </Card>
            </div>
        </>
    )
}


