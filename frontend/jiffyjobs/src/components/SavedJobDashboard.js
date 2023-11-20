import React, { useEffect, useState } from 'react';
import CardMedia from '@mui/material/CardMedia'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid';
import '../styles/Dashboard.css';
import { Box } from '@mui/system';

export function SavedJobDashboard() {
    const [jobData, setJobData] = useState(['1']) // '5', '6', '7', '8', '9']

    return (
        <div>
            <div className='header-one'>
                History
            </div>
            <div className='header-two'>
                View all the jobs you applied for!
            </div>
            <Box className='progress-box'>
                <Grid container className='progress-grid' rowSpacing={2} columnSpacing={2} width='70vw' style={{paddingBottom: '1%'}}>
                    {jobData.map((key) => {
                        return ( 
                            <Grid key={key} item> 
                                <Card sx={{width: '20vw', height: '20vw'}} elevation={8} square={false} style={{overflow:'hidden', borderRadius: '15px'}}>
                                    <CardMedia
                                        component="img"
                                        alt="placeholder"
                                        height="120vh"
                                        image="https://source.unsplash.com/random"
                                    />
                                    <div>
                                        {key}
                                    </div>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
        </div>
    )
}