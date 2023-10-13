import * as React from 'react';
import { NavBar } from './NavBar';
import { Divider } from '@mui/material';
import { JobTable } from './JobTable'

export function JobBoard() {
    return (
        <div>
            <NavBar/> 
            <Divider/>
            <JobTable/> 
        </div>
    );
}