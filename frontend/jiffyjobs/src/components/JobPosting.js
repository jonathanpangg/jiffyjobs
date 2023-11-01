import React, { useEffect, useState } from 'react';
import '../styles/JobPosting.css';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { Divider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
var objectSupport = require("dayjs/plugin/objectSupport");
dayjs.extend(objectSupport);

export function JobPosting() {
    const [openStartPop, setOpenStartPop] = useState(false)
    const [openSecondPop, setOpenSecondPop] = useState(false)

    // useState for the data
    const [val, setVal] = useState({
        title: '',
        name: '',
        location: '',
        pay: '',
        description: '',
        category: [],
        date: {
            month: new Date().getMonth()+1,
            day: new Date().getDate(),
            year: new Date().getFullYear()
        },
        startTime: {
            hour: '0',
            min: '0'
        },
        endTime: {
            hour: '0',
            min: '0'
        }
    })

    // useState for errors
    const [error, setError] = useState({
        titleError: false,
        nameError: false,
        locationError: false,
        payError: false,
        descriptionError: false,
        categoryError: false,
    })

    // handles the error of the input boxes
    function handleError() {
        setError({
            titleError: val.title === '',
            nameError: val.name === '',
            locationError: val.location === '',
            payError: val.pay === '' || val.pay === 0,
            descriptionError: val.description === '',
            categoryError: val.category.length === 0
        })
    }

    // resets the data 
    function empytyVals() {
        setVal({
            title: '',
            name: '',
            location: '',
            pay: 0,
            description: '',
            category: [],
            date: {
                month: new Date().getMonth()+1,
                day: new Date().getDate(),
                year: new Date().getFullYear()
            },
            startTime: {
                hour: '0',
                min: '0'
            },
            endTime: {
                hour: '0',
                min: '0'
            }
        })
    }

    // changes the vals for all except date and time
    function handleValues(event) {
        if (event.target.id === 'title') {
            setVal({
                title: event.target.value,
                name: val.name,
                location: val.location,
                pay: val.pay,
                description: val.description,
                category: val.category,
                date: val.date,
                startTime: val.startTime,
                endTime: val.endTime
            })
        } else if (event.target.id === 'name') {
            setVal({
                title: val.title,
                name: event.target.value,
                location: val.location,
                pay: val.pay,
                description: val.description,
                category: val.category,
                date: val.date,
                startTime: val.startTime,
                endTime: val.endTime
            })
        } else if (event.target.id === 'location') {
            setVal({
                title: val.title,
                name: val.name,
                location: event.target.value,
                pay: val.pay,
                description: val.description,
                category: val.category,
                date: val.date,
                startTime: val.startTime,
                endTime: val.endTime
            })
        } else if (event.target.id === 'pay') {
            if (event.target.value === "") {
                setVal({
                    title: val.title,
                    name: val.name,
                    location: val.location,
                    pay: val.pay,
                    description: val.description,
                    category: val.category,
                    date: val.date,
                    startTime: val.startTime,
                    endTime: val.endTime
                })
            } else {
                const re = /^[0-9]*(\.[0-9]{0,2})?$/; 
                if (re.test(event.target.value) && parseFloat(event.target.value) > 0) {
                    setVal({
                        title: val.title,
                        name: val.name,
                        location: val.location,
                        pay: event.target.value,
                        description: val.description,
                        category: val.category,
                        date: val.date,
                        startTime: val.startTime,
                        endTime: val.endTime
                    })
                } else {
                    setVal({
                        title: val.title,
                        name: val.name,
                        location: val.location,
                        pay: val.pay,
                        description: val.description,
                        category: val.category,
                        date: val.date,
                        startTime: val.startTime,
                        endTime: val.endTime
                    })
                }
            }
        } else if (event.target.id === 'description') {
            setVal({
                title: val.title,
                name: val.name,
                location: val.location,
                pay: val.pay,
                description: event.target.value,
                category: val.category,
                date: val.date,
                startTime: val.startTime,
                endTime: val.endTime
            })
        } else if (event.target.id === 'category') {
            setVal({
                title: val.title,
                name: val.name,
                location: val.location,
                pay: val.pay,
                description: val.description,
                category: event.target.value,
                date: val.date,
                startTime: val.startTime,
                endTime: val.endTime
            })
        }
    }

    // handles the date calendar data
    function handleDate(event) {
        setVal({
            title: val.title,
            name: val.name,
            location: val.location,
            pay: val.pay,
            description: val.description,
            category: val.category, 
            date: {
                month: event.$M+1,
                day: event.$D,
                year: event.$y
            },
            startTime: val.startTime,
            endTime: val.endTime
        })
    }

    // handles the start time 
    function handleStartTime(event) {
        setVal({
            title: val.title,
            name: val.name,
            location: val.location,
            pay: val.pay,
            description: val.description,
            category: val.category, 
            date: val.date,
            startTime: {
                hour: event.$H+1,
                min: event.$m
            },
            endTime: val.endTime
        })
    }

    // handles the end time
    function handleEndTime(event) {
        setVal({
            title: val.title,
            name: val.name,
            location: val.location,
            pay: val.pay,
            description: val.description,
            category: val.category, 
            date: val.date,
            startTime: val.startTime,
            endTime: {
                hour: event.$H+1,
                min: event.$m
            }
        })
    }

    const openPop = () => {
        setOpenStartPop(true)
    }

    const closePop = () => {
        empytyVals()
        handleError()
        setOpenStartPop(false)
    }

    const openNextPop = () => {
        if (val.title === '' || val.name === '' || val.location === '' || val.pay === 0) {
            handleError()
        } else {
            setError({
                titleError: val.title === '',
                nameError: val.name === '',
                locationError: val.location === '',
                valError: val.pay === '' || val.pay === 0,
                descriptionError: false,
                categoryError: false,
            })
            setOpenStartPop(false)
            setOpenSecondPop(true)
        }    
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
                                <TextField error={error.titleError} helperText={error.titleError ? "*This field is required" : ""} required={true} placeholder="Add the title you are hiring for" type="search" square={false} style={{width: '98.5%'}} onChange={(e) => {handleValues(e)}} id='title' value={val.title}/>
                            </div>
                            <div style={{paddingTop: '2.5%'}}>
                                <text className='pop-textfield-title'>
                                    Company or Employer Name
                                </text> <br></br>
                                <TextField error={error.nameError} helperText={error.nameError ? "*This field is required" : ""} required={true} placeholder="Add your or your company/department name" type="search" square={false} style={{width: '98.5%'}} onChange={(e) => {handleValues(e)}} id='name' value={val.name}/>
                            </div>
                            <div style={{paddingTop: '2.5%'}}>
                                <text className='pop-textfield-title'>
                                    Job Location
                                </text> <br></br>
                                <TextField error={error.locationError} helperText={error.locationError ? "*This field is required" : ""} required={true} placeholder="Add the job location" type="search" square={false} style={{width: '98.5%'}} onChange={(e) => {handleValues(e)}} id='location' value={val.location}/>
                            </div>
                            <div style={{paddingTop: '2.5%', display: 'flex'}}>
                                <div style={{width: '35%', paddingRight: '2.5%'}}>
                                    <text className='pop-textfield-title'>
                                        Pay 
                                    </text> <br></br>
                                    <TextField InputProps={{inputProps: {inputMode: 'numeric', pattern: '[0-9.]*'}}} error={error.payError} helperText={error.payError ? "*Invalid number" : ""} required={true} placeholder="$" type="search" square={false} className='pop-textfield-title' style={{width: '100%'}} onChange={(e) => {handleValues(e)}} id='pay' value={val.pay}/>
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
                {}
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
                        <div className='timeOuter' style={{width: '98.5%'}}>
                            <div className='date'>
                                <text className='pop-textfield-title'>
                                    Date
                                </text> <br></br>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        format="MM/DD/YYYY"
                                        value={dayjs(new Date(val.date.year, val.date.month-1, val.date.day))}
                                        onChange={(e) => {handleDate(e)}}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div className='startTime'>
                                <text className='pop-textfield-title'>
                                    Start Time
                                </text> <br></br>
                                <LocalizationProvider dateAdapter={AdapterDayjs} style={{float: 'right'}}>
                                    <TimePicker 
                                        defaultValue={dayjs("00:00:00", "HH:mm:ss")} 
                                        ampm 
                                        value={dayjs({hour: val.startTime.hour, minute: val.startTime.min})}
                                        onChange={(e) => {handleStartTime(e)}}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div>
                                <text className='pop-textfield-title'>
                                    End Time
                                </text> <br></br>
                                <LocalizationProvider dateAdapter={AdapterDayjs} style={{float: 'right'}}>
                                    <TimePicker 
                                        defaultValue={dayjs("00:00:00", "HH:mm:ss")} 
                                        ampm 
                                        value={dayjs({hour: val.endTime.hour, minute: val.endTime.min})}
                                        onChange={(e) => {handleEndTime(e)}}
                                    />
                                </LocalizationProvider>
                            </div>
                        </div>
                        <div style={{paddingTop: '2.5%'}}>
                            <text className='pop-textfield-title'>
                                Description
                            </text> <br></br>
                            <TextField error={error.descriptionError} helperText={error.descriptionError ? "*This field is required" : ""} required={true} multiline rows={8} placeholder="Add the job description" type="search" square={false} style={{width: '98.5%'}} onChange={(e) => {handleValues(e)}} id='description' value={val.description}/>
                        </div>
                        <div style={{paddingTop: '2.5%'}}>
                            <text className='pop-textfield-title'>
                                Category
                            </text> <br></br>
                            <TextField error={error.categoryError} helperText={error.categoryError ? "*This field is required" : ""} required={true} placeholder="" type="search" square={false} style={{width: '98.5%'}} onChange={(e) => {handleValues(e)}} id='category' value={val.category}/>
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
        handleError()
        if (!(error.titleError === true || error.nameError === true || error.locationError === true || error.payError === true || error.descriptionError === true || error.categoryError === true)) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: val.title,
                    job_poster: val.name,
                    description: val.description,
                    pay: val.pay,
                    location: val.location,
                    categories: val.category,
                    time: [new Date(val.date.year, val.date.month+1, val.date.day, val.startTime.hour, val.startTime.min), new Date(val.date.year, val.date.month+1, val.date.day, val.endTime.hour, val.endTime.min)],
                    job_type: "Quick Jobs",
                    date_posted: new Date()
                })
            }
            const route = "http://localhost:4000/api/jobs/create"
            fetch(route, requestOptions)
                .then((response) => {
                    response.json()
                    empytyVals()
                    setOpenStartPop(false)
                    setOpenSecondPop(false)
                })
                .catch((error) => {
                    console.log(error)
            })
        }
    }

    return (
        <div className='job-search-tab'> 
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
        </div>
    )
}