import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export function NavBar() {
    const navigate = useNavigate()

    const AllJobs = () => {
        navigate('/JobBoard')
    }

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    const userProfile = () => {
        navigate('/profile');
    };

    return (
        <div className='nav-outer'> 
             <h1 className='logo-font' onClick={AllJobs}>
                JIFFYJOBS
            </h1>
            <div className='tab-font'></div>
            <div className='tab-font'></div>
            <div className='tab-font'></div>
            <div className='tab-font'></div>
            <div className='tab-font'></div>
            <div className='tab-font'></div>

            <div className='first-tab' onClick={AllJobs}>
                All Jobs 
            </div>
            <div className='tab-font' onClick={goToDashboard}>
                Dashboard
            </div>
            
            <div className='name-font' style={{ display: 'flex', alignItems: 'center' }}  onClick={userProfile}>
                <div className='profile-picture'></div>
                <span style={{ fontWeight: 'bold' }}>Lucas Yoon</span>
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