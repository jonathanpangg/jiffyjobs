import * as React from 'react';
import { NavBar } from './NavBar';
import { JobTable } from './JobTable';
import { Divider } from '@mui/material';

export function JobBoard() {
    return (
        <div>
            <NavBar/> 
            <Divider/>
            <JobTable/>
        </div>
    );
}