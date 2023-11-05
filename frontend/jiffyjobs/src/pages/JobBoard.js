import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { Dialog, Divider, Typography, DialogContentText, DialogContent, DialogActions, DialogTitle, Link  } from '@mui/material';
import { Filter } from '../components/Filter';
import { Sort } from '../components/Sort';
import { JobPosting } from '../components/JobPosting';
import dayjs from 'dayjs';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';


export function JobBoard() {
    const [jobData, setJobData] = useState([])
    const [rawData, setRawData] = useState([]);
    const [size, setSize] = useState(0)
    const [background, setBackground] = useState("")
    const { render, filterList } = Filter()
    const [openPop, setOpenPop] = useState(false)
    const [currentPop, setCurrentPop] = useState([])

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
        async function FilterJobs() {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
            var route = "http://localhost:4000/api/jobs/filter"
            var query = "/*/*/" + Array.from(filterList) + "/*/*"
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

    
    return (
        <div className={'job-board-outer' + background}>
            <Dialog open={openPop} onClose={closePop} maxWidth={"1000px"} PaperProps={{sx: { borderRadius: "15px"}}}>
                
                
                <img
                    style={{ maxWidth: '100%', maxHeight: '30vh', position: 'relative'}}
                    src="https://source.unsplash.com/random"
                    alt="placeholder"
                />
                    <IconButton onClick={closePop} style={{position: 'absolute', paddingLeft: '97%'}}>
                        <ClearIcon/>
                    </IconButton>
                
                <DialogContent>
                    <DialogContentText ref={descriptionElementRefStartPop} tabIndex={-1} style={{width: '1000px'}}>
                        <div>
                            <Typography style={{fontFamily: 'outline', fontSize:'32px', color:'#000', fontWeight:'600'}}>
                                {currentPop[0] && currentPop[0].length > 1 && currentPop[0][1]}
                            </Typography>
                            <Typography style={{fontFamily: 'outline', fontSize:'24px', color:'#141414', fontWeight: '500'}}>
                                {currentPop[1] && currentPop[1].length > 1 && currentPop[1][1]}
                            </Typography>
                        </div>
                        <div style={{paddingTop: '2.5%'}}>
                            <Typography style={{fontFamily: 'outline', fontSize: '20px', color: '#141414', fontWeight: '600'}}>
                                Job Information
                            </Typography>
                        </div>
                        <div style={{paddingTop: '2.5%', paddingLeft:'2.5%'}}>
                            <div style={{display: 'inline-block', width: '98px'}}>
                                <Typography style={{fontFamily: 'outline', fontSize:'18px', color:'#5B5B5B', fontWeight:'400'}}>
                                    Pay
                                </Typography>
                                <Typography style={{fontFamily: 'outline', fontSize:'18px', color:'#5B5B5B', fontWeight:'400'}}>
                                    Location
                                </Typography>
                                <Typography style={{fontFamily: 'outline', fontSize:'18px', color:'#5B5B5B', fontWeight:'400'}}>
                                    Time
                                </Typography>
                            </div>
                            <div style={{display: 'inline-block'}}>
                                <Typography style={{fontFamily:'outline', fontSize: '18px', color:'#141414', fontWeight: '600'}}>
                                    ${currentPop[3] && currentPop[3].length > 1 && currentPop[3][1]}
                                </Typography>
                                <Typography style={{fontFamily:'outline', fontSize: '18px', color:'#141414', fontWeight: '600'}}>
                                    <u>{currentPop[2] && currentPop[2].length > 1 && currentPop[2][1]}</u>
                                </Typography>
                                <Typography style={{fontFamily:'outline', fontSize: '18px', color:'#141414', fontWeight: '600'}}>
                                    {currentPop[5] && currentPop[5].length > 1 && currentPop[5][1]}
                                </Typography>
                            </div>
                        </div>
                        <Divider style={{ width: '100%', borderBottomWidth: '2px'}}/>
                        <div style={{paddingTop: '2.5%'}}>
                            <Typography style={{fontFamily: 'outline', fontSize: '20px', color:'#141414', fontWeight: '600'}}>
                                Job Description
                            </Typography>
                        </div>
                        <div style={{padding: '2.5%'}}>
                            <Typography style={{fontFamily: 'outline', fontSize: '18px', color:'#5B5B5B', fontWeight: '400'}}>
                                {currentPop[4] && currentPop[4].length > 1 && currentPop[4][1]}
                            </Typography>
                        </div>
                        <div>
                            {currentPop[6] && currentPop[6].length > 1 && currentPop[6][1].split(",").map((item, index) => (
                                <Chip
                                    key={index}
                                    label={item.trim()}
                                    variant="outlined"
                                    style={{
                                        margin: "5px",
                                        fontFamily: "outline",
                                        fontSize: "18px",
                                        color: '#5B5B5B',
                                        fontWeight: "400",
                                    }}
                                />
                            ))}
                        </div>
                    </DialogContentText>
                </DialogContent>
                <Divider style={{borderBottomWidth: '2px'}}/>
                    <DialogActions style={{ justifyContent: 'center' }}>
                        <Card sx={{height: 50, width: '30%'}} style={{overflow:'hidden', borderRadius: '15px', background: "#D9D9D9", color: 'white'}}>
                            <CardContent style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={() => console.log("applied")}> 
                                <div>
                                    <div style={{display:'inline-block'}}>
                                    <Typography style={{fontFamily: 'Outfit', fontSize:'19.2px', color:'#5B5B5B', fontWeight:'400'}}>
                                        Easy Apply with 
                                    </Typography>
                                    </div>
                                    <div style={{display:'inline-block', paddingLeft: '5px'}}>
                                    <Typography style={{fontFamily: 'Righteous-Regular', fontSize:'19.2px', color:'#141414', fontWeight:'400'}}>
                                         JIFFYJOBS
                                    </Typography>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </DialogActions>
            </Dialog>
            <Box sx={{ flexGrow: 1 }}>
                <Grid item xs={12}>
                    <Grid container className='job-table-grid' rowSpacing={2} columnSpacing={2}>
                        <JobPosting> </JobPosting>
                        
                        <text style={{width: "100%"}} className='recently-posted-jobs'> 
                            Job Board
                        </text>
                        
                        <text style={{width: "100%"}} className='recently-posted-jobs'>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                                { render }
                                { console.log (filterList)}
                                <div style={{ marginLeft: 'auto', marginRight: '8%' }}>
                                <Sort rawData={rawData} setRawData={setRawData} setJobData={setJobData} />
                                </div>
                            </div>
                            <Divider style={{ paddingTop: '1%', width: '92.5%'}}/>
                        </text>
                        {/* <button onClick={handleLogJobData}>Log Job Data</button> */}

                        {jobData.map((key) => (
                            <Grid key={key} item>
                                <Link overlay underline="none" sx={{ color: 'text.tertiary', cursor: 'pointer' }} onClick={() => openPopUp(key)}>
                                    <Card sx={{height: 300, width: 300, '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' }}} elevation={8} square={false} style={{overflow:'hidden', borderRadius: '15px'}}>
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
                                        <Typography style={{fontFamily: 'Outfit', fontSize:"12px", paddingLeft:'10px', paddingRight:'10px', paddingTop:'10px', paddingBottom:'10px'}}>
                                            Description: {truncate(key[4][1])}
                                        </Typography>
                                    </Card>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>   
            </Box>
        </div>
    )
}