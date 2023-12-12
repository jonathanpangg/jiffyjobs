import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import ClearIcon from '@mui/icons-material/Clear';
import StarBorderRounded from '@mui/icons-material/StarBorderRounded';
import StarRoundedIcon from "@mui/icons-material/StarRounded"
import { Dialog, Divider, Typography, DialogContentText, 
        DialogContent, DialogActions,Link, Button, CardContent, 
        Card, IconButton, Chip,CardMedia } from '@mui/material';
import reject from '../images/Reject.png';

export function JobPopup({open, onClose, openPopUp, currentPop, openSubmitProfile, openCongratsPopup, openSubmit, jobData}) {
    const [ userEmail, setUserEmail ] = useState(localStorage.getItem("email"));
    const [ userRole, setUserRole ] = useState(localStorage.getItem("user"));
    const [savedJobs, setSavedJobs] = useState([]) 
    const [jobSaved, setJobSaved] = useState(false)


    const toggleSaveJob = async (jobDetails) => {
        if (userRole === "provider") {
            toast.dismiss()
            toast.error('You can only save jobs as a Seeker!', {
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
        <Dialog open={open} onClose={onClose} className={`${openSubmitProfile || openCongratsPopup ? 'blur-effect' : ''}`} maxWidth={'680px'} PaperProps={{sx: { borderRadius: "10.4px", height: currentPop.length === 8 && currentPop[7][1] !== "submitted" ? '600px' : '650px'}}}>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="27.046px" height="27.046px" viewBox="0 0 40 40" fill="none">
                                        <path d="M24.1636 7.4292L25.2399 10.6907C25.7262 12.2003 27.1274 13.2266 28.7134 13.2347H32.1054C33.6962 13.2246 35.1107 14.2452 35.6026 15.7581C36.0944 17.271 35.5506 18.9283 34.258 19.8557L31.4694 21.8778C30.1857 22.8097 29.6463 24.461 30.1322 25.971L31.2085 29.2326C31.7408 30.7478 31.2211 32.4329 29.9278 33.3851C28.6346 34.3373 26.8711 34.3331 25.5823 33.3747L22.8427 31.3363C21.5584 30.4059 19.8217 30.4059 18.5374 31.3363L15.7977 33.3747C14.5162 34.3127 12.7754 34.3152 11.4912 33.3809C10.207 32.4466 9.67356 30.7895 10.1716 29.2815L11.2479 26.02C11.7338 24.5099 11.1943 22.8587 9.91065 21.9267L7.0568 19.872C5.738 18.9427 5.18497 17.2583 5.69627 15.7282C6.20758 14.198 7.66211 13.1845 9.27465 13.2347H12.6667C14.2439 13.2312 15.6425 12.2201 16.1402 10.7234L17.2165 7.46182C17.699 5.95533 19.0963 4.93058 20.6782 4.92315C22.26 4.91573 23.6669 5.92731 24.1636 7.4292Z" fill="#4A4FE4"/>
                                    </svg>: 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="27.046px" height="27.046px" viewBox="0 0 40 40" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1259 8.03585C17.5956 6.51659 19.0093 5.4878 20.5994 5.50815C22.1985 5.49209 23.6151 6.53628 24.0729 8.06846L25.1493 11.33C25.6326 12.8395 27.0378 13.8621 28.6228 13.8577H32.0148C33.637 13.7962 35.1052 14.8127 35.6186 16.3528C36.1319 17.8929 35.5673 19.5871 34.2326 20.5112L31.444 22.5497C30.1587 23.4729 29.618 25.1214 30.1068 26.6266L31.1831 29.8882C31.5529 31.0172 31.3532 32.2555 30.6471 33.211C29.941 34.1665 28.8159 34.721 27.628 34.6989C26.8577 34.6931 26.1093 34.4418 25.4917 33.9814L22.8172 31.9429C21.5346 31.0074 19.7946 31.0074 18.512 31.9429L15.7071 33.9814C15.0821 34.4843 14.3077 34.7654 13.5056 34.7805C12.309 34.7904 11.1828 34.2163 10.4879 33.2422C9.79305 32.268 9.61681 31.0163 10.0157 29.8882L11.092 26.6266C11.6106 25.126 11.0956 23.4624 9.82002 22.5171L7.0314 20.4786C5.7388 19.5513 5.195 17.894 5.68688 16.3811C6.17876 14.8682 7.5932 13.8476 9.18402 13.8577H12.576C14.1698 13.8576 15.5779 12.8198 16.0496 11.2974L17.1259 8.03585ZM21.4637 8.88385C21.3634 8.49334 21.0021 8.22742 20.5994 8.24785C20.1768 8.23338 19.808 8.53252 19.7351 8.94908L18.6588 12.2106C17.8034 14.8465 15.3472 16.631 12.576 16.63H9.11879C8.73451 16.6411 8.39831 16.8916 8.27784 17.2567C8.15736 17.6217 8.27842 18.0232 8.58063 18.2608L11.3692 20.2992C13.6185 21.9261 14.5608 24.8187 13.7012 27.4583L12.6249 30.7199C12.5192 30.9877 12.5626 31.2914 12.7391 31.5189C12.9221 31.7824 13.2177 31.9453 13.5382 31.9592C13.7339 31.9534 13.9226 31.8848 14.0763 31.7635L16.8323 29.7251C19.0786 28.0931 22.1202 28.0931 24.3665 29.7251L27.0899 31.6657C27.2436 31.7869 27.4323 31.8555 27.628 31.8614C27.934 31.8415 28.2151 31.686 28.3945 31.4374C28.5709 31.2099 28.6143 30.9061 28.5086 30.6383L27.4323 27.3768C26.5728 24.7372 27.515 21.8446 29.7643 20.2177L32.5529 18.1955C32.8552 17.9579 32.9762 17.5565 32.8557 17.1914C32.7353 16.8264 32.3991 16.5758 32.0148 16.5648H28.6228C25.8516 16.5658 23.3954 14.7812 22.54 12.1454L21.4637 8.88385Z" fill="#4A4FE4"/>
                                    </svg>}
                            </IconButton>
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
            { currentPop.length === 8 && currentPop[7][1] !== "submitted" ?
               <div></div>
            :
            <DialogActions style={{ justifyContent: 'center', marginBottom: '6.58px', marginTop: '6.58px' }}>
                <Link style={{cursor:'pointer'}} underline='none'>
                    <Card sx={{height: 35, width: '100%'}} style={{overflow:'hidden', borderRadius: '6.63px', background: "#4A4FE4", color: 'white'}}>
                        <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                            <Button onClick={openSubmit} style={{ textTransform: 'none', width: '100%' }}>
                                { currentPop.length === 8 && currentPop[7][1]  === "submitted" ?  
                                    <Typography style={{ fontFamily: 'Outfit', fontSize: '13.268ppx', color: 'white', fontWeight: '400', marginTop: '-16px' }}>
                                    Confirm Withdraw
                                    </Typography>
                                :
                                    <Typography style={{ fontFamily: 'Outfit', fontSize: '13.268ppx', color: 'white', fontWeight: '400', marginTop: '-16px' }}>
                                    Submit Profile
                                    </Typography>
                                }
                            
                            </Button>
                        </CardContent>
                    </Card>
                </Link>
            </DialogActions>
           
            }
    </Dialog>
    )
}