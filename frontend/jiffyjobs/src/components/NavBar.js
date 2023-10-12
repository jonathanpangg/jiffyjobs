import * as React from 'react';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import { Divider } from '@mui/material';

export function NavBar() {
    return (
        <div> 
            <div> 
                <div className='top-bar'>
                    <h1 className='logo-font'>
                        JIFFYJOBS
                    </h1>
                    <div className='name-font'>
                        Lucas Yoon
                    </div>
                </div>
                <div className='tab-font'>
                    All Jobs
                </div>
                <div className='tab-font'>
                    Recent Jobs
                </div>
                <div className='tab-font'>
                    Progress
                </div>
                <div className='tab-font'>
                    Notifications
                </div>
            </div>
            
            
        </div>
    )
}