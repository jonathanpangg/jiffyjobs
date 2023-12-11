import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';
import { Box, Card, Grid, CardMedia, Typography, } from '@mui/material'
import dayjs from 'dayjs';
import { JobPopup } from './JobPopup';
import { ToastContainer, toast } from 'react-toastify';
import { SubmitProfilePopup } from './SubmitPopup';
import reject from '../images/Reject.png';
import { CongratsPopup } from './CongratsPopup';

import StarRoundedIcon from '@mui/icons-material/StarRounded';

export function SavedJobDashboard() {
    const [statusData, setStatusData] = useState([]) 
    const [prevSize, setPrevSize] = useState([])
    const [openPop, setOpenPop] = useState(false)
    const [currentPop, setCurrentPop] = useState([])
    const [profile, setProfile] = useState([])
    const [gotProfile, setGotProfile] = useState(false);


    const [ userEmail, setUserEmail ] = useState(localStorage.getItem("email"));
    const [ userRole, setUserRole ] = useState(localStorage.getItem("user"));

    const [openSubmitProfile, setOpenSubmitProfile] = useState(false);
    const [openCongratsPopup, setOpenCongratsPopup] = useState(false);


    const randomImage = (seed) => {
        return `https://source.unsplash.com/random?${seed}`;
    };

    async function savedJobs(jobID) {
        const email = localStorage.getItem("email")

        const requestOptions = {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                job_id: jobID
            })
        }

        const route = "https://jiffyjobs-api-production.up.railway.app/api/users/save";
        fetch(route, requestOptions)
            .then((response) => {
                const res = response.json()
                if (!response.ok) {
                    throw new Error(res.message);
                } 
                return res;
            })
            .then((_) => {
               setStatusData([])
            }).catch((error) => {
                console.log(error);
            });
    }


    // close popup
    const closePop = () => {
        setOpenPop(false);
    }
    
    // open popup
    const openPopUp = (key) => {
        if (!userEmail) {
            toast.dismiss()
            toast.error('Please login to view!', {
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
            setCurrentPop(key);
            console.log(currentPop);
            setOpenPop(true);
        }
    }


    // open submit profile popup
    const handleOpenSubmitProfile = () => {
        if (userRole === 'provider') {
            toast.dismiss()
            toast.error('You can only apply to jobs as a Seeker!', {
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
        } else if (!gotProfile) {
            const requestedOptions = {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
            }
    
            const route = `https://jiffyjobs-api-production.up.railway.app/api/users/getinfo/${userEmail}/${userRole}`;
            fetch(route, requestedOptions)
            .then(async (response) => {
                const res = await response.json()
                if (!response.ok) {
                    throw new Error(res.message);
                }
                return res;
            })
            .then((data) => {
                const user = [data.personal_info.first_name, data.personal_info.last_name, data.personal_info.school, data.personal_info.major, data.personal_info.grade, data.personal_info.personal_statement[0]];
                setProfile(user);
                setOpenSubmitProfile(true);
                setGotProfile(true);
            })
        } else {
            setOpenSubmitProfile(true);
        }
    };



    const handleSubmitProfile = () => {
        const user = {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                seeker_email: userEmail,
                job_id: currentPop[0][0]
            })
        }

        const route = "https://jiffyjobs-api-production.up.railway.app/api/users/apply";
        fetch(route, user)
        .then(async (response) => {
            const res = await response.json()
            if (!response.ok) {
                throw new Error(res.message);
            } 
            return res;
        })
        .then((data) => {
            handleCloseSubmitProfile();
            setOpenCongratsPopup(true);
        })
        .catch((error) => {
            const err = error.message;
            if (err.startsWith('Error: ')) {
                alert(err.slice(7));
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
                    theme: "light"
                });
            } else {
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
                    theme: "light"
                });
            }
        });

    };


    // close submit profile popup
    const handleCloseSubmitProfile = () => {
        setOpenSubmitProfile(false);
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
                        return [obj.title, obj.job_poster, obj.location, obj.pay, obj.description, dayjs(new Date(obj.time[0])).format('MM/DD/YY h:mm A')  + " " + " - " + dayjs(new Date(obj.time[1])).format('h:mm A'), obj.categories.toString(), obj.status, obj._id]
                    });
                    setStatusData(newJobData)
                    setPrevSize(newJobData.length)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        if (prevSize !== statusData.length || prevSize === 0) {
            getJobs()
        }
    }, [statusData]);

    return (
        <div>
            <div className='header-one'>
                Saved
            </div>
            <div className='header-two'>
                View all the jobs you saved!
            </div>
            <Box className='progress-box'>
                <Grid container className='progress-grid' rowSpacing={3} columnSpacing={3} width='70vw' style={{paddingBottom: '1%'}}>
                    {statusData.map((key) => {
                        return ( 
                            <Grid key={key} item> 
                                <Card sx={{width: '264px', height: '264px'}} elevation={8} square={false} style={{overflow:'hidden', borderRadius: '15px'}}>
                                    <div className='overall-card'>
                                        <CardMedia
                                            component="img"
                                            alt="placeholder"
                                            height="99px"
                                            image={randomImage(key[6][1].split(",")[0])}
                                        />
                                        <div style={{position: 'absolute', maxWidth: '100%', top: '30%', left: '90%', textAlign: 'center', transform: 'translate(-50%, -50%)', whiteSpace: 'nowrap', cursor: "pointer"}} onClick={() => {savedJobs(key[8])}}>
                                            <StarRoundedIcon
                                                style={{ width: '40px', height: '40px', color: '#4A4FE4'}}
                                            />
                                        </div>
                                    </div>
                                    <div className='overall-card'>
                                        <div style={{height: '200px'}}>
                                            <Typography style={{fontFamily: 'Outfit', fontSize:"14px", paddingLeft:'16px', paddingRight:'10px', paddingTop:'10px'}}>
                                                <u>{key[0][1]}</u>
                                            </Typography>
                                            <Typography style={{fontFamily: 'Outfit', fontSize:"12px", paddingLeft:'16px', paddingRight:'10px', paddingTop:'15px'}}>
                                                Pay: ${key[3][1]}
                                            </Typography>
                                            <Typography style={{fontFamily: 'Outfit', fontSize:"12px", paddingLeft:'16px', paddingRight:'10px'}}>
                                                Location: <u>{key[2][1]}</u>
                                            </Typography>
                                            <Typography style={{fontFamily: 'Outfit', fontSize:"12px", paddingLeft:'16px', paddingRight:'10px'}}>
                                                Time: {key[5][1]}
                                            </Typography>
                                            <Typography style={{fontFamily: 'Outfit', fontSize:"12px", paddingLeft: '16px', paddingRight:'10px', position:'relative', overflow:'hidden', textOverflow:'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, lineHeight: '1.1', height: '26px'}}>
                                                Description: {key[4][1]}
                                            </Typography>
                                        </div>
                                    </div>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
            {openSubmitProfile && (<SubmitProfilePopup open={openSubmitProfile} onClose={handleCloseSubmitProfile} onSubmit={handleSubmitProfile} profile={profile}/>)}
            {openCongratsPopup && (<CongratsPopup open={openCongratsPopup} onClose={() => setOpenCongratsPopup(false)} />)}
            {openPop && (<JobPopup open={openPop} onClose={closePop} openPopUp={openPopUp} currentPop={currentPop} openSubmitProfile={openSubmitProfile} openCongratsPopup={openCongratsPopup} openSubmit={handleOpenSubmitProfile} />)}
        </div>
    )
}