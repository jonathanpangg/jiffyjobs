import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { styled, Tab, Tabs, Grid, Tooltip, Menu, Typography,
         MenuItem } from '@mui/material';

export function RegNavBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const settings = ['Profile', 'Logout'];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const location = useLocation();
    const [value, setValue] = useState((location.pathname.toLowerCase() === '/jobboard' || location.pathname.toLowerCase() === '/' || location.pathname.toLowerCase() === '') ? 0 : (location.pathname.toLowerCase() === '/dashboard' ? 1 : -1));

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

    // go to dashboard
    const goToDashboard = () => {
        navigate('/dashboard');
    };

     // handle new value 
     const handleChange = (_, newValue) => {
        setValue(newValue);
    };

     // custom tab
     const CustomTab = styled((props) => <Tab {...props} />)(() => ({
        fontSize: '16px',
        paddingTop: '0.1%',
        paddingBottom: '1.4%',
        textTransform: 'none',
        fontFamily: 'Outfit',
        fontWeight: 500,
        marginBottom: '6px',
    }))
    
    // custom tab props
    function allyProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    return (
        <Grid container style={{ alignItems: 'center', height: '59px',}}>
            <h1 className='logo-font' onClick={AllJobs} style={{ marginRight: 'auto',  height: '38px', marginTop: '15px'}}>
                JIFFYJOBS
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor='inherit' TabIndicatorProps={{style: {background: '#5B5B5B', }}}>
                    <CustomTab label="All Job" {...allyProps(0)} onClick={AllJobs}/>
                    <CustomTab label="Dashboard" {...allyProps(1)} onClick={goToDashboard}/>
                </Tabs>

                <div style={{ width: '22px' }}></div>
                <div style={{ height: '59px', borderRight: '2px solid #D9D9D9', marginBottom: '12px',  }}></div>

                <div className='first-font' onClick={handleSignUp} style={{ cursor: 'pointer', marginBottom: '6px', whiteSpace: 'nowrap', color: '#5B5B5B', fontWeight: 500 }}>
                    Join Now
                </div>
                <div style={{ width: '20px' }}></div>
                <div className='first-font' onClick={handleLogout} style={{ cursor: 'pointer', marginRight: '10px', marginBottom: '8px', whiteSpace: 'nowrap', padding: '5px 10px', backgroundColor: '#FFFFFF', border: '1px solid #D9D9D9', borderRadius: '8px', color: '#5B5B5B', fontWeight: 500 }}>
                    Log in
                </div>
            </div>

            <div style={{ width: '20px' }}></div>

        </Grid>
    )
}