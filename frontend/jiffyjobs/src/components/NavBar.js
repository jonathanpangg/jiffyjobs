import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { styled, Tab, Tabs, Grid, Tooltip, Menu, Typography,
       Avatar, MenuItem } from '@mui/material';

export function NavBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const settings = ['Profile', 'Logout'];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const location = useLocation();
    const [value, setValue] = useState((location.pathname.toLowerCase() === '/jobboard' || location.pathname.toLowerCase() === '/' || location.pathname.toLowerCase() === '') ? 0 : (location.pathname.toLowerCase() === '/dashboard' ? 1 : -1));
   
    const [last, setLast] = useState(localStorage.getItem("last"));
    const [first, setFirst] = useState(localStorage.getItem("first"));
    const isLoggedIn = () => !!localStorage.getItem("token");

    const navigate = useNavigate();

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

    const handleSignUp = () => {
        navigate('/signup');
    };

    // handle logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("email");
        localStorage.removeItem("first");
        localStorage.removeItem("last");
        navigate('/login');
    }

    // handle settings actions
    const settingsActions = {
        'Profile': Profile,
        'Logout': handleLogout
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
        <Grid container style={{ alignItems: 'center', height: '59px', position: 'relative' }}>
            <h1 className='logo-font' onClick={AllJobs} style={{ height: '38px', marginTop: '15px' }}>
                JIFFYJOBS
            </h1>
            <div style={{ flex: '1', display: 'flex', justifyContent: 'flex-end', maxWidth: 'calc(100% - 400px)' }}> 
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor='inherit' TabIndicatorProps={{ style: { background: '#5B5B5B' } }}>
                    <CustomTab label="All Job" {...allyProps(0)} onClick={AllJobs} />
                    {isLoggedIn() ? (<CustomTab label="Dashboard" {...allyProps(1)} onClick={goToDashboard} />) : (<></>)}
                </Tabs>
            </div>

            <div style={{ position: 'absolute', right: '200px', top: 0, bottom: 0 }}>
                <div style={{ height: '59px', borderRight: '2px solid #D9D9D9' }}></div>
            </div>

            {isLoggedIn() ? (
                // logged in
                  <>
                    <div style={{ position: 'absolute', left: 'calc(100% - 162px)', top: '51%', transform: 'translate(-10%, -50%)', display: 'flex', alignItems: 'center', }}>
                        <Tooltip onClick={handleOpenUserMenu} style={{ display: 'block' }}>
                            <div className='profile-picture'>
                                <Avatar sx={{ bgcolor: "#cccccc", marginRight: 10, color: "#5B5B5B", width: 25, height: 25, fontSize: '14px', fontFamily: 'Outfit'}}>{first[0] + last[0]}</Avatar>
                            </div>
                            <div style={{ display: 'inline-block', marginLeft: '5px', flexDirection: 'column', justifyContent: 'center', textAlign: 'left', maxWidth: '120px', wordBreak: 'break-all', }}>
                                <span style={{ fontWeight: 500, fontSize: '16px', color: '#5B5B5B', fontFamily: 'Outfit', }}> {first} {last} </span> 
                            </div>
                        </Tooltip>
                            <Menu
                                sx={{ mt: '32.75px', alignItems: 'center', }}
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
                </>
            ) : (
                // not logged in
                <div style={{ position: 'absolute', left: 'calc(100% - 180px)', top: 0, bottom: 0, display: 'flex', alignItems: 'center', }}>
                    <div className='first-font' onClick={handleSignUp} style={{ cursor: 'pointer', marginBottom: '-2px', whiteSpace: 'nowrap', color: '#5B5B5B', fontWeight: 500 }}>
                        Join Now
                    </div>
                    <div className='first-font' onClick={handleLogout} style={{ cursor: 'pointer', marginLeft: '15px', marginBottom: '-1px', whiteSpace: 'nowrap', padding: '5px 10px', backgroundColor: '#FFFFFF', border: '1px solid #D9D9D9', borderRadius: '8px', color: '#5B5B5B', fontWeight: 500 }}>
                        Log in
                    </div>
                </div>
             )}
        </Grid>
    );
}
