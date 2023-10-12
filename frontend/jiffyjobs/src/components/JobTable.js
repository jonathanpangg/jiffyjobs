import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 25 },
    { field: 'jobName', headerName: 'Job Name', width: 125 },
    { field: 'startDate', headerName: 'Start Date', width: 125 },
    { field: 'endDate', headerName: 'End Date', width: 125 },
];

const rows = [
    { id: 1, jobName: "Building Table", startDate: "11/28/2023", endDate: "12/1/2023" }, 
    { id: 2, jobName: "Tutoring", startDate: "10/5/2023", endDate: "10/7/2023" },
];

export function JobTable() {
    return (
        // <Box sx={{ height: 400, width: '100%' }}>
        //     <DataGrid rows={rows} columns={columns}/>
        // </Box>
        <div> 
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}