import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export function RegNavBar() {
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

    const handleLogout = () => {
        navigate('/login');
    }

    const handleSignUp = () => {
        navigate('/signup');
    };


    return (
        <Grid container className="nav-outer">
             <h1 className='logo-font' onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', marginRight: 'auto'}} >
                JIFFYJOBS
            </h1>

            <Button color='inherit'  onClick={handleSignUp}>Join Now</Button>
            <Button color='inherit'  onClick={handleLogout}>Log In</Button>

            <div className='tab-font'></div>

                {/* <div className='tab-font'></div>
                <div className='tab-font'></div>
                <div className='tab-font'></div>
                <div className='tab-font'></div>
                <div className='tab-font'></div>
                <div className='tab-font'></div>
                <div className='tab-font'></div>
                <div className='tab-font'></div> */}

        </Grid>
    )
}