import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import { Box, Card, Grid, CardMedia, Typography, Button } from '@mui/material'
import dayjs from 'dayjs';
import { ViewApplicants } from './ViewApplicants';

export function PostedJobDashboard() {
    const [statusData, setStatusData] = useState([]) 
    const [prevSize, setPrevSize] = useState([])
    const [jobID, setJobID] = useState("")

    const navigate = useNavigate();

    const randomImage = (seed) => {
        return `https://source.unsplash.com/random?${seed}`;
    };

    const goToJobBoard = () => {   
        navigate('/jobboard');
    }

    useEffect(() => {
        async function getJobs() {
            const email = localStorage.getItem("email")
            const route = "https://jiffyjobs-api-production.up.railway.app/api/users/jobsPosted/" + email

            fetch(route)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    const sortedData = data.sort((a, b) => new Date(b.date_posted) - new Date(a.date_posted));
                    const newJobData = sortedData.map(function(obj) {
                        return [obj.title, obj.job_poster, obj.location, obj.pay, obj.description, dayjs(new Date(obj.time[0])).format('MM/DD/YY h:mm A')  + " " + " - " + dayjs(new Date(obj.time[1])).format('h:mm A'), obj.categories.toString(), obj.status, obj._id]
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
        <>
            { jobID !== '' ? <ViewApplicants jobID={jobID}/>: 
                <div>
                    <div className='header-one'>
                        Jobs Posted
                    </div>
                    <div className='header-two'>
                        Check who applied to your job posting!
                    </div>
                    <Box className='progress-box'>
                        {statusData.length > 0 ? (
                        <Grid container className='progress-grid' rowSpacing={3} columnSpacing={3} width='70vw' style={{paddingBottom: '1%'}}>
                            {statusData.map((key) => {
                                return ( 
                                    <Grid key={key} item> 
                                        <Card sx={{width: '264px', height: '264px'}} elevation={8} square={false} style={{overflow:'hidden', borderRadius: '15px'}} onClick={() => {setJobID(key[8])}}>
                                            <div className='overall-card'>
                                                <CardMedia
                                                    component="img"
                                                    alt="placeholder"
                                                    height="99px"
                                                    image={randomImage(key[6][1].split(",")[0])}
                                                />
                                            </div>
                                            <div className='overall-card'>
                                                <div style={{height: '200px'}}>
                                                    <Typography style={{fontFamily: 'Outfit', fontSize:"14px", paddingLeft:'16px', paddingRight:'10px', paddingTop:'10px', fontWeight: 500,}}>
                                                        <u>{key[0]}</u>
                                                    </Typography>
                                                    <Typography style={{fontFamily: 'Outfit', fontSize:"12px", paddingLeft:'16px', paddingRight:'10px', paddingTop:'15px', fontWeight: 400,}}>
                                                        Pay: <span style={{ fontWeight: '500' }}>$</span><span style={{ fontWeight: '500' }}>{key[3][1]}</span>
                                                    </Typography>
                                                    <Typography style={{fontFamily: 'Outfit', fontSize:"12px", paddingLeft:'16px', paddingRight:'10px', fontWeight: 400,}}>
                                                        Location:<span style={{ fontWeight: '500' }}>{<u>{key[2][1]}</u>}</span>
                                                    </Typography>
                                                    <Typography style={{fontFamily: 'Outfit', fontSize:"12px", paddingLeft:'16px', paddingRight:'10px', fontWeight: 400,}}>
                                                        Time: <span style={{ fontWeight: '500' }}>{key[5][1]}</span>
                                                    </Typography>
                                                    <Typography style={{fontFamily: 'Outfit', fontSize:"12px", paddingLeft: '16px', paddingRight:'10px', position:'relative', overflow:'hidden', textOverflow:'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, lineHeight: '1.1', height: '27px', fontWeight: 400,}}>
                                                        Description: <span style={{ fontWeight: '500' }}>{key[4][1]}</span>
                                                    </Typography>
                                                </div>
                                            </div>
                                        </Card>
                                    </Grid>
                                )
                            })}
                        </Grid>
                         ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '10vh', width:'65vw' }}>
                                <div style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'Outfit' }}>
                                    Currently you have no jobs posted.
                                </div>
                                <Button variant="contained" style={{ width: '200px', height: '34px', backgroundColor: '#4A4FE4', color: 'white', marginTop: '20px', fontSize: '14px', fontFamily: 'Outfit', fontWeight: 400, padding: '13px 18px', borderRadius: '8px' }} onClick={goToJobBoard}>
                                    <span style={{textTransform:'none'}}>Post a Job</span>
                                </Button>
                            </div>
                        )}
                    </Box>
                </div>
            }
        </>
    )
}