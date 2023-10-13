import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

export function JobTable() {
    const [jobList, setJobList] = useState([])

    const GetAllJobs = async () => {
        const route = "localhost:4000/api/jobs/get"
        const res = await fetch(route, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'x-functions-key': 'SHSHFt8CN3CxKEUGRrPt0hQohqQ3YDWF0DNT0UaQqIALAzFuCzfNfw=='
          }
        });
        const json = await res.json();
        setJobList(json)
    }

    useEffect(() => {
        GetAllJobs()
    });

    return(
        <div className='job-board-outer'>
            <Box sx={{ flexGrow: 1 }}>
                <Grid item xs={12}>
                    <Grid container className='job-table-grid' spacing={2}>
                        {jobList.map((value) => (
                        <Grid key={value} item>
                            <Card sx={{height: 275, width: 275}} elevation={6} square={false} className='paper-grid`'>
                                {value}
                            </Card>
                        </Grid>
                        ))}
                    </Grid>
                </Grid>   
            </Box>
        </div>
    )
}