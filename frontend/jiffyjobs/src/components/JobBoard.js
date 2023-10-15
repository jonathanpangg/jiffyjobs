import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export function JobBoard() {
    const [jobData, setJobData] = useState([])

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
                    setJobData (data.map(function(obj) {
                        return [[0, obj.title], ["", "Job Provider: " + obj.job_poster], ["", "Location: " + obj.location], ["", "Pay: $" + obj.pay]]
                    }))
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        GetAllJobs()
    }, [jobData]);

    return (
        <div className='job-board-outer'>
            <Box sx={{ flexGrow: 1 }}>
                <Grid item xs={12}>
                    <Grid container className='job-table-grid' rowSpacing={0} columnSpacing={2}>
                        <Grid item className='job-search-tab'>
                            <Card sx={{height: 200, width: 1250}} elevation={8} square={false} style={{overflow:'hidden', borderRadius: '15px', paddingTop: '3.5%'}}>
                                <text className='job-search-text'> 
                                    Find jobs or hire college students starting now with {" "}
                                </text>
                                <text className='job-search-logo'>
                                    JIFFYJOBS
                                </text>
                                <br></br>
                                <Grid container className='job-table-grid' columnSpacing={2} style={{paddingLeft: '30%', paddingTop: '1.5%'}}> 
                                    <TextField placeholder="Find Jobs..." type="search" square={false} style={{width: '45%'}}/>
                                    <Grid className='job-button'>
                                        <Card sx={{height: 55, width: '100%'}} elevation={8} square={false} style={{overflow:'hidden', borderRadius: '15px', background: "#8253E7", color: 'white'}}>
                                            <CardContent style={{ display: 'flex', alignItems: 'center' }}> 
                                                Post a Job
                                            </CardContent>
                                        </Card> 
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        
                        <text style={{width: "100%"}} className='recently-posted-jobs'> 
                            Recently Posted Jobs
                        </text> 
                        
                        {jobData.map((key) => (
                            <Grid key={key} item>
                                <Card sx={{height: 300, width: 300}} elevation={8} square={false} style={{overflow:'hidden', borderRadius: '15px'}}>
                                    {key.map((data) => (
                                        <text className={'card-grid-' + data[0]}>
                                            {data[1]} <br></br>
                                        </text>
                                    ))}
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>   
            </Box>
        </div>
    )
}