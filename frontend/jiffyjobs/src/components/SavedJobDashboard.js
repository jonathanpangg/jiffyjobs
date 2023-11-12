import React, { useEffect, useState } from 'react';
import CardMedia from '@mui/material/CardMedia'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid';
import '../styles/Dashboard.css';

export function SavedJobDashboard() {
    const [jobData, setJobData] = useState(['1', '2', '3', '4']) // '5', '6', '7', '8', '9']

    return (
        <div>
            <div style={{fontSize: 'x-large', fontFamily: 'Outfit'}}>
                Progress
            </div>
            <div style={{fontSize: 'medium', fontFamily: 'Outfit'}}>
                Check your the progress on your job applications!
            </div>
            <Grid container className='progress-grid' rowSpacing={2} columnSpacing={2} width='100%'>
                {jobData.map((key) => {
                    return ( <Grid key={key} item> 
                        <Card sx={{width: '20vw', height: '20vw'}} elevation={8} square={false} style={{overflow:'hidden', borderRadius: '15px'}}>
                            <CardMedia
                                component="img"
                                alt="placeholder"
                                height="120"
                                image="https://source.unsplash.com/random"
                            />
                            <div>
                                {key}
                            </div>
                        </Card>
                    </Grid>)
                })}
            </Grid>
        </div>
    )
}