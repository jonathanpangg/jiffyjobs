import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import { ToastContainer, toast } from 'react-toastify';
import { Box, Link, Card, Grid, CardActionArea, Typography, CardMedia, Button } from '@mui/material';
import dayjs from 'dayjs';

import reject from '../images/Reject.png'

import { JobPopup } from './JobPopup';
import check from '../images/Check.png';
import clock from '../images/Clock.png';
import x from '../images/X.png';

import { ConfirmPopup } from '../components/ConfirmPopup';

export function StatusDashboard() {
    const [statusData, setStatusData] = useState([]) 
    const [prevSize, setPrevSize] = useState([])
    const [openPop, setOpenPop] = useState(false)
    const [currentPop, setCurrentPop] = useState([])
    const [openConfirmPopup, setOpenConfirmPopup] = useState(false);

    const [jobLength, setJobLength] = useState(true);

    const [ userEmail, setUserEmail ] = useState(localStorage.getItem("email"));

    const navigate = useNavigate();

    // open popup
    const openPopUp = (key) => {
        setCurrentPop(key);
        setOpenPop(true);
    }
    // close popup
    const closePop = () => {
        setOpenPop(false);
    }

    const handleCloseConfirm = () => {
        window.location.href = '/dashboard';
    }

    const handleWithdrawProfile = () => {
        const user = {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
        }

        const route = `https://jiffyjobs.vercel.app/api/users/withDraw/${currentPop[0][0]}/${userEmail}`;
        fetch(route, user)
        .then(async (response) => {
            const res = await response.json()
            if (!response.ok) {
                throw new Error(res.message);
            } 
            return res;
        })
        .then((data) => {
            setOpenConfirmPopup(true);
        })
        .catch((error) => {
            const err = error.message;
            if (err.startsWith('Error: ')) {
                toast.dismiss();
                toast.error(err.slice(7), {
                    icon: ({theme, type}) =>  <img src={reject} style={{ width: '24px', height: '24px', marginRight: '10px', marginBottom:'6px'}}/>,
                    progressStyle: {backgroundColor: '#C12020'},
                    style: {fontFamily: 'Outfit'},
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.dismiss();
                toast.error(err, {
                    icon: ({theme, type}) =>  <img src={reject} style={{ width: '24px', height: '24px', marginRight: '10px', marginBottom:'6px'}}/>,
                    progressStyle: {backgroundColor: '#C12020'},
                    style: {fontFamily: 'Outfit'},
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        });

    };

    // random image for category
    const randomImage = (seed) => {
        return `https://source.unsplash.com/random?${seed}`;
    };

    const goToJobBoard = () => {   
        navigate('/jobboard');
    }

    useEffect(() => {
        async function getJobs() {
            const email = localStorage.getItem("email")
            const route = `https://jiffyjobs.vercel.app/api/users/jobsApplied/${email}`
            fetch(route)
                .then(async (response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return await response.json();
                })
                .then((data) => {

                    const newJobData = data.map(function(obj) {
                        return [[obj._id, obj.title], [randomImage(obj.categories.toString().split(",")[0]), obj.job_poster], ["", obj.location], ["", obj.pay], ["", obj.description], ["", dayjs(new Date(obj.time[0])).format('MM/DD/YY h:mm A')  + " " + " - " + dayjs(new Date(obj.time[1])).format('h:mm A')], ["", obj.categories.toString()], ["", obj.status]]
                    });
                    setStatusData(newJobData)
                    setPrevSize(newJobData.length)
                })
                .catch((error) => {
                    console.log(error)
                    setJobLength(false);
                })
        }
        if (prevSize != statusData.length || prevSize == 0) {
            getJobs()
        }
    }, [statusData]);

    return (
        <div>
            <div className='header-one'>
                Status
            </div>
            <div className='header-two'>
                Check your the progress on your job applications!
            </div>
            <Box className='progress-box'>
                {jobLength ? (
                <Grid container className='progress-grid' rowSpacing={3} columnSpacing={3} width='70vw' style={{paddingBottom: '1%'}}>
                    {statusData.map((key) => {
                        return ( 
                            <Grid key={key} item> 
                                <Link overlay underline="none" sx={{ color: 'text.tertiary', cursor: 'pointer' }} onClick={() => openPopUp(key)}>
                                    <Card sx={{width: '264px', height: '264px'}} elevation={8} square={false} style={{overflow:'hidden', borderRadius: '15px'}}>
                                        <div className='overall-card'>
                                            <div className='overlay' style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '99px',
                                                backgroundColor: key[7][1] === "accepted" ? 'rgba(166, 255, 152, 0.7)' : (key[7][1] === "submitted" ? 'rgba(255, 226, 152, 0.7)': 'rgba(255, 152, 152, 0.7)'),
                                                zIndex: 1, 
                                            }}></div>
                                            <CardMedia
                                                component="img"
                                                alt="placeholder"
                                                height="99px"
                                                image={key[1][0]}
                                            />
                                            <div style={{position: 'absolute', maxWidth: '100%', top: '50%', left: '50%', textAlign: 'center', transform: 'translate(-50%, -50%)', whiteSpace: 'nowrap', zIndex: 2}}>
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

                                        <div className='overall-card'>
                                            <div className={key[7][1] === 'submitted'? "status-card": ''} >
                                                <Typography style={{fontFamily: 'Outfit', fontSize:"14px", paddingLeft:'16px', paddingRight:'10px', paddingTop:'10px', fontWeight: 500,}}>
                                                    <u>{key[0][1]}</u>
                                                </Typography>
                                                <Typography style={{fontFamily: 'Outfit', fontSize:"12px", paddingLeft:'16px', paddingRight:'10px', paddingTop:'15px', fontWeight: 400,}}>
                                                    Pay: <span style={{ fontWeight: '500' }}>$</span><span style={{ fontWeight: '500' }}>{key[3][1]}</span>
                                                </Typography>
                                                <Typography style={{fontFamily: 'Outfit', fontSize:"12px", paddingLeft:'16px', paddingRight:'10px', fontWeight: 400,}}>
                                                    Location: <span style={{ fontWeight: '500' }}>{<u>{key[2][1]}</u>}</span>
                                                </Typography>
                                                <Typography style={{fontFamily: 'Outfit', fontSize:"12px", paddingLeft:'16px', paddingRight:'10px', fontWeight: 400,}}>
                                                    Time: <span style={{ fontWeight: '500' }}>{key[5][1]}</span>
                                                </Typography>
                                                <Typography style={{fontFamily: 'Outfit', fontSize:"12px", paddingLeft: '16px', paddingRight:'10px', position:'relative', overflow:'hidden', textOverflow:'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, lineHeight: '1.1', height: '27px', fontWeight: 400,}}>
                                                    Description: <span style={{ fontWeight: '500' }}>{key[4][1]}</span>
                                                </Typography>
                                            </div>

                                            {key[7][1] === 'submitted' && 
                                                <div className='withdraw-card'>
                                                    <Card sx={{width: '12.5vw', height: '2.5vw'}} elevation={8} square={false} style={{overflow:'hidden', borderRadius: '7px', fontFamily: 'Outfit', fontSize: '12px', cursor:'pointer', fontWeight: '400', fontStyle: 'normal', backgroundColor: '#4A4FE4', color: 'white', display: 'inline-flex', justifyContent: 'center', alignItems: 'center'}}>
                                                        Withdraw Application
                                                    </Card>
                                                </div>
                                            }
                                        </div>
                                    </Card>
                                </Link>
                            </Grid>
                        )
                    })}
                </Grid>
                 ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '10vh', width:'65vw' }}>
                        <div style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'Outfit' }}>
                            Currently you have not applied to any jobs.
                        </div>
                        <Button variant="contained" style={{ width: '200px', height: '34px', backgroundColor: '#4A4FE4', color: 'white', marginTop: '20px', fontSize: '14px', fontFamily: 'Outfit', fontWeight: 400, padding: '13px 18px', borderRadius: '8px' }} onClick={goToJobBoard}>
                            <span style={{textTransform:'none'}}>Begin Your Job Search</span>
                        </Button>
                    </div>
                )}
            </Box>
            {openConfirmPopup && (<ConfirmPopup open={openConfirmPopup} onClose={handleCloseConfirm}/>)}
            {openPop && (<JobPopup open={openPop} onClose={closePop} openPopUp={openPopUp} currentPop={currentPop} openConfirmPopup={openConfirmPopup} openSubmit={handleWithdrawProfile} jobData={statusData} save={'save'} />)}
        </div>
    )
}