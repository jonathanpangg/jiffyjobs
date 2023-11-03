import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export function NavBar() {
    const navigate = useNavigate()

    const AllJobs = () => {
        navigate('/JobBoard')
    }

    const Profile = () => {
        navigate('/Profile')
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
                Dashboard
            </div>
            {/* <Divider orientation="vertical" flexItem /> */}
            <div className='name-font' onClick={Profile}>
                Lucas Yoon
                
            </div>
        </div>
    )
}