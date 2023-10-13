import * as React from 'react';

export function NavBar() {
    return (
        <div className='nav-outer'> 
             <h1 className='logo-font'>
                JIFFYJOBS
            </h1>
            <div className='first-tab'>
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
            <div className='name-font'>
                Lucas Yoon
            </div>
        </div>
    )
}