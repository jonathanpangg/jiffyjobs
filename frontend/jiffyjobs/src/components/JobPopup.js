import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import ClearIcon from '@mui/icons-material/Clear';
import StarBorderRounded from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from "@mui/icons-material/StarRounded"
import { Dialog, Divider, Typography, DialogContentText, 
        DialogContent, DialogActions,Link, Button, CardContent, 
        Card, IconButton, Chip,CardMedia } from '@mui/material';

export function JobPopup({open, onClose, openPopUp, currentPop, openSubmitProfile, openCongratsPopup, openSubmit}) {
    const [ userEmail, setUserEmail ] = useState(localStorage.getItem("email"));
    const [ userRole, setUserRole ] = useState(localStorage.getItem("user"));
    const [showSavedMessage, setShowSavedMessage] = useState(false);
    const [savedJobs, setSavedJobs] = useState([]) 
    const [jobSaved, setJobSaved] = useState(false)

    useEffect(() => {
        console.log(currentPop)
    })

    const toggleSaveJob = async (jobDetails) => {
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
                getJobs();
                setJobSaved(savedJobs.includes(jobDetails));

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
        <Dialog open={open} onClose={onClose} className={`${openSubmitProfile || openCongratsPopup ? 'blur-effect' : ''}`} maxWidth={'680px'} PaperProps={{sx: { borderRadius: "10.4px", height: '650px'}}}>
        <div style={{ position: 'relative'}}>
            <CardMedia
                component="img"
                style={{ width: '744px', maxHeight: '190px',}}
                image={currentPop[1] && currentPop[1].length > 1 && currentPop[1][0]}
                alt="placeholder"
            />
        </div>
        <IconButton onClick={onClose} style={{position: 'absolute', right:'0', top:'0', color: '#4A4FE4'}}>
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
                                    <StarRoundedIcon style={{ width: '27.046px', height: '27.046px', color: '#4A4FE4' }} /> : 
                                    <StarBorderRounded style={{ width: '27.046px', height: '27.046px', color: '#4A4FE4' }} />}
                            </IconButton>
                            {showSavedMessage && <div style={{ position: 'absolute', bottom: '-18px', left: '50%', transform: 'translateX(-50%)', fontSize: '10px', fontFamily: 'Outfit', fontWeight: 500, textAlign: 'center', color: '#4A4FE4' }}>
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
                            style={{ margin: '2px', fontFamily: 'Outfit', fontSize: '10.439px', borderRadius: '10px', backgroundColor: '#A0A4FF', color: 'white', borderColor: '#A0A4FF' }}
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
                    <Card sx={{height: 35, width: '100%'}} style={{overflow:'hidden', borderRadius: '6.63px', background: "#4A4FE4", color: 'white'}}>
                    <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                        <Button onClick={openSubmit} style={{ textTransform: 'none', width: '100%' }}>
                            <Typography style={{ fontFamily: 'Outfit', fontSize: '13.268ppx', color: 'white', fontWeight: '400', marginTop: '-16px' }}>
                                Submit Profile
                            </Typography>
                        </Button>
                    </CardContent>
                    </Card>
                </Link>
            </DialogActions>
    </Dialog>
    )
}