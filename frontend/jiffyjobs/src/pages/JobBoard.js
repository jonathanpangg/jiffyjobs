import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import ClearIcon from '@mui/icons-material/Clear';
import StarBorderRounded from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from "@mui/icons-material/StarRounded"
import { Dialog, Divider, Typography, DialogContentText, DialogContent, 
        DialogActions, DialogTitle, Link, Button, Pagination, Grid, 
        CardContent, Card, Box, IconButton, Chip, TextField, Avatar,
        Stack, CardMedia } from '@mui/material';

import dayjs from 'dayjs';

import { Filter } from '../components/Filter';
import { Sort } from '../components/Sort';
import { JobPosting } from '../components/JobPosting';
import { JobCards } from '../components/JobCards';
import { CongratsPopup } from '../components/CongratsPopup';
import { SubmitProfilePopup } from '../components/SubmitPopup';

export function JobBoard() {
    const [jobData, setJobData] = useState([])
    const [rawData, setRawData] = useState([]);
    const [size, setSize] = useState(0)
    const [background, setBackground] = useState("")
    const { render, filterList } = Filter()
    const [openPop, setOpenPop] = useState(false)
    const [currentPop, setCurrentPop] = useState([])
    const [profile, setProfile] = useState([])
    const [gotProfile, setGotProfile] = useState(false);

    const [page, setPage] = useState(1);
    const cardsPerPage = 20;
    const totalCards = jobData.length;
    const totalPages = Math.ceil(totalCards / cardsPerPage);

    const [openSubmitProfile, setOpenSubmitProfile] = useState(false);
    const [openCongratsPopup, setOpenCongratsPopup] = useState(false);

    const [isJobSaved, setIsJobSaved] = useState({});
    const [showSavedMessage, setShowSavedMessage] = useState(false);

    const [ userEmail, setUserEmail ] = useState(localStorage.getItem("email"));
    const [ userRole, setUserRole ] = useState(localStorage.getItem("user"));

    const [savedJobs, setSavedJobs] = useState([]) 
    const [jobSaved, setJobSaved] = useState(false)

    const navigate = useNavigate();

    // whenever user clicks the search button, gets directed to here
    const handleJobPostingData = (data) => {
        if (!data) {
            data = " ";
        }
        const route = `http://localhost:4000/api/jobs/search/${data}/prop`;
        fetch(route)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setRawData(data);
                const newJobData = data.map(function(obj) {
                    return [[obj._id, obj.title], [randomImage(obj.categories.toString().split(",")[0]), obj.job_poster], ["", obj.location], ["", obj.pay], ["", obj.description], ["", dayjs(new Date(obj.time[0])).format('MM/DD/YY h:mm A')  + " " + " - " + dayjs(new Date(obj.time[1])).format('h:mm A')], ["", obj.categories.toString()]]
                });
                setJobData(newJobData);
                setSize(jobData.length)

                if (size <= 4) {
                    setBackground("1")
                } else {
                    setBackground("")
                }

                const savedStatus = {};
             data.forEach(job => {
                 savedStatus[job.id] = false; 
             });
            setIsJobSaved(savedStatus);
            })
            .catch((error) => {
                console.log(error)
            })
    };

    // go to dashboard
    const handleToDashboard = () => {
        navigate('/dashboard');
    };

    // random image for category
    const randomImage = (seed) => {
        return `https://source.unsplash.com/random?${seed}`;
    };


    // handles getting all jobs
    useEffect(() => {
        async function GetAllJobs() {
            const route = "https://jiffyjobs-api-production.up.railway.app/api/jobs/get"
            fetch(route)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    const sortedData = data.sort((a, b) => {
                        const startTimeA = dayjs(a.time[0]);
                        const startTimeB = dayjs(b.time[0]);
                        
                        if (!startTimeA.isValid()) return 1;
                        if (!startTimeB.isValid()) return -1;
                        
                        return startTimeA.isAfter(startTimeB) ? 1 : -1;
                    });
                    
                    setRawData(data);
                    const newJobData = data.map(function(obj) {
                        console.log(obj.time)
                        return [[obj._id, obj.title], [randomImage(obj.categories.toString().split(",")[0]), obj.job_poster], ["", obj.location], ["", obj.pay], ["", obj.description], ["", dayjs(new Date(obj.time[0])).format('MM/DD/YY h:mm A')  + " " + " - " + dayjs(new Date(obj.time[1])).format('h:mm A')], ["", obj.categories.toString()]]
                    });
                    setJobData(newJobData);

                    const newSize = newJobData.length;
                    setSize(newSize);

                    if (newSize <= 4) {
                        setBackground("1")
                    } else {
                        setBackground("")
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        if (filterList.size === 0) {
            GetAllJobs()
        }
    }, [filterList]);
    

    // handles filtering job
    useEffect(() => {
        console.log(filterList)
        async function FilterJobs() {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
            var route = "https://jiffyjobs-api-production.up.railway.app/api/jobs/filter"
            var query = "/*/*/" + Array.from(filterList) + "/*/*"
            console.log(query)
            route = route + query
            console.log(route)
            fetch(route, requestOptions)
                .then((response) => {
                    if (!response.ok) { 
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    setRawData(data);
                    const newJobData = data.map(function(obj) {
                        return [[obj._id, obj.title], [randomImage(obj.categories.toString().split(",")[0]), obj.job_poster], ["", obj.location], ["", obj.pay], ["", obj.description], ["", dayjs(new Date(obj.time[0])).format('MM/DD/YY h:mm A')  + " " + " - " + dayjs(new Date(obj.time[1])).format('h:mm A')], ["", obj.categories.toString()]]
                    });
                    setJobData(newJobData);
                    setSize(jobData.length)

                    if (size <= 4) {
                        setBackground("1")
                    } else {
                        setBackground("")
                    }

                    const savedStatus = {};
                 data.forEach(job => {
                     savedStatus[job.id] = false; 
                 });
                setIsJobSaved(savedStatus);
                })
                .catch((error) => {
                    console.log(error)
                }
            )
        }
        
        if (filterList.size !== 0) {
            setJobData([])
            FilterJobs()
        }

    }, [filterList])

    // close popup
    const closePop = () => {
        setOpenPop(false);
    }
    
    // open popup
    const openPopUp = (key) => {
        setCurrentPop(key);
        console.log(currentPop);
        if (!userEmail) {
            toast.dismiss()
            console.log("here")
            toast.error('Please login to view!', {
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
            setOpenPop(true);
        }
    }

    const descriptionElementRefStartPop = React.useRef(null)
    useEffect(() => {
        if (openPopUp) {
            const { current: descriptionElement } = descriptionElementRefStartPop
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [openPopUp])

    // open submit profile popup
    const handleOpenSubmitProfile = () => {
        if (userRole === 'provider') {
            toast.dismiss()
            toast.error('You can only apply as a Seeker!', {
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
                console.log(profile);
                setOpenSubmitProfile(true);
                setGotProfile(true);
            })
        } else {
            setOpenSubmitProfile(true);
        }
    };

    // close submit profile popup
    const handleCloseSubmitProfile = () => {
        setOpenSubmitProfile(false);
    };

    const handleSubmitProfile = () => {
        handleCloseSubmitProfile();
        setOpenCongratsPopup(true);
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
            console.log(data);
        })
        .catch((error) => {
            const err = error.message;
            if (err.startsWith('Error: ')) {
                alert(err.slice(7));
                toast.error(err.slice(7), {
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

    // toggle save job
    const toggleSaveJob = async (jobDetails) => {
    
        // setShowSavedMessage(true);
        // setTimeout(() => setShowSavedMessage(false), 1000);
        if (userRole === "provider") {
            toast.dismiss()
            toast.error('You can only save jobs as a Seeker!', {
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
            const save = {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: userEmail,
                    job_id: jobDetails
                })
            }

            const route = "https://jiffyjobs-api-production.up.railway.app/api/users/save";
            await fetch(route, save)
            .then(async (response) => {
                const res = await response.json()
                if (!response.ok) {
                    throw new Error(res.message);
                } 
                return res;
            })
            .then(async (data) => {
                await getJobs();
                await setJobSaved(savedJobs.includes(jobDetails));
                setIsJobSaved(prevState => ({
                    ...prevState,
                    [jobDetails]: !prevState[jobDetails] 
                }));


                setShowSavedMessage(true);
                setTimeout(() => setShowSavedMessage(false), 1000);

                console.log("here");
            }).catch((error) => {
                console.log(error);
            });
            console.log(jobDetails)
        }
    };

    async function getJobs() {
        const route = `https://jiffyjobs-api-production.up.railway.app/api/users/saved/${userEmail}`

        fetch(route)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const newJobData = data.map(function(obj) {
                    return obj._id
                });
                setSavedJobs(newJobData);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        if (userEmail) {
            getJobs();
        }
    }, [userEmail]);

    
    return (
        <div className={`outerCard2 ${openPop ? 'blur-background' : ''}`}>
            <Dialog open={openPop} onClose={closePop} className={`${openSubmitProfile || openCongratsPopup ? 'blur-effect' : ''}`} maxWidth={'680px'} PaperProps={{sx: { borderRadius: "10.4px", height: '650px'}}}>
                <div style={{ position: 'relative'}}>
                    <CardMedia
                        component="img"
                        style={{ width: '750px', maxHeight: '195px',}}
                        image={currentPop[1] && currentPop[1].length > 1 && currentPop[1][0]}
                        alt="placeholder"
                    />
                </div>
                <IconButton onClick={closePop} style={{position: 'absolute', right:'0', top:'0'}}>
                    <ClearIcon/>
                </IconButton>        
                <DialogContent style={{display: 'flex', flexDirection: 'column', paddingLeft: '29.02px', paddingRight: '34.55px', paddingTop: '20.01px',  }}>
                    <DialogContentText ref={descriptionElementRefStartPop} tabIndex={-1} style={{width: '680px'}}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <Typography style={{fontFamily: 'Outfit', fontSize:'22.114px', color:'#000', fontWeight:'600',  paddingLeft: '8.3px', paddinggTop: '10px'}}>
                                    {currentPop[0] && currentPop[0].length > 1 && currentPop[0][1]}
                                </Typography>
                                <div style={{ display: 'inline-block', position: 'relative' }}>
                                    <IconButton onClick={() => toggleSaveJob(currentPop[0][0])} style={{ borderRadius: '10px' }}>
                                        {savedJobs.includes(currentPop[0] && currentPop[0].length > 1 && currentPop[0][0]) ? 
                                            <StarRoundedIcon style={{ width: '27.046px', height: '27.046px', color: '#A4A4A4' }} /> : 
                                            <StarBorderRounded style={{ width: '27.046px', height: '27.046px', color: '#A4A4A4' }} />}
                                    </IconButton>
                                    {showSavedMessage && <div style={{ position: 'absolute', bottom: '-18px', left: '50%', transform: 'translateX(-50%)', fontSize: '10px', fontFamily: 'Outfit', fontWeight: 500, textAlign: 'center' }}>
                                    {jobSaved ? 'Job Unsaved' : 'Job Saved'}
                                    </div>}
                                </div>
                            </div>
                            <Typography style={{fontFamily: 'Outfit', fontSize:'16.585px', color:'#141414', fontWeight: '500', paddingLeft: '8.3px', marginTop: '-5.57px'}}>
                                {currentPop[1] && currentPop[1].length > 1 && currentPop[1][1]}
                            </Typography>
                        </div>
                        <div style={{marginTop: '17.7px'}}>
                            <Typography style={{fontFamily: 'Outfit', fontSize: '13.821px', color: '#141414', fontWeight: '600', paddingLeft:'8.3px'}}>
                                Job Information
                            </Typography>
                        </div>
                        <div style={{paddingTop: '11.41px', paddingLeft:'16.59px', paddingBottom: '17.93px', paddingRight: '15.9px'}}>
                            <div style={{display: 'inline-block', width: '98px'}}>
                                <Typography style={{fontFamily: 'Outfit', fontSize:'12.439px', color:'#5B5B5B', fontWeight:'400'}}>
                                    Pay
                                </Typography>
                                <Typography style={{fontFamily: 'Outfit', fontSize:'12.439px', color:'#5B5B5B', fontWeight:'400'}}>
                                    Location
                                </Typography>
                                <Typography style={{fontFamily: 'Outfit', fontSize:'12.439px', color:'#5B5B5B', fontWeight:'400'}}>
                                    Time
                                </Typography>
                            </div>
                            <div style={{display: 'inline-block'}}>
                                <Typography style={{fontFamily:'Outfit', fontSize: '12.439px', color:'#141414', fontWeight: '600'}}>
                                    ${currentPop[3] && currentPop[3].length > 1 && currentPop[3][1]}
                                </Typography>
                                <Typography style={{fontFamily:'Outfit', fontSize: '12.439px', color:'#141414', fontWeight: '600'}}>
                                    <u>{currentPop[2] && currentPop[2].length > 1 && currentPop[2][1]}</u>
                                </Typography>
                                <Typography style={{fontFamily:'Outfit', fontSize: '12.439px', color:'#141414', fontWeight: '600'}}>
                                    {currentPop[5] && currentPop[5].length > 1 && currentPop[5][1]}
                                </Typography>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ width: '100%',}}>
                                <Divider/>
                                </div>
                        </div>
                        <div style={{paddingTop: '14.19px'}}>
                            <Typography style={{fontFamily: 'Outfit', fontSize: '13.821px', color:'#141414', fontWeight: '600', paddingLeft:'8.3px'}}>
                                Job Description
                            </Typography>
                        </div>
                        <div style={{marginBottom: '-100px', }}>
                        <div style={{ marginLeft: '16.59px', marginRight: '15.9px', width: '583', height: '78px', overflowY: 'auto', marginTop: '11.41px', marginBottom: '10.19px' }}>
                            <div style={{display: 'inline-block', }}>
                                <Typography style={{fontFamily: 'Outfit', fontSize: '12.439px', color:'#5B5B5B', fontWeight: '400'}}>
                                    {currentPop[4] && currentPop[4].length > 1 && currentPop[4][1]}
                                </Typography>
                            </div>
                        </div>
                         
                        <div style={{ flex: '0 0 auto', marginLeft: '12.59px', marginRight: '15.9px',  }}>
                            {currentPop[6] && currentPop[6].length > 1 && currentPop[6][1].split(",").filter((item) => item.trim() !== "").length > 0 ? (
                            currentPop[6][1]
                                .split(",")
                                .filter((item) => item.trim() !== "")
                                .map((item, index) => (
                                <Chip
                                    key={index}
                                    label={item.trim()}
                                    variant="outlined"
                                    style={{ margin: '2px', fontFamily: 'Outfit', fontSize: '10.439px', borderRadius: '10px', backgroundColor: '#D9D9D9', color: '#5B5B5B' }}
                                />
                                ))
                            ) : (
                            <Chip
                                label=""
                                variant="outlined"
                                style={{ visibility: "hidden", }}
                            />
                            )}
                        </div>
                        </div>
                        
                        </DialogContentText>
                        </DialogContent>
                    
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '6.58px' }}>
                            <div style={{ width: '100%', paddingRight: '34px', paddingLeft: '29.02px', marginTop: '6.58px' }}>
                                <Divider/>
                                </div>
                        </div>

                    <DialogActions style={{ justifyContent: 'center', marginBottom: '6.58px', marginTop: '6.58px' }}>
                        <Link style={{cursor:'pointer'}} underline='none'>
                            <Card sx={{height: 30, width: '100%'}} style={{overflow:'hidden', borderRadius: '6.63px', background: "#D9D9D9", color: 'white'}}>
                            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <Button onClick={handleOpenSubmitProfile} style={{ textTransform: 'none', width: '100%' }}>
                                    <Typography style={{ fontFamily: 'Outfit', fontSize: '13.268ppx', color: '#5B5B5B', fontWeight: '400', marginTop: '-18px' }}>
                                        Submit Profile
                                    </Typography>
                                </Button>
                            </CardContent>
                            </Card>
                        </Link>
                    </DialogActions>
            </Dialog>
            <JobPosting onJobDataSubmit={handleJobPostingData} /> 
            <Box className='job-table-box'>
                <div className='job-table-inner' style={{ paddingTop: '50px', width: '1136px'}}>
                    <Typography style={{fontFamily: 'Outfit', fontSize: '20px', justifyContent: 'center', alignItems: 'center', textAlign: 'start'}}>
                        Job Board 
                    </Typography>
                </div>
            </Box>
            <Box className='job-table-box'>
                <div style={{display: 'grid', justifyContent: 'center', alignItems: 'center',}}>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', width: '1136px', }}>
                        { render }
                        <div>
                            <Sort rawData={rawData} setRawData={setRawData} setJobData={setJobData} />
                        </div>
                    </div>
                    <Divider width='1136px'/>
                </div>
                {/* <button onClick={handleLogJobData}>Log Job Data</button> */}
            </Box>
            <JobCards jobData={jobData} page={page} cardsPerPage={cardsPerPage} openPopUp={openPopUp}/>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '1%', background: '#f3f3f3', fontFamily: 'Outfit', fontSize: '14px' }}>
                <Pagination count={totalPages} page={page} onChange={(event, value) => setPage(value)}  className="custom-pagination" />
            </div>
            {openSubmitProfile && (<SubmitProfilePopup open={openSubmitProfile} onClose={handleCloseSubmitProfile} onSubmit={handleSubmitProfile} profile={profile}/>)}
            {openCongratsPopup && (<CongratsPopup open={openCongratsPopup} onClose={() => setOpenCongratsPopup(false)} />)}
        </div>
    )
}