import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';
import { Box, Card, Grid, CardMedia, Typography, } from '@mui/material'
import dayjs from 'dayjs';

import StarRoundedIcon from '@mui/icons-material/StarRounded';

export function SavedJobDashboard() {
    const [statusData, setStatusData] = useState([]) 
    const [prevSize, setPrevSize] = useState([])

    const randomImage = (seed) => {
        return `https://source.unsplash.com/random?${seed}`;
    };

    useEffect(() => {
        async function getJobs() {
            const email = localStorage.getItem("email")
            const route = "https://jiffyjobs-api-production.up.railway.app/api/users/saved/" + email

            fetch(route)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    const newJobData = data.map(function(obj) {
                        return [[0, obj.title], ["", obj.job_poster], ["", obj.location], ["", obj.pay], ["", obj.description], ["", dayjs(new Date(obj.time[0])).format('MM/DD/YY h:mm A')  + " " + " - " + dayjs(new Date(obj.time[1])).format('h:mm A')], ["", obj.categories.toString()], ["", obj.status]]
                    });
                    setStatusData(newJobData)
                    setPrevSize(newJobData.length)

                    
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        if (prevSize != statusData.length || prevSize == 0) {
            getJobs()
        }
    }, [statusData]);

    return (
        <div>
            <div className='header-one'>
                Saved
            </div>
            <div className='header-two'>
                View all the jobs you applied for!
            </div>
            <Box className='progress-box'>
                <Grid container className='progress-grid' rowSpacing={3} columnSpacing={3} width='70vw' style={{paddingBottom: '1%'}}>
                    {statusData.map((key) => {
                        return ( 
                            <Grid key={key} item> 
                                <Card sx={{width: '20vw', height: '20vw'}} elevation={8} square={false} style={{overflow:'hidden', borderRadius: '15px'}}>
                                    <div className='overall-card'>
                                        <CardMedia
                                            component="img"
                                            alt="placeholder"
                                            height="99px"
                                            image={randomImage(key[6][1].split(",")[0])}
                                        />
                                        <div style={{position: 'absolute', maxWidth: '100%', top: '30%', left: '90%', textAlign: 'center', transform: 'translate(-50%, -50%)', whiteSpace: 'nowrap'}}>
                                            <StarRoundedIcon
                                                style={{ width: '40px', height: '40px', color: '#5B5B5B'}}
                                            />
                                        </div>
                                    </div>
                                    <div className='overall-card'>
                                        <div style={{height: '200px'}}>
                                            <Typography style={{fontFamily: 'Outfit', fontSize:"14px", paddingLeft:'10px', paddingRight:'10px', paddingTop:'10px'}}>
                                                <u>{key[0][1]}</u>
                                            </Typography>
                                            <Typography style={{fontFamily: 'Outfit', fontSize:"12px", paddingLeft:'10px', paddingRight:'10px', paddingTop:'15px'}}>
                                                Pay: ${key[3][1]}
                                            </Typography>
                                            <Typography style={{fontFamily: 'Outfit', fontSize:"12px", paddingLeft:'10px', paddingRight:'10px'}}>
                                                Location: <u>{key[2][1]}</u>
                                            </Typography>
                                            <Typography style={{fontFamily: 'Outfit', fontSize:"12px", paddingLeft:'10px', paddingRight:'10px'}}>
                                                Time: {key[5][1]}
                                            </Typography>
                                            <Typography style={{fontFamily: 'Outfit', fontSize:"12px", paddingLeft: '10px', paddingRight:'10px', position:'relative', overflow:'hidden', textOverflow:'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, lineHeight: '1.1', height: '26px'}}>
                                                Description: {key[4][1]}
                                            </Typography>
                                        </div>
                                        <div style={{position: 'absolute', maxWidth: '100%', bottom: '15%', left: '50%', textAlign: 'center', transform: 'translate(-50%, -50%)', whiteSpace: 'nowrap', display: 'none'}}>
                                            <Card sx={{width: '12.5vw', height: '2.5vw'}} elevation={8} square={false} style={{overflow:'hidden', borderRadius: '7px', fontFamily: 'Outfit', fontSize: '12px', fontWeight: '400', fontStyle: 'normal', backgroundColor: '#A4A4A4', display: 'inline-flex', justifyContent: 'center', alignItems: 'center'}}>
                                                Withdraw Application
                                            </Card>
                                        </div>
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