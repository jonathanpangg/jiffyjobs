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
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();

    const handleToDashboard = () => {
        navigate('/dashboard');
    };

    useEffect(() => {
        const loggedin = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (!loggedin) {
            alert('Please login!');
            navigate('/login');
        }
    },[]);

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

    // submit profile popup
    function SubmitProfilePopup({ open, onClose, onSubmit }) {
        return (
            <Dialog open={open} onClose={onClose} maxWidth="md">
                <DialogTitle>Submit Profile</DialogTitle>
                <DialogContent>
                    profile content
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Close</Button>
                    <Button onClick={onSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        );
    }

    const handleSubmitProfile = () => {
        handleCloseSubmitProfile();
        setOpenCongratsPopup(true);
    };

    function CongratsPopup({ open, onClose}) {
        const handleClose = () => {
            onClose(); // Close the congratulatory popup
        };
        return (
            <Dialog open={open} onClose={onClose} maxWidth="sm">
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
    
    return (
        <div className='outerCard'>
            <Dialog open={openPop} onClose={closePop} maxWidth={"1000px"} PaperProps={{sx: { borderRadius: "15px"}}}>
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
                            <Typography style={{fontFamily: 'Outfit', fontSize:'24px', color:'#000', fontWeight:'600', paddingLeft:'1%'}}>
                                {currentPop[0] && currentPop[0].length > 1 && currentPop[0][1]}
                            </Typography>
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
            <Box>
                <Grid container className='job-table-grid' rowSpacing={2} columnSpacing={2}>
                    {jobData.slice((page - 1) * cardsPerPage, page * cardsPerPage).map((key) => (
                        <Grid key={key} item>
                            <Link overlay underline="none" sx={{ color: 'text.tertiary', cursor: 'pointer' }} onClick={() => openPopUp(key)}>
                                <Card sx={{width: '21.5vw', height: '21.5vw', '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' }}} elevation={8} square={false} style={{overflow:'hidden', borderRadius: '15px', }}>
                                    <CardMedia
                                        component="img"
                                        alt="placeholder"
                                        height="120"
                                        image="https://source.unsplash.com/random"
                                        
                                    />
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
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '1%', background: '#f3f3f3' }}>
                <Pagination count={totalPages} page={page} onChange={(event, value) => setPage(value)} />
            </div>
            {openSubmitProfile && (<SubmitProfilePopup open={openSubmitProfile} onClose={handleCloseSubmitProfile} onSubmit={handleSubmitProfile}/>)}
            {openCongratsPopup && (<CongratsPopup open={openCongratsPopup} onClose={() => setOpenCongratsPopup(false)} onDashboardRedirect={handleToDashboard}/>)}
        </div>
    )
}