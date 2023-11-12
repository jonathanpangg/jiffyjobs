import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { styled } from '@mui/material/styles';

export function NavBar() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const settings = ['Profile', 'Setting', 'Logout'];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [value, setValue] = useState(0);

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const AllJobs = () => {
        navigate('/JobBoard')
    }

    const Profile = () => {
        navigate('/Profile')
    };

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    const handleSettings = () => {
        navigate('/setting');
    }

    const handleLogout = () => {
        navigate('/login');
    }

    const settingsActions = {
        'Profile': Profile,
        'Setting': handleSettings,
        'Logout': handleLogout
    };

    const CustomTab = styled((props) => <Tab {...props} />)(() => ({
        textTransform: 'none',
        fontFamily: 'Outfit',
        fontSize: 'medium',
    }))
    
    function allyProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    return (
        <Grid container className="nav-outer" style={{ display: 'flex', alignItems: 'center' }}>
            <h1 className='logo-font' onClick={AllJobs} style={{ marginRight: 'auto' }}>
                JIFFYJOBS
            </h1>
            
            <div style={{ flexGrow: 1 }}></div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
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
                <div style={{ width: '80px' }}></div>

                <Tooltip onClick={handleOpenUserMenu} style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                    <div className='profile-picture'></div>
                    <span style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Lucas Yoon</span>
                </Tooltip>

                <div style={{ width: '3px', backgroundColor: 'black', height: '100%', marginRight: '10px' }}></div>

                <Menu
                    sx={{ mt: '45px' }}
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
