import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

export function JobTable() {
    const [jobList, setJobList] = useState([])

    useEffect(() => {
        async function GetAllJobs() {
            const route = "http://localhost:4000/api/jobs/get"
            fetch(route)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    setJobList(data.map(function(obj) {
                        return (obj.title)
                    }))
                })
                .catch((error) => {
                    console.log(error)
                })
                
                // console.log(jobList)
        }
        GetAllJobs()
    }, [jobList]);

    return (
        <div className='job-board-outer'> */
            <Box sx={{ flexGrow: 1 }}>
                <Grid item xs={12}>
                    <Grid container className='job-table-grid' spacing={2}>
                        {jobList.map((key) => (
                            <Grid key={key} item>
                                <Card sx={{height: 275, width: 275}} elevation={6} square={false} className='paper-grid`'>
                                    {key}
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>   
            </Box>
        </div>
    )
}