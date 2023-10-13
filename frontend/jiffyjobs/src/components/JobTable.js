import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export function JobTable() {
    return(
        <div className='job-board-outer'>
            <Box sx={{ flexGrow: 1 }}>
                <Grid item xs={12}>
                    <Grid container className='job-table-grid' spacing={2}>
                        {["Cleaning", "Tutoring", "Research", "Babysitting", "Buying Groceries", "Building Shelf", "Watering Plants"].map((value) => (
                        <Grid key={value} item>
                            <Paper sx={{height: 275, width: 275}} elevation={6}>
                                {value}
                            </Paper>
                        </Grid>
                        ))}
                    </Grid>
                </Grid>   
            </Box>
        </div>
    )
}