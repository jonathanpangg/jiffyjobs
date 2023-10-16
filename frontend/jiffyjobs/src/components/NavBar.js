import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export function NavBar() {
    const navigate = useNavigate()

    const AllJobs = () => {
        navigate('/JobBoard')
    }

    return (
        <div className='nav-outer'> 
             <h1 className='logo-font'>
                JIFFYJOBS
            </h1>
            <div className='first-tab' onClick={AllJobs}>
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
            {/* <Divider orientation="vertical" flexItem /> */}
            <div className='name-font'>
                Lucas Yoon
            </div>
        </div>
    )
}