import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import { Dialog, Divider, Typography, DialogContentText, DialogContent, DialogActions, DialogTitle, Link, Button  } from '@mui/material';
import { Filter } from '../components/Filter';
import { Sort } from '../components/Sort';
import { JobPosting } from '../components/JobPosting';
import dayjs from 'dayjs';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SubmitProfilePopup from '../components/SubmitProfilePopup';
import JobCards from '../components/JobCards';


export function JobBoard() {
    const [jobData, setJobData] = useState([])
    const [rawData, setRawData] = useState([]);
    const [size, setSize] = useState(0)
    const [background, setBackground] = useState("")
    const { render, filterList } = Filter()
    const [openPop, setOpenPop] = useState(false)
    const [currentPop, setCurrentPop] = useState([])

    const [page, setPage] = useState(1);
    const cardsPerPage = 20;
    const totalCards = jobData.length;
    const totalPages = Math.ceil(totalCards / cardsPerPage);

    const [openSubmitProfile, setOpenSubmitProfile] = useState(false);
    const [openCongratsPopup, setOpenCongratsPopup] = useState(false);

    const [isJobSaved, setIsJobSaved] = useState({});
    const [showSavedMessage, setShowSavedMessage] = useState(false);

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

    // handles getting all jobs
    useEffect(() => {
        async function GetAllJobs() {
            const route = "http://localhost:4000/api/jobs/get"
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
                        return [[0, obj.title], ["", obj.job_poster], ["", obj.location], ["", obj.pay], ["", obj.description], ["", dayjs(new Date(obj.time[0])).format('MM/DD/YY h:mm A')  + " " + " - " + dayjs(new Date(obj.time[1])).format('h:mm A')], ["", obj.categories.toString()]]
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
            var route = "http://localhost:4000/api/jobs/filter"
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
                        return [[0, obj.title], ["", obj.job_poster], ["", obj.location], ["", obj.pay], ["", obj.description], ["", dayjs(new Date(obj.time[0])).format('MM/DD/YY h:mm A')  + " " + " - " + dayjs(new Date(obj.time[1])).format('h:mm A')], ["", obj.categories.toString()]]
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
        setOpenPop(true);
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
        console.log(jobData)
        console.log(rawData)
    }

    // open submit profile popup
    const handleOpenSubmitProfile = () => {
        setOpenSubmitProfile(true);
    };

    // close submit profile popup
    const handleCloseSubmitProfile = () => {
        setOpenSubmitProfile(false);
    };

    const handleSubmitProfile = () => {
        handleCloseSubmitProfile();
        setOpenCongratsPopup(true);
    };

    function CongratsPopup({ open, onClose}) {
        const handleClose = () => {
            onClose(); 
        };
        return (
            <Dialog open={open} onClose={onClose} maxWidth={"1000px"} PaperProps={{sx: { borderRadius: "15px"}}}>
                <DialogTitle>Congratulations!</DialogTitle>
                <DialogContent>
                    <Typography>Your profile has been successfully submitted.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleApplyMore}>Apply More</Button>
                    <Button onClick={handleToDashboard}>Go to Dashboard</Button>
                </DialogActions>
            </Dialog>
        );
    }

    // open job listing popup
    const openJobListingPopup = (key) => {
        setCurrentPop(key);
        setOpenPop(true); 
        console.log(currentPop);
    };

    // close popups
    const handleApplyMore = () => {
        setOpenCongratsPopup(false); 
        setOpenPop(false); 
    };

    // toggle save job
    const toggleSaveJob = (key) => {
        setIsJobSaved(prevState => {
            const newSavedStatus = !prevState[key];
            console.log(`Key: ${key} - Saved Status: ${newSavedStatus ? 'Saved' : 'Unsaved'}`);
            return {
                ...prevState,
                [key]: newSavedStatus
            };
        });
        setShowSavedMessage(true);
        setTimeout(() => setShowSavedMessage(false), 1000);
    };    
    
    
    return (
        <div className={`outerCard ${openPop ? 'blur-background' : ''}`}>
            <Dialog open={openPop} onClose={closePop} className={`${openSubmitProfile || openCongratsPopup ? 'blur-effect' : ''}`} maxWidth={"1000px"} PaperProps={{sx: { borderRadius: "15px"}}}>
                <div style={{ position: 'relative'}}>
                    <img
                        style={{ width: '100%', maxHeight: '30vh'}}
                        src="https://source.unsplash.com/random"
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
                                    <IconButton onClick={() => toggleSaveJob(currentPop)} style={{ borderRadius: '10px' }}>
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
                        <Link style={{cursor:'pointer'}} underline='none' onClick={() => console.log("applied")}>
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
                <div className='job-table-inner' style={{ paddingTop: '50px' }}>
                    <Typography style={{fontFamily: 'Outfit', fontSize: 'xx-large', justifyContent: 'center', alignItems: 'center', textAlign: 'start'}}>
                        Job Board 
                    </Typography>
                </div>
            </Box>
            <Box className='job-table-box'>
                <div className='job-table-inner'>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                        { render }
                        <div>
                            <Sort rawData={rawData} setRawData={setRawData} setJobData={setJobData} />
                        </div>
                    </div>
                    <Divider width='100%'/>
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