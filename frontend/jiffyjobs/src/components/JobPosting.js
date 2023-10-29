import React, { useEffect, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { Divider } from '@mui/material';

export function JobPosting() {
    const [openStartPop, setOpenStartPop] = useState(false)
    const [openSecondPop, setOpenSecondPop] = useState(false)
    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [pay, setPay] = useState(0)
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: 48 * 4.5 + 8,
          width: 175,
        },
      },
    };

    function updateTitle(event) {
        console.log(event)
        setTitle(event.target.value)
    }

    function updateName(event) {
        console.log(event)
        setName(event.target.value)
    }

    function updateLocation(event) {
        console.log(event)
        setLocation(event.target.value)
    }

    function updateDescription(event) {
        console.log(event)
        setDescription(event.target.value)
    }

    function updatePay(event) {
        console.log(event)
        setPay(event.target.value)
    }

    const openPop = () => {
        setOpenStartPop(true)
    }

    const closePop = () => {
        setOpenStartPop(false)
    }

    const openNextPop = () => {
        setOpenStartPop(false)
        setOpenSecondPop(true)
    }

    const closeNextPop = () => {
        setOpenSecondPop(false)
    }

    const backSecondPop = () => {
        setOpenSecondPop(false)
        setOpenStartPop(true)
    }

    const descriptionElementRefStartPop = React.useRef(null)
    React.useEffect(() => {
        if (openStartPop) {
            const { current: descriptionElement } = descriptionElementRefStartPop
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [openStartPop])

    const descriptionElementRefNextPop = React.useRef(null)
    React.useEffect(() => {
        if (openSecondPop) {
            const { current: descriptionElement } = descriptionElementRefNextPop
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [openSecondPop])

    const firstJobSlide = () => {
        return (
            <Dialog open={openStartPop} onClose={closePop} maxWidth={"1000px"} PaperProps={{sx: { borderRadius: "15px"}}}>
                <div className='popup-title'>
                    <DialogTitle style={{width: "90%"}}> 
                        Tell us more about the job!
                    </DialogTitle>
                    <IconButton onClick={closePop}>
                        <ClearIcon/>
                    </IconButton>
                </div>
                <Divider/>
                    <DialogContent>
                        <DialogContentText ref={descriptionElementRefStartPop} tabIndex={-1} style={{width: '1000px'}}>
                            <div>
                                <text className='pop-textfield-title'>
                                    Job Title
                                </text> <br></br>
                                <TextField required={true} placeholder="" type="search" style={{width: '98.5%'}} onChange={updateTitle} value={title}/>
                            </div>
                            <div style={{paddingTop: '2.5%'}}>
                                <text className='pop-textfield-title'>
                                    Company or Employer Name
                                </text> <br></br>
                                <TextField required={true} placeholder="" type="search" style={{width: '98.5%'}} onChange={updateName} value={name}/>
                            </div>
                            <div style={{paddingTop: '2.5%'}}>
                                <text className='pop-textfield-title'>
                                    Job Location
                                </text> <br></br>
                                <TextField required={true} placeholder="" type="search" style={{width: '98.5%'}} onChange={updateLocation} value={location}/>
                            </div>
                            <div style={{paddingTop: '2.5%', display: 'flex'}}>
                                <div style={{width: '35%', paddingRight: '2.5%'}}>
                                    <text className='pop-textfield-title'>
                                        Pay 
                                    </text> <br></br>
                                    <TextField required={true} placeholder="" type="search" className='pop-textfield-title' style={{width: '100%'}} onChange={updatePay} value={pay}/>
                                </div>
                            </div>
                        </DialogContentText>
                    </DialogContent>
                <Divider/>
                    <DialogActions>
                        <Card sx={{height: 50, width: '10%'}} style={{overflow:'hidden', borderRadius: '15px', color: 'black', border: "1px solid black"}}>
                            <CardContent style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={closePop}> 
                                Back
                            </CardContent>
                        </Card>
                        <Card sx={{height: 50, width: '10%'}} style={{overflow:'hidden', borderRadius: '15px', background: "gray", color: 'white'}}>
                            <CardContent style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={openNextPop}> 
                                Next
                            </CardContent>
                        </Card>
                    </DialogActions>
            </Dialog>
        )
    }

    const secondJobSlide = () => {
        return (
            <Dialog open={openSecondPop} onClose={closeNextPop} maxWidth={"1000px"} PaperProps={{sx: { borderRadius: "15px"}}}>
                <div className='popup-title'>
                    <DialogTitle style={{width: "90%"}}> 
                        Tell us more about the job!
                    </DialogTitle>
                    <IconButton onClick={closeNextPop}>
                        <ClearIcon/>
                    </IconButton>
                </div>
            <Divider/>
                <DialogContent>
                    <DialogContentText ref={descriptionElementRefNextPop} tabIndex={-1} style={{width: '1000px'}}>
                        <div>
                            <text className='pop-textfield-title'>
                                Start date/time
                            </text> <br></br>
                            <Select style={{width: '17.5%'}} className='pop-textfield-title' MenuProps={MenuProps}>
                                {months.map((month) => (
                                    <MenuItem value={month}> {month} </MenuItem>
                                ))}
                            </Select>
                            <TextField required={true} placeholder="Date" type="search" style={{width: '17.5%', paddingLeft: '1%', paddingRight: '1%'}}/>
                            <TextField required={true} placeholder="Year" type="search" square={false} style={{width: '17.5%', paddingRight: '8%'}}/>
                            <TextField required={true} placeholder="Hour" type="search" square={false} style={{width: '17.5%', paddingRight: '1%'}}/>
                            <TextField required={true} placeholder="Minute" type="search" square={false} style={{width: '17.5%', paddingRight: '1%'}}/>
                        </div>
                        <div style={{paddingTop: '2.5%'}}>
                        <text className='pop-textfield-title'>
                                End date/time
                            </text> <br></br>
                            <Select style={{width: '17.5%'}} className='pop-textfield-title' MenuProps={MenuProps}>
                                {months.map((month) => (
                                    <MenuItem value={month}> {month} </MenuItem>
                                ))}
                            </Select>
                            <TextField required={true} placeholder="Date" type="search" square={false} style={{width: '17.5%', paddingLeft: '1%', paddingRight: '1%'}}/>
                            <TextField required={true} placeholder="Year" type="search" square={false} style={{width: '17.5%', paddingRight: '8%'}}/>
                            <TextField required={true} placeholder="Hour" type="search" square={false} style={{width: '17.5%', paddingRight: '1%'}}/>
                            <TextField required={true} placeholder="Minute" type="search" square={false} style={{width: '17.5%', paddingRight: '1%'}}/>
                        </div>
                        <div style={{paddingTop: '2.5%'}}>
                            <text className='pop-textfield-title'>
                                Description
                            </text> <br></br>
                            <TextField required placeholder="" type="search" square={false} style={{width: '98.5%'}} onChange={updateDescription} value={description}/>
                        </div>
                        <div style={{paddingTop: '2.5%'}}>
                            <text className='pop-textfield-title'>
                                Category
                            </text> <br></br>
                            <TextField required={true} placeholder="" type="search" square={false} style={{width: '98.5%'}}/>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Card sx={{height: 50, width: '10%'}} square={false} style={{overflow:'hidden', borderRadius: '15px', color: 'black', border: "1px solid black"}}>
                        <CardContent style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={backSecondPop}> 
                            Back
                        </CardContent>
                    </Card>
                    <Card sx={{height: 50, width: '10%'}} square={false} style={{overflow:'hidden', borderRadius: '15px', background: "gray", color: 'white'}}>
                        <CardContent style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={PostJobs}> 
                            Submit
                        </CardContent>
                    </Card>
                </DialogActions>
            </Dialog>
        )
    }

    async function PostJobs() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: title,
                job_poster: name,
                description: "Our server ran away, we need a replacement for this weekend ASAP",
                pay: pay,
                location: location,
                categories: ["serving", "cleaning"],
                time: ["2023-10-20T10:00:00", "2023-10-20T18:00:00"],
                date_posted: "2023-10-20T10:00:00"
            })
        }
        const route = "http://localhost:4000/api/jobs/create"
        fetch(route, requestOptions)
            .then((response) => {
                response.json()
                setTitle("")
                setName("")
                setPay(0)
                setLocation("")
                setDescription("")
                setOpenStartPop(false)
                setOpenSecondPop(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <Grid item className='job-search-tab'> 
            <Card sx={{height: 200, width: '147.5%'}} elevation={8} style={{overflow: 'hidden', borderRadius: '15px', paddingTop: '3.5%'}}>
                <text className='job-search-text'> 
                    Find jobs or hire college students starting now with {" "}
                </text>
                <text className='job-search-logo'>
                    JiffyJobs
                </text>
                <br></br>
                <Grid container className='job-table-grid' columnSpacing={2} style={{paddingLeft: '30%', paddingTop: '1.5%'}}> 
                    <TextField placeholder="Find Jobs..." type="search" style={{width: '45%'}}/>
                    <Grid className='job-button'>
                        <Card sx={{height: 55, width: '110%'}} elevation={8} style={{overflow:'hidden', borderRadius: '15px', background: "#8253E7", color: 'white'}}>
                            <CardContent style={{ alignItems: 'center' }} onClick={openPop}> 
                                Post a Job
                            </CardContent>
                        </Card>
                        { openSecondPop ? secondJobSlide(): firstJobSlide()}
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}