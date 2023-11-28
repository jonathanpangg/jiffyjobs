import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { styled, Tab, Tabs, Grid, Tooltip, Menu, Typography,
       MenuItem } from '@mui/material';

export function NavBar() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const settings = ['Profile', 'Logout'];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const location = useLocation();
    const [value, setValue] = useState((location.pathname.toLowerCase() === '/jobboard' || location.pathname.toLowerCase() === '/' || location.pathname.toLowerCase() === '') ? 0 : (location.pathname.toLowerCase() === '/dashboard' ? 1 : -1));

    console.log('Current route:', );

    // handle new value 
    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    // open nav menu
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    // close nav menu
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // go to job board
    const AllJobs = () => {
        navigate('/JobBoard')
    }

    // go to profile
    const Profile = () => {
        setValue(-1)
        navigate('/Profile')
    };

    // go to dashboard
    const goToDashboard = () => {
        navigate('/dashboard');
    };

    // handle logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("email");
        navigate('/login');
    }

    // handle settings actions
    const settingsActions = {
        'Profile': Profile,
        'Logout': handleLogout
    };

    // custom tab
    const CustomTab = styled((props) => <Tab {...props} />)(() => ({
        textTransform: 'none',
        fontFamily: 'Outfit',
        fontSize: 'medium',
    }))
    
    // custom tab props
    function allyProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    return (
        <Grid container style={{ alignItems: 'center', height: '64px' }}>
            <h1 className='logo-font' onClick={AllJobs} style={{ marginRight: 'auto',  height: '38px'}}>
                JIFFYJOBS
            </h1>
            
            <div style={{ flexGrow: 1 }}></div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', }}>
                {/* <div className='first-font' onClick={AllJobs} style={{ cursor: 'pointer', marginRight: '10px', whiteSpace: 'nowrap', }}>
                    All Jobs 
                </div>
                <div className='first-font' onClick={goToDashboard} style={{ cursor: 'pointer', marginRight: '10px', whiteSpace: 'nowrap' }}>
                    Dashboard
                </div> */}
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <CustomTab label="All Job" {...allyProps(0)} onClick={AllJobs}/>
                    <CustomTab label="Dashboard" {...allyProps(1)} onClick={goToDashboard}/>
                </Tabs>
                <div style={{ width: '40px' }}></div>

                <Tooltip onClick={handleOpenUserMenu} style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                    <div className='profile-picture'></div>
                    <span style={{ fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: '14px'}}>Lucas Yoon</span>
                </Tooltip>

                <div style={{ width: '3px', backgroundColor: 'black', height: '100%', marginRight: '10px' }}></div>

                <Menu
                    sx={{ mt: '26px', alignItems: 'center', }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={() => { handleCloseUserMenu(); settingsActions[setting](); }}>
                            <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </div>
         
            <div style={{ width: '20px' }}></div>
        </Grid>
    );
}
