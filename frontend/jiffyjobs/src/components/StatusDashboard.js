import React, { useEffect, useState } from 'react';
import CardMedia from '@mui/material/CardMedia'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid';
import '../styles/Dashboard.css';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import { Typography } from '@mui/material';
import acceptedPicture from '../images/Accepted.png'
import submittedPicture from '../images/Submitted.png'
import rejectedPicture from '../images/Rejected.png'
import check from '../images/Check.png'
import clock from '../images/Clock.png'
import x from '../images/X.png'

export function StatusDashboard() {
    const [statusData, setStatusData] = useState([]) 
    const [prevSize, setPrevSize] = useState([])

    useEffect(() => {
        async function getJobs() {
            const email = localStorage.getItem("email")
            const route = "https://jiffyjobs-api-production.up.railway.app/api/users/jobsApplied/" + email

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
                Progress
            </div>
            <div className='header-two'>
                Check your the progress on your job applications!
            </div>
            <Box className='progress-box'>
                <Grid container className='progress-grid' rowSpacing={2} columnSpacing={2} width='70vw' style={{paddingBottom: '1%'}}>
                    {statusData.map((key) => {
                        return ( 
                            <Grid key={key} item> 
                                <Card sx={{width: '20vw', height: '20vw', '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' }}} elevation={8} square={false} style={{overflow:'hidden', borderRadius: '15px'}}>
                                    <div style={{ position: 'relative', maxWidth: '100%'}}>
                                        <img
                                            style={{ width: '100%'}}
                                            src={ key[7][1] === "accepted" ? acceptedPicture: (key[7][1] === "submitted" ? submittedPicture: rejectedPicture)}
                                            alt="placeholder"
                                        />
                                        <div style={{position: 'absolute', maxWidth: '100%', top: '50%', left: '50%', textAlign: 'center', transform: 'translate(-50%, -50%)', whiteSpace: 'nowrap'}}>
                                            <img
                                                style={{ width: '24px', height: '24px'}}
                                                src={ key[7][1] === "accepted" ? check: (key[7][1] === "submitted" ? clock: x)}
                                                alt="placeholder"
                                            />
                                            <Typography style={{fontFamily: 'Outfit', fontSize:"20px", paddingLeft:'10px', paddingRight:'10px'}}>
                                                {key[7][1] === "accepted" ? "Application Accepted": (key[7][1] === "submitted" ? "Application Submitted": "Application Rejected")} 
                                            </Typography>
                                        </div>
                                    </div>
                                    <div style={{ position: 'relative', maxWidth: '100%' }}>
                                        <div>
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
                                            <Typography style={{fontFamily: 'Outfit', fontSize:"12px", padding:'10px', position:'relative', overflow:'hidden', textOverflow:'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, maxHeight:'44px'}}>
                                                Description: {key[4][1]}
                                            </Typography>
                                        </div>
                                        <div style={{position: 'absolute', maxWidth: '100%', bottom: '-25%', left: '50%', textAlign: 'center', transform: 'translate(-50%, -50%)', whiteSpace: 'nowrap'}}>
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