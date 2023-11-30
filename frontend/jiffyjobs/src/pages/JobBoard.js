import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import ClearIcon from '@mui/icons-material/Clear';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Dialog, Divider, Typography, DialogContentText, DialogContent, 
        DialogActions, DialogTitle, Link, Button, Pagination, Grid, 
        CardContent, Card, Box, IconButton, Chip, TextField, Avatar,
        Stack,  } from '@mui/material';

import dayjs from 'dayjs';

import { Filter } from '../components/Filter';
import { Sort } from '../components/Sort';
import { JobPosting } from '../components/JobPosting';
import { JobCards } from '../components/JobCards';
import { CongratsPopup } from '../components/CongratsPopup';



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

    const [ userEmail, setEmail ] = useState(localStorage.getItem("email"));
    const [ userRole, setUserRole ] = useState(localStorage.getItem("user"));

    const navigate = useNavigate();


    const handleToDashboard = () => {
        navigate('/dashboard');
    };
  
    function processTime(time) {
        var str = "Time: "
        for (let i = 0; i < time.length; i++) {
            if (i%2 === 0) {
                str = str + dayjs(new Date(time[i])).format('MM/DD/YY h:mm A') + " - "
            } else {
                str = str + dayjs(new Date(time[i])).format('h:mm A') + "\n"
            }
        }

        return str
    }

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
                    savedStatus[job.id] = false; // Replace 'job.id' with your unique job identifier
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

    function truncate(str) {
        return str.length > 80 ? str.substring(0, 77) + "..." : str;
    }

    const closePop = () => {
        setOpenPop(false);
    }
    
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

    function handleLogJobData() {
        console.log('Data', jobData)
        console.log('Raw', rawData)
        console.log('Job Saved', isJobSaved)
    }

    useEffect(()=> {
        console.log(userEmail);
        console.log(userRole);
    })

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
            })
            setOpenSubmitProfile(true);
            setGotProfile(true);
        } else {
            setOpenSubmitProfile(true);
        }
    };

    // close submit profile popup
    const handleCloseSubmitProfile = () => {
        setOpenSubmitProfile(false);
    };

    // submit profile popup
    function SubmitProfilePopup({ open, onClose, onSubmit }) {
        return (
            <Dialog open={open} onClose={onClose} maxWidth={"xl"} PaperProps={{ sx: { borderRadius: "15px", margin: 'auto', width: '500px' } }}>
                <DialogTitle sx={{ textAlign: 'center', fontFamily: 'Outfit', marginTop: 2, }}>Are you sure you want to submit?</DialogTitle>
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px', margin: 'auto', border: '2px dashed #ccc', borderRadius: '5px', maxWidth: 'calc(100% - 150px)' }}>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" style={{ paddingBottom: 4, paddingTop: 20, marginRight: '60px'}} >
                            <Avatar sx={{ bgcolor: '#D9D9D9', width: 45, height: 45, color: 'black', fontSize: '25px'}}>{profile[0] && profile[0].length > 0 && profile[0][0]}{profile[1] && profile[1].length > 0 && profile[1][0]}</Avatar>
                            <Typography variant="subtitle1" style={{ fontFamily: 'Outfit', fontSize: '20px', fontWeight: 'bold' }}>
                                {profile[0] && profile[0].length > 0 && profile[0]} {profile[1] && profile[1].length > 0 && profile[1]}
                            </Typography>
                        </Stack>
                        <form noValidate autoComplete="off" style={{ width: '100%' }}>
                            <Grid container alignItems="center" justifyContent="center" style={{ width: '100%' }}>
                                <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 8 }}>
                                    <Typography variant="subtitle1" align="right" style={{ fontFamily: 'Outfit', color: '#A4A4A4'}}>School<span style={{"color": "red"}}>*</span></Typography>
                                </Grid>
                                <Grid item xs={7} style={{ padding: 8 }}>
                                    <TextField disabled defaultValue={profile[2] && profile[2].length > 0 && profile[2]} variant="outlined" size="small" className="inputSubmit" style={{ width: '200px' }}
                                    InputProps={{ style: { textAlign: 'center',  fontFamily: 'Outfit', fontSize: '14px' }}}/>
                                </Grid>
                                <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 8 }}>
                                    <Typography variant="subtitle1" align="right" style={{ fontFamily: 'Outfit', color: '#A4A4A4' }}>Major</Typography>
                                </Grid>
                                <Grid item xs={7} style={{ padding: 8 }}>
                                    <TextField disabled defaultValue={(profile[3] && profile[3].length > 0) ? profile[3][0] : ''} variant="outlined" size="small" style={{ width: '200px' }}
                                    InputProps={{ style: { textAlign: 'center',  fontFamily: 'Outfit', fontSize: '14px' }}}/>
                                </Grid>
                                <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 8 }}>
                                    <Typography variant="subtitle1" align="right" style={{ fontFamily: 'Outfit', color: '#A4A4A4' }}>Grade</Typography>
                                </Grid>
                                <Grid item xs={7} style={{ padding: 8 }}>
                                    <TextField disabled defaultValue={(profile[4] && profile[4].length > 0) ? profile[4] : ''} variant="outlined" size="small" style={{ width: '200px' }}
                                    InputProps={{ style: { textAlign: 'center',  fontFamily: 'Outfit', fontSize: '14px' }}}/>
                                </Grid>
                                <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 8 }}>
                                    <Typography variant="subtitle1" align="right" style={{ fontFamily: 'Outfit', color: '#A4A4A4' }}>Email<span style={{"color": "red"}}>*</span></Typography>
                                </Grid>
                                <Grid item xs={7} style={{ padding: 8 }}>
                                    <TextField disabled defaultValue={userEmail} variant="outlined" size="small" className="inputSubmit" style={{ width: '200px' }}
                                    InputProps={{style: { textAlign: 'center',  fontFamily: 'Outfit', fontSize: '14px' }}}/>
                                </Grid>
                                <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 8 }}>
                                    <Typography diabled variant="subtitle1" align="right" style={{ fontFamily: 'Outfit', color: '#A4A4A4' }}>Bio</Typography>
                                </Grid>
                                <Grid item xs={7} style={{ paddingRight: 8, paddingTop: 8, paddingLeft: 8 }}>
                                    <TextField disabled defaultValue={(profile[5] && profile[5].length > 5) ? profile[5] : ''} variant="outlined" multiline rows={6} size="small" style={{ width: '200px' }}
                                    InputProps={{style: { textAlign: 'center',  fontFamily: 'Outfit', fontSize: '14px', }}} />
                                </Grid>
                            </Grid>
                        </form>            
                    </DialogContent>
                    <Divider style={{ width: '100%', marginTop: '25px',  height: '4px' }} />
                <DialogActions sx={{ marginRight: '15px' }}>
                    <Button onClick={onClose} sx={{ border: '1px solid #5B5B5B', borderRadius: '8px', padding: '6px 12px', fontFamily: 'Outfit', textTransform: 'none', color: '#5B5B5B' }}>
                        Cancel
                    </Button>
                    <Button onClick={onSubmit} sx={{ border: '1px solid #D9D9D9', borderRadius: '8px', padding: '6px 12px', fontFamily: 'Outfit', textTransform: 'none', color: '#5B5B5B', backgroundColor: '#D9D9D9', '&:hover': {backgroundColor: '#D9D9D9'}}}>
                        Submit Profile
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

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


    // close popups
    const handleApplyMore = () => {
        setOpenCongratsPopup(false); 
        setOpenPop(false); 
    };

    // toggle save job
    const toggleSaveJob = (jobDetails) => {
        setIsJobSaved(prevState => {
            const currentJobs = prevState[0] || [];
            const updatedJobs = [...currentJobs, jobDetails];
            return {
                ...prevState,
                0: updatedJobs
            };
        });
    
        setShowSavedMessage(true);
        setTimeout(() => setShowSavedMessage(false), 1000);

        const save = {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: userEmail,
                job_id: jobDetails
            })
        }

        const route = "https://jiffyjobs-api-production.up.railway.app/api/users/save";
        fetch(route, save)
        .then(async (response) => {
            const res = await response.json()
            if (!response.ok) {
                throw new Error(res.message);
            } 
            return res;
        })
        .then((data) => {
            console.log(data);
        }).catch((error) => {
            console.log(error);
        });
        console.log(jobDetails)
    };
    
    return (
        <div className={`outerCard2 ${openPop ? 'blur-background' : ''}`}>
            <Dialog open={openPop} onClose={closePop} className={`${openSubmitProfile || openCongratsPopup ? 'blur-effect' : ''}`} maxWidth={"1000px"} PaperProps={{sx: { borderRadius: "15px"}}}>
                <div style={{ position: 'relative'}}>
                    <img
                        style={{ width: '100%', maxHeight: '30vh'}}
                        src={currentPop[1] && currentPop[1].length > 1 && currentPop[1][0]}
                        alt="placeholder"
                    />
                </div>
                <IconButton onClick={closePop} style={{position: 'absolute', right:'0', top:'0'}}>
                    <ClearIcon/>
                </IconButton>        
                <DialogContent style={{paddingTop:'0.5%', paddingBottom: '1%'}}>
                    <DialogContentText ref={descriptionElementRefStartPop} tabIndex={-1} style={{width: '750px'}}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <Typography style={{fontFamily: 'Outfit', fontSize:'24px', color:'#000', fontWeight:'600', paddingLeft:'1%'}}>
                                    {currentPop[0] && currentPop[0].length > 1 && currentPop[0][1]}
                                </Typography>
                                <div style={{ display: 'inline-block', position: 'relative' }}>
                                    <IconButton onClick={() => toggleSaveJob(currentPop[0][0])} style={{ borderRadius: '10px' }}>
                                        {isJobSaved[currentPop] ? 
                                            <StarIcon style={{ color: '#A4A4A4' }} /> : 
                                            <StarBorderIcon style={{ color: '#A4A4A4' }} />}
                                    </IconButton>
                                    {showSavedMessage && <div style={{ position: 'absolute', bottom: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '12px', fontFamily: 'Outfit', textAlign: 'center' }}>
                                    {isJobSaved ? 'Job Saved' : 'Job Unsaved'}
                                    </div>}
                                </div>
                            </div>
                            <Typography style={{fontFamily: 'Outfit', fontSize:'20px', color:'#141414', fontWeight: '500', paddingLeft:'1%'}}>
                                {currentPop[1] && currentPop[1].length > 1 && currentPop[1][1]}
                            </Typography>
                        </div>
                        <div style={{paddingTop: '0.75%'}}>
                            <Typography style={{fontFamily: 'Outfit', fontSize: '18px', color: '#141414', fontWeight: '600', paddingLeft:'1%'}}>
                                Job Information
                            </Typography>
                        </div>
                        <div style={{paddingTop: '1%', paddingLeft:'3%', paddingBottom: '1%'}}>
                            <div style={{display: 'inline-block', width: '98px'}}>
                                <Typography style={{fontFamily: 'Outfit', fontSize:'14px', color:'#5B5B5B', fontWeight:'400'}}>
                                    Pay
                                </Typography>
                                <Typography style={{fontFamily: 'Outfit', fontSize:'14px', color:'#5B5B5B', fontWeight:'400'}}>
                                    Location
                                </Typography>
                                <Typography style={{fontFamily: 'Outfit', fontSize:'14px', color:'#5B5B5B', fontWeight:'400'}}>
                                    Time
                                </Typography>
                            </div>
                            <div style={{display: 'inline-block'}}>
                                <Typography style={{fontFamily:'Outfit', fontSize: '14px', color:'#141414', fontWeight: '600'}}>
                                    ${currentPop[3] && currentPop[3].length > 1 && currentPop[3][1]}
                                </Typography>
                                <Typography style={{fontFamily:'Outfit', fontSize: '14px', color:'#141414', fontWeight: '600'}}>
                                    <u>{currentPop[2] && currentPop[2].length > 1 && currentPop[2][1]}</u>
                                </Typography>
                                <Typography style={{fontFamily:'Outfit', fontSize: '14px', color:'#141414', fontWeight: '600'}}>
                                    {currentPop[5] && currentPop[5].length > 1 && currentPop[5][1]}
                                </Typography>
                            </div>
                        </div>
                        <Divider style={{width: '100%', borderBottomWidth: '2px'}}/>
                        <div style={{paddingTop: '1%', paddingLeft: '1%'}}>
                            <Typography style={{fontFamily: 'Outfit', fontSize: '18px', color:'#141414', fontWeight: '600'}}>
                                Job Description
                            </Typography>
                        </div>
                        <div style={{padding: '1%', paddingLeft: '3%'}}>
                            <Typography style={{fontFamily: 'Outfit', fontSize: '14px', color:'#5B5B5B', fontWeight: '400'}}>
                                {currentPop[4] && currentPop[4].length > 1 && currentPop[4][1]}
                            </Typography>
                        </div>
                        <div>
                            {currentPop[6] && currentPop[6].length > 1 && currentPop[6][1].split(",").filter((item) => item.trim() !== "").length > 0 ? (
                                currentPop[6][1]
                                    .split(",")
                                    .filter((item) => item.trim() !== "")
                                    .map((item, index) => (
                                        <Chip
                                            key={index}
                                            label={item.trim()}
                                            variant="outlined"
                                            style={{
                                                margin: "5px",
                                                fontFamily: "Outfit",
                                                fontSize: "14px",
                                                color: '#5B5B5B',
                                                fontWeight: "400",
                                                height: "28px",
                                            }}
                                        />
                                    ))
                            ) : (
                                <Chip
                                    label=""
                                    variant="outlined"
                                    style={{
                                        visibility: "hidden",
                                        margin: "5px"
                                    }}
                                />
                            )}
                        </div>
                    </DialogContentText>
                </DialogContent>
                <Divider style={{borderBottomWidth: '2px'}}/>
                    <DialogActions style={{ justifyContent: 'center' }}>
                        <Link style={{cursor:'pointer'}} underline='none' onClick={handleOpenSubmitProfile}>
                            <Card sx={{height: 40, width: '100%'}} style={{overflow:'hidden', borderRadius: '15px', background: "#D9D9D9", color: 'white'}}>
                            <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '3%' }}>
                                <Button onClick={handleOpenSubmitProfile} style={{ textTransform: 'none', width: '100%' }}>
                                    <Typography style={{ fontFamily: 'Outfit', fontSize: '19.2px', color: '#5B5B5B', fontWeight: '400', marginTop: '-4px' }}>
                                        Submit Profile
                                    </Typography>
                                </Button>
                            </CardContent>
                            </Card>
                        </Link>
                    </DialogActions>
            </Dialog>
            <JobPosting/> 
            <Box className='job-table-box'>
                <div className='job-table-inner' style={{ paddingTop: '50px', width: '1116px'}}>
                    <Typography style={{fontFamily: 'Outfit', fontSize: '18px', justifyContent: 'center', alignItems: 'center', textAlign: 'start'}}>
                        Job Board 
                    </Typography>
                </div>
            </Box>
            <Box className='job-table-box'>
                <div style={{display: 'grid', justifyContent: 'center', alignItems: 'center'}}>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                        { render }
                        <div>
                            <Sort rawData={rawData} setRawData={setRawData} setJobData={setJobData} />
                        </div>
                    </div>
                    <Divider width='1116px'/>
                </div>
                {/* <button onClick={handleLogJobData}>Log Job Data</button> */}
            </Box>
            <JobCards jobData={jobData} page={page} cardsPerPage={cardsPerPage} openPopUp={openPopUp}/>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '1%', background: '#f3f3f3' }}>
                <Pagination count={totalPages} page={page} onChange={(event, value) => setPage(value)} />
            </div>
            {openSubmitProfile && (<SubmitProfilePopup open={openSubmitProfile} onClose={handleCloseSubmitProfile} onSubmit={handleSubmitProfile}/>)}
            {openCongratsPopup && (<CongratsPopup open={openCongratsPopup} onClose={() => setOpenCongratsPopup(false)} onDashboardRedirect={handleToDashboard}/>)}
        </div>
    )
}