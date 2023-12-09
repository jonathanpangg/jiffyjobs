import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';
import { Box, Grid, Avatar, Dialog, DialogActions, Button, DialogTitle, DialogContent, DialogContentText, Divider } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle';
import CloseIcon from '@mui/icons-material/Close';
import { PostedJobDashboard } from './PostedJobDashboard';
import { ToastContainer, toast } from 'react-toastify';
import accept from '../images/Accept.png';
import reject from '../images/Reject.png';

export function ViewApplicants({children, jobID}) {
    const [applicantData, setApplicantData] = useState([]) 
    const [applicant, setApplicant] = useState([])
    const [open, setOpen] = useState(false)
    const [close, setClose] = useState(false)
    const [typeResponse, setTypeResponse] = useState("")

    const getInitials = (first_name, last_name) => {
        if (first_name && last_name) {
            return first_name[0] + last_name[0]
        }
    }

    async function getUserInfo(email) {
        const route = "https://jiffyjobs-api-production.up.railway.app/api/users/getInfo/" + email + "/seeker"

        fetch(route)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setApplicant([data.personal_info.first_name, data.personal_info.last_name, data.personal_info.school, data.personal_info.grade, data.email, data.personal_info.personal_statement, data.personal_info.major])
                setOpen(true)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async function acceptUser(email, jobID) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        }
        const route = "https://jiffyjobs-api-production.up.railway.app/api/users/hire/" + jobID + "/" + email

        fetch(route, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((_) => {
                toast.dismiss()
                toast.success(`Accepted ${email}`, {
                    icon: ({theme, type}) =>  <img src={accept} style={{ width: '24px', height: '24px', marginRight: '10px', marginBottom:'6px'}}/>,
                    progressStyle: {backgroundColor: '#66C120'},
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async function rejectUser(email, jobID) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        }
        const route = "https://jiffyjobs-api-production.up.railway.app/api/users/reject/" + jobID + "/" + email

        fetch(route, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((_) => {
                toast.dismiss()
                toast.error(`Rejected ${email}`, {
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
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        async function getApplicants() {
            const route = "https://jiffyjobs-api-production.up.railway.app/api/users/applicants/" + jobID

            fetch(route)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    var count = 0
                    const applicants = data.map(function(obj) {
                        return [count++, obj.personal_info.first_name, obj.personal_info.last_name, obj.status, obj.email]
                    });
                    setApplicantData(applicants)
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        if (applicantData.length === 0) 
            getApplicants()
    }, [applicantData]) 

    return (
        <>
            { close ? <PostedJobDashboard/>: 
                <div>
                    <div className='header-one'>
                        Applicants
                        <CloseIcon style={{position: 'absolute', right: 175, pointer: 'grab',  color: '#4A4FE4'}} onClick={() => {setClose(true)}}/>
                    </div>
                    <div className='header-two'>
                        See the list of applicants and accept or reject them!
                    </div>
                    <Box className='progress-box'>
                        <Grid container className='progress-grid' rowSpacing={0} columnSpacing={3} width='70vw' style={{paddingBottom: '1%'}}>
                            {applicantData.length === 0 ? (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh', width:'65vw' }}>
                                <div style={{ textAlign: 'center', marginTop: '20px' }}>Currently there are no applicants.</div>
                            </div>
                            ) : (
                                applicantData.map((key) => {
                                    return (
                                        <Grid width='70vw' key={key} item> 
                                            { key[3] !== 'accepted' ? 
                                                <div style={{display: 'flex', width: '92.5%', height: '50px', alignItems: 'center', fontFamily: 'Outfit', border: '1px solid #D9D9D9', borderTopLeftRadius: key[0] === 0 ? '10px': '0px', borderTopRightRadius: key[0] === 0 ? '10px': '0px', borderBottomLeftRadius: key[0] === applicantData.length-1 ? '10px': '0px', borderBottomRightRadius: key[0] === applicantData.length-1 ? '10px': '0px',}} >
                                                    <Avatar sx={{ bgcolor: "#cccccc", color: "#5B5B5B", width: '26px', height: '26px', fontSize: '16px', fontFamily: 'Outfit', marginLeft: '25px', marginRight: '13px', cursor:'pointer'}} onClick={() => { getUserInfo(key[4]); setTypeResponse('standard')}}>{ getInitials(key[1], key[2]) }</Avatar>
                                                    <u style={{fontSize: '16px', cursor:'pointer'}} onClick={() => { getUserInfo(key[4]); setTypeResponse('standard')}}> {key[1] + " " + key[2]} </u>
                                                    <CircleIcon style={{width: '5px', height: '5px', marginLeft: '6px', marginRight: '6px', color: '#5B5B5B', cursor:'pointer'}} onClick={() => { getUserInfo(key[4]); setTypeResponse('standard')}}/>
                                                    <div style={{fontSize: '12px', color: '#5B5B5B', cursor:'pointer'}} onClick={() => { getUserInfo(key[4]); setTypeResponse('standard')}}> Click to view Profile </div>
                                                    <div style={{display: 'flex', position: 'absolute', right: 200}}>
                                                        <div style={{display: 'flex', position: 'relative', width: '60.5px', height: '26.25px', fontSize: '12px', color: '#FFFFFF', alignItems: 'center', justifyContent: 'center', backgroundColor: "#66C120", borderRadius: '6px', marginRight: '8.5px', cursor:'pointer'}} onClick={() => { getUserInfo(key[4]); setTypeResponse('accept') }}> Accept </div>
                                                        <div style={{display: 'flex', position: 'relative', width: '60.5px', height: '26.25px', fontSize: '12px', color: '#FFFFFF', alignItems: 'center', justifyContent: 'center', backgroundColor: "#C12020", borderRadius: '6px', cursor:'pointer' }} onClick={() => { getUserInfo(key[4]); setTypeResponse('reject')}}> Reject </div>
                                                    </div>
                                                </div>:
                                                <div style={{display: 'flex', width: '92.5%', height: '50px', alignItems: 'center', fontFamily: 'Outfit', border: '1px solid #D9D9D9', borderTopLeftRadius: key[0] === 0 ? '10px': '0px', borderTopRightRadius: key[0] === 0 ? '10px': '0px', borderBottomLeftRadius: key[0] === applicantData.length-1 ? '10px': '0px', borderBottomRightRadius: key[0] === applicantData.length-1 ? '10px': '0px', backgroundColor: 'rgba(102, 193, 32, 0.15)'}}>
                                                    <Avatar sx={{ bgcolor: "#cccccc", color: "#5B5B5B", width: '26px', height: '26px', fontSize: '16px', fontFamily: 'Outfit', marginLeft: '25px', marginRight: '13px'}}>{ getInitials(key[1], key[2]) }</Avatar>
                                                    <u style={{fontSize: '16px'}}> {key[1] + " " + key[2]} </u>
                                                    <CircleIcon style={{width: '5px', height: '5px', marginLeft: '6px', marginRight: '6px', color: '#5B5B5B'}}/>
                                                    <div style={{fontSize: '12px', color: '#5B5B5B'}} onClick={() => { getUserInfo(key[4]); setTypeResponse('selected')}}> Selected Applicant </div>
                                                    <div style={{display: 'flex', position: 'absolute', right: 200}}>
                                                        <div style={{display: 'flex', position: 'relative', width: '73px', height: '26.25px', fontSize: '12px', color: '#FFFFFF', alignItems: 'center', justifyContent: 'center', backgroundColor: "#66C120", borderRadius: '6px'}}> Accepted </div>
                                                    </div>
                                                </div>
                                            }
                                        </Grid>
                                    )
                                })
                            )}
                        </Grid>
                    </Box>
                    <Dialog open={open} onClose={() => {setOpen(false)}} PaperProps={{sx: { borderRadius: "15px", transform: 'scale(0.95)', }}}>
                        <DialogTitle style={{width: '520px', display: 'flex', justifyContent: 'center', fontFamily: 'Outfit', fontSize: '24px', fontWeight: '500', bold: 'none'}}>
                            <CloseIcon style={{width: '25px', height: '25px', position: 'absolute', right: 25, color: '#4A4FE4'}} onClick={() => {setOpen(false)}}/>
                            <div style={{marginTop: '2.5%'}}> { (typeResponse === 'standard' || typeResponse === 'selected') ? "Applicant Profile": (typeResponse === "accept" ? 'Are you sure you want to accept?': 'Are you sure you want to reject?')} </div>
                        </DialogTitle>
                        <DialogContent style={{display: 'flex', justifyContent: 'center', marginBottom: '-7px'}}>
                            <div style={{ width: '431px', height: '399px', border: '1px solid #A4A4A4', borderRadius: '10px', backgroundColor: (typeResponse === 'standard' || typeResponse === 'selected') ? "white": (typeResponse === "accept" ? 'rgba(102, 193, 32, 0.15)': 'rgba(193, 32, 32, 0.15)')}}>
                                <DialogContentText>
                                    <div style={{display: 'flex', alignItems: 'center', fontFamily: 'Outfit', marginTop: '26px'}}>
                                        <Avatar sx={{ bgcolor: "#cccccc", color: "black", width: '50px', height: '50px', fontSize: '26px', fontFamily: 'Outfit', marginLeft: '35px', marginRight: '11px'}}>{ getInitials(applicant[0], applicant[1]) }</Avatar>
                                        <div style={{fontSize: '18px', fontWeight: '500', color: "black"}}> {applicant[0] + " " + applicant[1]} </div>
                                    </div>
        
                                    <div style={{display: 'flex', position: 'absolute', alignItems: 'center', fontFamily: 'Outfit', marginTop: '40px', right: 245}}>
                                        <div style={{color: 'black', marginRight: '10px'}}> School </div>
                                        <div style={{width: '161px', height: '28px', borderRadius: '5px', border: '1px solid #A4A4A4', backgroundColor: '#D9D9D9', display: 'flex', alignItems: 'center'}}> 
                                            <div style={{display: 'flex', alignItems: 'center', marginLeft: '10px', fontSize: '12px'}}>
                                                {applicant[2]}
                                            </div>
                                        </div>
                                    </div>
        
                                    <div style={{display: 'flex', position: 'absolute', alignItems: 'center', fontFamily: 'Outfit', marginTop: '78px', right: 245}}>
                                        <div style={{color: 'black', marginRight: '10px'}}> Major </div>
                                        <div style={{width: '161px', height: '28px', borderRadius: '5px', border: '1px solid #A4A4A4', backgroundColor: '#D9D9D9', display: 'flex', alignItems: 'center'}}> 
                                            <div style={{display: 'flex', alignItems: 'center', marginLeft: '10px', fontSize: '12px'}}>
                                                {applicant[6]}
                                            </div>
                                        </div>
                                    </div>
        
                                    <div style={{display: 'flex', position: 'absolute', alignItems: 'center', fontFamily: 'Outfit', marginTop: '116px', right: 245}}>
                                        <div style={{color: 'black', marginRight: '10px'}}> Grade </div>
                                        <div style={{width: '161px', height: '28px', borderRadius: '5px', border: '1px solid #A4A4A4', backgroundColor: '#D9D9D9', display: 'flex', alignItems: 'center'}}> 
                                            <div style={{display: 'flex', alignItems: 'center', marginLeft: '10px', fontSize: '12px'}}>
                                                {applicant[3]}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div style={{display: 'flex', position: 'absolute', alignItems: 'center', fontFamily: 'Outfit', marginTop: '154px', right: 245 }}>
                                        <div style={{color: 'black', marginRight: '10px'}}> Email </div>
                                        <div style={{width: '161px', height: '28px', borderRadius: '5px', border: '1px solid #A4A4A4', backgroundColor: '#D9D9D9', display: 'flex', alignItems: 'center'}}> 
                                            <div style={{display: 'flex', alignItems: 'center', marginLeft: '10px', fontSize: '12px'}}>
                                                {applicant[4]}
                                            </div>
                                        </div>
                                    </div>
        
                                    <div style={{display: 'flex', position: 'absolute', alignItems: 'start', fontFamily: 'Outfit', marginTop: '192px', right: 93 }}>
                                        <div style={{color: 'black', marginRight: '10px'}}> Bio </div>
                                        <div style={{width: '313px', height: '112px', borderRadius: '5px', border: '1px solid #A4A4A4', backgroundColor: '#D9D9D9', display: 'flex', alignItems: 'start'}}> 
                                            <div style={{display: 'flex', alignItems: 'center', marginLeft: '10px', fontSize: '12px'}}>
                                                {applicant[5]}
                                            </div>
                                        </div>
                                    </div>
                                </DialogContentText>
                            </div>
                        </DialogContent>
                        <Divider style={{ width: '100%', height: '1.44px', marginBottom: '7px', fontWeight: 500 }} />
                        { typeResponse !== 'selected' && 
                            <DialogActions>
                                <div style={{display: 'flex', marginRight: '60px', marginBottom: '7px'}}>
                                    <Button sx={{textTransform: 'none'}} style={{width: '93px', height: '42px', color: typeResponse === 'standard' ? "#FFF" : "#5B5B5B", backgroundColor: typeResponse === 'standard' ? '#66C120': '#D9D9D9', marginRight: '10px', borderRadius: '10px'}} onClick={() => 
                                        {
                                            if (typeResponse === 'standard') {
                                                acceptUser(applicant[4], jobID)
                                                setOpen(false)
                                                setApplicantData([])
                                            } else {
                                                setOpen(false)
                                                setApplicantData([])
                                            }
                                        }}> 
                                        { typeResponse === 'standard'? 'Accept': 'Back'}
                                    </Button>
                                    <Button sx={{textTransform: 'none'}} style={{width: '93px', height: '42px', color: "#FFF", backgroundColor: typeResponse === 'accept' ? '#66C120': '#C12020', borderRadius: '10px'}} onClick={() => 
                                        {
                                            if (typeResponse === 'accept') {
                                                acceptUser(applicant[4], jobID)
                                                setOpen(false)
                                                setApplicantData([])
                                            } else {
                                                rejectUser(applicant[4], jobID)
                                                setOpen(false)
                                                setApplicantData([])
                                            }
                                        }}> 
                                        { typeResponse === 'standard' ? 'Reject': (typeResponse === 'accept' ? 'Accept': 'Reject')}
                                    </Button>
                                </div>
                            </DialogActions>
                        }
                    </Dialog>
                </div>
            }
        </>
    )
}