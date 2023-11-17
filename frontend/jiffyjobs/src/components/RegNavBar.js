import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';

export function RegNavBar() {
    const navigate = useNavigate()

    const AllJobs = () => {
        navigate('/JobBoard')
    }

    const handleLogout = () => {
        navigate('/login');
    }

    const handleSignUp = () => {
        navigate('/signup');
    };


    return (
        <Grid container style={{ alignItems: 'center', height: '64px' }}>
             <h1 className='logo-font' onClick={handleLogout} style={{ marginRight: 'auto'}} >
                JIFFYJOBS
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                <div className='first-font' onClick={AllJobs} style={{ cursor: 'pointer', marginRight: '10px', whiteSpace: 'nowrap', }}>
                    Temporary Button
                </div>
                <div className='first-font' onClick={handleSignUp} style={{ cursor: 'pointer', marginRight: '10px', whiteSpace: 'nowrap', }}>
                    Join Now
                </div>
                <div className='first-font' onClick={handleLogout} style={{ cursor: 'pointer', marginRight: '10px', whiteSpace: 'nowrap', }}>
                    Log In
                </div>
            </div>

            <div style={{ width: '20px' }}></div>

        </Grid>
    )
}