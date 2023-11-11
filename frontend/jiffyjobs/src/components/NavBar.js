import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';

export function NavBar() {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null);

    const settings = ['Profile', 'Dashboard', 'Setting', 'Logout'];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

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
        'Dashboard': goToDashboard,
        'Setting': handleSettings,
        'Logout': handleLogout
    };

    return (
        <Grid container className="nav-outer">
             <h1 className='logo-font' onClick={AllJobs} style={{ display: 'flex', alignItems: 'center', marginRight: 'auto'}} >
                JIFFYJOBS
            </h1>
            
            <div className='first-font' onClick={AllJobs} style={{ display: 'flex', alignItems: 'center',  whiteSpace: 'nowrap', marginLeft: '30%'}} >
                All Jobs 
            </div>

            <div className='name-font' style={{ display: 'flex', alignItems: 'center',  whiteSpace: 'nowrap', marginLeft: 'auto'}} >
            
        

                {/* <div className='tab-font'></div>
                <div className='tab-font'></div>
                <div className='tab-font'></div>
                <div className='tab-font'></div>
                <div className='tab-font'></div>
                <div className='tab-font'></div>
                <div className='tab-font'></div>
                <div className='tab-font'></div> */}

                <Tooltip style={{ display: 'flex', alignItems: 'center'}} onClick={handleOpenUserMenu}>
                    <div className='profile-picture'></div>
                    <span style={{ fontWeight: 'bold' }} >Lucas Yoon</span>
                </Tooltip>
                
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
                        <MenuItem 
                            key={setting} 
                            onClick={() => {
                                handleCloseUserMenu(); 
                                settingsActions[setting](); 
                            }}>
                            <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </div>
            
            <div className='tab-font'></div>
            <div className='tab-font'></div>
            <div className='tab-font'></div>
            <div className='tab-font'></div>

        </Grid>
    )
}