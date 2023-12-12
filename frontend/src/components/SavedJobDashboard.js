import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';
import { Box, Card, Grid, CardMedia, Typography, Button} from '@mui/material'
import dayjs from 'dayjs';
import { JobPopup } from './JobPopup';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { SubmitProfilePopup } from './SubmitPopup';
import reject from '../images/Reject.png';
import { CongratsPopup } from './CongratsPopup';

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

    const goToJobBoard = () => {
        navigate('/jobboard');
    }

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

    // for link navigation
    const navigate = useNavigate();

    const handleToDashboard = () => {
        setOpenCongratsPopup(false); 
        setOpenPop(false); 
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
                        return [[obj._id, obj.title], [randomImage(obj.categories.toString().split(",")[0]), obj.job_poster], ["", obj.location], ["", obj.pay], ["", obj.description], ["", dayjs(new Date(obj.time[0])).format('MM/DD/YY h:mm A')  + " " + " - " + dayjs(new Date(obj.time[1])).format('h:mm A')], ["", obj.categories.toString()]]
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
            {statusData.length > 0 ? (
                <Grid container className='progress-grid' rowSpacing={3} columnSpacing={3} width='70vw' style={{paddingBottom: '1%'}}>
                    {statusData.map((key) => {
                        return ( 
                            <Grid key={key} item> 
                                <Card sx={{width: '264px', height: '264px'}} elevation={8} square={false} style={{overflow:'hidden', borderRadius: '15px'}} onClick={() => openPopUp(key)}>
                                    <div className='overall-card'>
                                        <CardMedia
                                            component="img"
                                            alt="placeholder"
                                            height="99px"
                                            image={randomImage(key[6][1].split(",")[0])}
                                        />
                                        <div style={{position: 'absolute', maxWidth: '100%', top: '30%', left: '90%', textAlign: 'center', transform: 'translate(-50%, -50%)', whiteSpace: 'nowrap', cursor: "pointer"}}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                savedJobs(key[8]);
                                            }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                                <path d="M24.1636 7.4292L25.2399 10.6907C25.7262 12.2003 27.1274 13.2266 28.7134 13.2347H32.1054C33.6962 13.2246 35.1107 14.2452 35.6026 15.7581C36.0944 17.271 35.5506 18.9283 34.258 19.8557L31.4694 21.8778C30.1857 22.8097 29.6463 24.461 30.1322 25.971L31.2085 29.2326C31.7408 30.7478 31.2211 32.4329 29.9278 33.3851C28.6346 34.3373 26.8711 34.3331 25.5823 33.3747L22.8427 31.3363C21.5584 30.4059 19.8217 30.4059 18.5374 31.3363L15.7977 33.3747C14.5162 34.3127 12.7754 34.3152 11.4912 33.3809C10.207 32.4466 9.67356 30.7895 10.1716 29.2815L11.2479 26.02C11.7338 24.5099 11.1943 22.8587 9.91065 21.9267L7.0568 19.872C5.738 18.9427 5.18497 17.2583 5.69627 15.7282C6.20758 14.198 7.66211 13.1845 9.27465 13.2347H12.6667C14.2439 13.2312 15.6425 12.2201 16.1402 10.7234L17.2165 7.46182C17.699 5.95533 19.0963 4.93058 20.6782 4.92315C22.26 4.91573 23.6669 5.92731 24.1636 7.4292Z" fill="#4A4FE4"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className='overall-card'>
                                        <div style={{height: '200px'}}>
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
                                    </div>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '10vh', width:'65vw' }}>
                        <div style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'Outfit' }}>
                            Currently you have not saved any jobs.
                        </div>
                        <Button variant="contained" style={{ width: '200px', height: '34px', backgroundColor: '#4A4FE4', color: 'white', marginTop: '20px', fontSize: '14px', fontFamily: 'Outfit', fontWeight: 400, padding: '13px 18px', borderRadius: '8px'}} onClick={goToJobBoard}>
                            <span style={{textTransform:'none'}}>Find a Job to Save</span>
                        </Button>
                    </div>
                )}
            </Box>
            {openSubmitProfile && (<SubmitProfilePopup open={openSubmitProfile} onClose={handleCloseSubmitProfile} onSubmit={handleSubmitProfile} profile={profile}/>)}
            {openCongratsPopup && (<CongratsPopup open={openCongratsPopup} onClose={() => setOpenCongratsPopup(false)} dashboard={handleToDashboard} apply={() => navigate('/jobboard')}/>)}
            {openPop && (<JobPopup open={openPop} onClose={closePop} openPopUp={openPopUp} currentPop={currentPop} openSubmitProfile={openSubmitProfile} openCongratsPopup={openCongratsPopup} openSubmit={handleOpenSubmitProfile} />)}
        </div>
    )
}