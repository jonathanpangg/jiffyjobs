import * as React from 'react';
import { useNavigate } from 'react-router-dom';
// import { Divider } from '@mui/material';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';

export function NavBar() {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handlePopoverClose = () => {
        setAnchorEl(null);
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

    return (
        <div className='nav-outer'> 
             <h1 className='logo-font' onClick={AllJobs}>
                JIFFYJOBS
            </h1>
            <div className='tab-font'></div>
            <div className='tab-font'></div>


            

            <div className='first-tab' onClick={AllJobs}>
                All Jobs 
            </div>

            <div className='tab-font' onClick={goToDashboard}>
                Dashboard
            </div>

            
            <div className='name-font' style={{ display: 'flex', alignItems: 'center' }} aria-owns={open ? 'mouse-over-popover' : undefined} aria-haspopup="true" onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
                <div className='profile-picture'></div>
                <span style={{ fontWeight: 'bold' }}>Lucas Yoon</span>
                <Popover
                     open={Boolean(anchorEl)}
                     anchorEl={anchorEl}
                     onClose={handlePopoverClose}
                     anchorOrigin={{
                       vertical: 'bottom',
                       horizontal: 'right',
                     }}
                    >
                    <MenuItem onClick={Profile}>Profile</MenuItem>
                    <MenuItem onClick={handleSettings}>Settings</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Popover>
            </div>

            {/* <div className='tab-font'>
                Recent Jobs
            </div> */}
            {/* <div className='tab-font'>
                Progress
            </div> */}
            {/* <div className='tab-font'>
                Notifications
            </div> */}
            {/* <Divider orientation="vertical" flexItem /> */}

        </div>
    )
}