import React, { useState } from 'react';
import '../styles/JobPosting.css';

import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search'; 
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Dialog, DialogActions, DialogContent, DialogTitle, 
       DialogContentText, IconButton, TextField, CardContent, 
       Card, Grid, Chip, Divider, MenuItem, InputAdornment, 
       Box, Select, FormControl, FormHelperText, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import reject from '../images/Reject.png';
import accept from '../images/Accept.png';

import dayjs from 'dayjs';
var objectSupport = require("dayjs/plugin/objectSupport");
dayjs.extend(objectSupport);

export function JobPosting() {
    const [openStartPop, setOpenStartPop] = useState(false)
    const [openSecondPop, setOpenSecondPop] = useState(false)
    const [searchInput, setSearchInput] = useState("");

    const categories = ['Arts', 'Catering', 'Childcare', 'Data Entry', 'Eldercare',
                        'Focus Groups', 'Food Services', 'Graphic Design', 'Home Services', 'IT Help',
                        'Moving', 'Music & Theatre', 'Office Help', 'Party Help', 'Pet Care',
                        'Research', 'Sales & Marketing', 'Snow Shoveling', 'Tutoring', 'Yardwork'
                        ]
    const [expand, setExpand] = useState(false)
    const [error, setError] = useState({
        titleError: false,
        nameError: false,
        locationError: false,
        payError: false,
        descriptionError: false,
        categoryError: false,
        dateError: false,
        startTimeError: false,
        endTimeError: false,
    });
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [selectedDate, setSelectedDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    
    // useState for the data
    const [val, setVal] = useState({
        title: '',
        name: '',
        location: '',
        pay: '',
        description: '',
        category: new Set(),
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
        },
        times: []
    })

    // resets the data 
    function empytyVals() {
        setVal({
            title: '',
            name: '',
            location: '',
            pay: 0,
            description: '',
            category: new Set(),
            date: {
                month: new Date().getMonth()+1,
                day: new Date().getDate(),
                year: new Date().getFullYear()
            },
            startTime: {
                hour: '0',
                min: '0',
            },
            endTime: {
                hour: '0',
                min: '0',
            },
            times: [],
        });
        setSelectedDate(null);
        setStartTime(null);
        setEndTime(null);
        setSelectedCategories([]);
    }

    // handles the errors
    function handleError() {
        const isToday = selectedDate && dayjs(selectedDate).isSame(dayjs(), 'day');
        const isStartTimeInvalid = startTime && isToday && dayjs(startTime).isBefore(dayjs());
        const isEndTimeInvalid = startTime && endTime && dayjs(endTime).isBefore(dayjs(startTime));
    
        setError({
            titleError: val.title === '',
            nameError: val.name === '',
            locationError: val.location === '',
            payError: val.pay === '' || val.pay === 0,
            descriptionError: val.description === '',
            categoryError: selectedCategories.length === 0,
            dateError: !selectedDate,
            startTimeError: !startTime || isStartTimeInvalid,
            endTimeError: !endTime || isEndTimeInvalid,
        })
    }

    // changes the vals for all except date, time, and search components
    function handleValues(event) {
        const { id, value } = event.target;

        setVal(prevVal => {
            let updatedVal = { ...prevVal };

            if (id === 'pay') {
                const re = /^[0-9]*(\.[0-9]{0,2})?$/;
                if (value === "" || (re.test(value) && parseFloat(value) >= 0)) {
                    updatedVal.pay = value;
                }
            } else {
                updatedVal[id] = value;
            }

            return updatedVal;
        });

        setError(prevError => {
            return {
                ...prevError,
                [`${id}Error`]: value.trim() === '' 
            };
        });
    }
    

    // handles the category change
    const handleCategoryChange = (event) => {
        const selected = event.target.value;
        setSelectedCategories(selected);
    
        setError(prevError => ({
            ...prevError,
            categoryError: selected.length === 0
        }));
    };
    

   // handles the delete category
   const handleDeleteCategory = (categoryToDelete) => {
       setSelectedCategories((categories) => categories.filter((category) => category !== categoryToDelete));
   };

    // handles the date calendar data
    function handleDate(event) {
        const newDate = dayjs(event);
        setSelectedDate(newDate);
    
        setVal(prevVal => ({
            ...prevVal,
            date: {
                month: newDate.month() + 1, 
                day: newDate.date(),
                year: newDate.year()
            },
            startTime: prevVal.startTime,
            endTime: prevVal.endTime
        }));
    
        setError(prevError => ({
            ...prevError,
            dateError: !newDate.isValid()
        }));
    }

    // handles the start time
    function handleStartTime(time) {
        const newStartTime = dayjs(time);
        setStartTime(newStartTime);
    
        setVal(prevVal => ({
            ...prevVal,
            startTime: {
                hour: newStartTime.hour(),
                min: newStartTime.minute()
            }
        }));
    
        const isToday = selectedDate && dayjs(selectedDate).isSame(dayjs(), 'day');
        const isStartTimeInvalid = newStartTime && isToday && dayjs(newStartTime).isBefore(dayjs());

        setError(prevError => ({
            ...prevError,
            startTimeError: !newStartTime.isValid() || isStartTimeInvalid
        }));
    }
    
    // handles the end time
    function handleEndTime(time) {
        const newEndTime = dayjs(time);
        setEndTime(newEndTime);
    
        setVal(prevVal => ({
            ...prevVal,
            endTime: {
                hour: newEndTime.hour(),
                min: newEndTime.minute()
            }
        }));
    
        setError(prevError => ({
            ...prevError,
            endTimeError: !newEndTime.isValid() || (startTime && newEndTime.isBefore(dayjs(startTime)))
        }));
    }

    // opens the pop up
    const openPop = () => {
        if (token) {
            setOpenStartPop(true)
        } else {
            toast.dismiss()
            toast.error('Please login to post!', {
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
        }
    }

    // closes the pop up
    const closePop = () => {
        empytyVals()
        setError({ 
            titleError: false,
            nameError: false,
            locationError: false,
            payError: false,
            descriptionError: false,
            categoryError: false,
            dateError: false,
            startTimeError: false,
            endTimeError: false,
        });
        setOpenStartPop(false)
    }

    // opens the next pop up
    const openNextPop = () => {
        if (val.title === '' || val.name === '' || val.location === '' || val.pay === '' || parseFloat(val.pay) <= 0) {
            handleError();
        } else {
            setError({
                titleError: val.title === '',
                nameError: val.name === '',
                locationError: val.location === '',
                valError: false,
                descriptionError: false,
                categoryError: false,
            })
            setOpenStartPop(false)
            setOpenSecondPop(true)
        }    
    }

    // closes the next pop up
    const closeNextPop = () => {
        empytyVals()
        setError({
            titleError: false,
            nameError: false,
            locationError: false,
            payError: false,
            descriptionError: false,
            categoryError: false,
            dateError: false,
            startTimeError: false,
            endTimeError: false,
        });
        setOpenSecondPop(false)
    }

    // goes back to the first pop up
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

    // first job slide
    const firstJobSlide = () => {
        return (
            <Dialog open={openStartPop} onClose={closePop} maxWidth={"890px"} PaperProps={{sx: { borderRadius: "15px",}}}>
                <div className='popup-title' style={{paddingRight: '17px', paddingLeft: '17px'}}>
                    <DialogTitle style={{width: "98%", fontFamily: 'Outfit', fontSize: '20px', fontWeight: 500, color: '#4A4FE4'}}> 
                        Tell us more about the job!
                    </DialogTitle>
                    <IconButton onClick={closePop} style={{color: '#4A4FE4', marginLeft: '-82px'}}>
                        <ClearIcon/>
                    </IconButton>
                </div>

                <Divider/>
        
                <DialogContent>
                    <DialogContentText ref={descriptionElementRefStartPop} tabIndex={-1} style={{width: '821px', marginTop: '-2px', marginBottom: '4px', paddingRight: '17px', paddingLeft: '17px'}}>
                        <div>
                            <text className='pop-textfield-title' style={{fontFamily: 'Outfit', fontSize: '14px', color: 'black'}}>
                                Job title
                                <span style={{"color": "red"}}>*</span>
                            </text> <br></br>
                            <TextField error={error.titleError} helperText={error.titleError ? "*This field is required" : ""} required={true} placeholder="Add the title you are hiring for" type="search" square={false} style={{width: '100%'}} FormHelperTextProps={{ style: { fontFamily: 'Outfit', fontSize: '14px', }}} onChange={(e) => {handleValues(e)}} id='title' value={val.title}
                                InputProps={{
                                    style: {  borderRadius: '10px', fontFamily: 'Outfit', fontSize: '14px' }
                                }}
                            />
                        </div>
                        <div style={{paddingTop: '18px'}}>
                            <text className='pop-textfield-title' style={{fontFamily: 'Outfit', fontSize: '14px', color: 'black'}}>
                                Company or Employer Name
                                <span style={{"color": "red"}}>*</span>
                            </text> <br></br>
                            <TextField error={error.nameError} helperText={error.nameError ? "*This field is required" : ""} required={true} placeholder="Add your or your company/department name" type="search" square={false} style={{width: '100%'}} FormHelperTextProps={{ style: { fontFamily: 'Outfit', fontSize: '14px' }}} onChange={(e) => {handleValues(e)}} id='name' value={val.name}
                                InputProps={{
                                    style: {  borderRadius: '10px', fontFamily: 'Outfit', fontSize: '14px' }
                                }}
                            />
                        </div>
                        <div style={{paddingTop: '18px'}}>
                            <text className='pop-textfield-title' style={{fontFamily: 'Outfit', fontSize: '14px', color: 'black'}}>
                                Job Location
                                <span style={{"color": "red"}}>*</span>
                            </text> <br></br>
                            <TextField error={error.locationError} helperText={error.locationError ? "*This field is required" : ""} required={true} placeholder="Add the job location" type="search" square={false} style={{width: '100%'}} FormHelperTextProps={{ style: { fontFamily: 'Outfit', fontSize: '14px' }}} onChange={(e) => {handleValues(e)}} id='location' value={val.location}
                                InputProps={{
                                    style: {  borderRadius: '10px', fontFamily: 'Outfit', fontSize: '14px' }
                                }}
                            />
                        </div>
                        <div style={{paddingTop: '18px', display: 'flex'}}>
                            <div style={{width: '25%', paddingRight: '2.5%'}}>
                                <text className='pop-textfield-title' style={{fontFamily: 'Outfit', fontSize: '14px', color: 'black'}}>
                                    Total Payment
                                    <span style={{"color": "red"}}>*</span>
                                </text> <br></br>
                                <TextField InputProps={{style: {  borderRadius: '10px', fontFamily: 'Outfit', fontSize: '14px' }, inputProps: {inputMode: 'numeric', pattern: '[0-9.]*'}, startAdornment: <InputAdornment position="start"> <span style={{ fontFamily: 'Outfit', fontSize: '14px' }}>$</span></InputAdornment>}} error={error.payError} helperText={error.payError ? "*Invalid number" : ""} required={true} placeholder="00.00" type="search" square={false} className='pop-textfield-title' style={{width: '100%'}} FormHelperTextProps={{ style: { fontFamily: 'Outfit', fontSize: '14px', }}} onChange={(e) => {handleValues(e)}} id='pay' value={val.pay}/>
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <Divider/>
                    <DialogActions style={{paddingRight: '40px', marginTop: '5px', marginBottom: '5px'}}>
                        <Card sx={{height: '40px', width: '85.5px'}} square={false} style={{overflow:'hidden', borderRadius: '8px', color: '#5B5B5B', border: "1px solid #5B5B5B", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <CardContent style={{marginTop: '7px', fontFamily: 'Outfit', fontSize: '16px', cursor:'pointer'}} onClick={closePop}> 
                                Cancel
                            </CardContent>
                        </Card>
                        <Card sx={{height: '40px', width: '71px'}} square={false} style={{overflow:'hidden', borderRadius: '8px', background: "#4A4FE4", color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CardContent style={{marginTop: '7px', fontFamily: 'Outfit', fontSize: '16px', cursor:'pointer'}} onClick={openNextPop}> 
                                Next
                            </CardContent>
                        </Card>
                    </DialogActions>
            </Dialog>
        )
    }

    // second job slide
    const secondJobSlide = () => {
        return (
            <Dialog open={openSecondPop} onClose={closeNextPop} maxWidth={"890px"} PaperProps={{sx: { borderRadius: "15px"}}}>
                <div className='popup-title' style={{paddingRight: '17px', paddingLeft: '17px'}}>
                    <DialogTitle style={{width: "98%", fontFamily: 'Outfit', fontSize: '20px', fontWeight: 500, color: '#4A4FE4'}}> 
                        Tell us more about the job!
                    </DialogTitle>
                    <IconButton onClick={closeNextPop} style={{color: '#4A4FE4', marginLeft: '-82px'}}> 
                        <ClearIcon/>
                    </IconButton>
                </div>

                <Divider/>

                <DialogContent>
                    <DialogContentText ref={descriptionElementRefStartPop} tabIndex={-1} style={{width: '821px', marginTop: '-2px', marginBottom: '4px', paddingRight: '17px', paddingLeft: '17px'}}>

                        <div className='time-outer' style={{width: '100%'}}> 
                            <div className='date'>
                                <text className='pop-textfield-title' style={{fontFamily: 'Outfit', fontSize: '14px', color: 'black'}}>
                                    Date
                                    <span style={{"color": "red"}}>*</span>
                                </text> <br></br>
                                <FormControl error={error.dateError}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        value={selectedDate}
                                        onChange={(newValue) => {
                                            handleDate(newValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} style={{ fontFamily: 'Outfit', fontSize: '14px', borderRadius: '10px' }}/>
                                        )}
                                        sx={{
                                            '.MuiInputBase-input': {
                                                fontFamily: 'Outfit', 
                                                fontSize: '14px',
                                            },
                                            '.MuiOutlinedInput-root': { 
                                                borderRadius: '10px',
                                            },
                                        }}
                                        minDate={dayjs(new Date())}
                                    />
                                </LocalizationProvider>
                                {error.dateError && (
                                    <FormHelperText style={{ fontFamily: 'Outfit', fontSize: '14px' }}>
                                        *Invalid Date
                                    </FormHelperText>
                                )}
                                </FormControl>
                            </div>
                            <div className='start-time'>
                                <text className='pop-textfield-title' style={{fontFamily: 'Outfit', fontSize: '14px', color: 'black'}}>
                                    Start Time
                                    <span style={{"color": "red"}}>*</span>
                                </text> <br></br>
                                <FormControl error={error.startTimeError}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} style={{float: 'right',}}>
                                        <TimePicker 
                                            value={startTime}
                                            onChange={(newValue) => {
                                                handleStartTime(newValue);
                                            }}
                                            renderInput={(params) => (
                                                <TextField {...params} style={{ fontFamily: 'Outfit', fontSize: '14px', borderRadius: '10px' }}/>
                                            )}
                                            ampm={true}
                                            sx={{
                                                '.MuiInputBase-input': {
                                                    fontFamily: 'Outfit', 
                                                    fontSize: '14px',
                                                },
                                                '.MuiOutlinedInput-root': { 
                                                    borderRadius: '10px',
                                                    borderColor: error.dateError ? 'red' : undefined
                                                },
                                            }}
                                            minTime={dayjs(selectedDate).isSame(dayjs(), 'day') ? dayjs().add(1, 'minute') : undefined}
                                        />
                                    </LocalizationProvider>
                                    {error.startTimeError && (
                                        <FormHelperText style={{ fontFamily: 'Outfit', fontSize: '14px' }}>
                                            *Invalid Start
                                        </FormHelperText>
                                    )}
                                    </FormControl>
                            </div>
                            <div>
                                <text className='pop-textfield-title' style={{fontFamily: 'Outfit', fontSize: '14px', color: 'black'}}> 
                                    End Time
                                    <span style={{"color": "red"}}>*</span>
                                </text> <br></br>
                                <FormControl error={error.endTimeError}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} style={{float: 'right', }}>
                                        <TimePicker 
                                            value={endTime}
                                            onChange={(newValue) => {
                                                handleEndTime(newValue);
                                            }}
                                            renderInput={(params) => (
                                                <TextField {...params} style={{ fontFamily: 'Outfit', fontSize: '14px', borderRadius: '10px' }}/>
                                            )}
                                            ampm={true}
                                            sx={{
                                                '.MuiInputBase-input': {
                                                    fontFamily: 'Outfit', 
                                                    fontSize: '14px',
                                                },
                                                '.MuiOutlinedInput-root': { 
                                                    borderRadius: '10px',
                                                },
                                            }}
                                            minTime={dayjs(selectedDate).isSame(dayjs(), 'day') ? dayjs().add(1, 'minute') : undefined}
                                        />
                                    </LocalizationProvider>
                                    {error.endTimeError && (
                                        <FormHelperText style={{ fontFamily: 'Outfit', fontSize: '14px',}}>
                                            *Invalid End
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </div>
                  
                    
                        </div>
                      
                        <div style={{paddingTop: '18px'}}>
                            <text className='pop-textfield-title' style={{fontFamily: 'Outfit', fontSize: '14px', color: 'black'}}>
                                Description
                                <span style={{"color": "red"}}>*</span>
                            </text> <br></br>
                            <TextField error={error.descriptionError} helperText={error.descriptionError ? "*This field is required" : ""} required={true} multiline rows={6} placeholder="Add the job description" type="search" square={false} style={{width: '100%'}} FormHelperTextProps={{ style: { fontFamily: 'Outfit', fontSize: '14px' }}} onChange={(e) => {handleValues(e)}} id='description' value={val.description}
                                InputProps={{
                                    style: {  borderRadius: '10px', fontFamily: 'Outfit', fontSize: '14px' }
                                }}
                            />
                        </div>
                        <div style={{ paddingTop: '18px',  }} >
                            <text className='pop-textfield-title' style={{fontFamily: 'Outfit', fontSize: '14px', color: 'black'}}>
                                Category
                                <span style={{"color": "red"}}>*</span>
                            </text> <br></br>
                            <FormControl style={{ width: '100%' }} error={error.categoryError}>
                                <Select
                                    multiple
                                    displayEmpty
                                    open={expand}
                                    onOpen={() => setExpand(true)}
                                    onClose={() => setExpand(false)}
                                    value={selectedCategories}
                                    onChange={handleCategoryChange}
                                    renderValue={() => <span style={{ fontFamily: 'Outfit', fontSize: '14px' }}>+ Add Categories</span>}
                                    style={{ fontFamily: 'Outfit', borderRadius: '10px' }} 
                                    MenuProps={{ PaperProps: { style: { maxHeight: '18%' }, }, }}
                                >
                                    {categories.map((name) => (
                                        <MenuItem key={name} value={name} style={{ fontFamily: 'Outfit', fontSize: '14px' }}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {error.categoryError && (
                                    <FormHelperText style={{ fontFamily: 'Outfit', fontSize: '14px' }}>
                                        *This field is required
                                    </FormHelperText>
                                )}
                            </FormControl>   
                            <div style={{ display: 'flex', flexWrap: 'wrap', paddingTop: '5px' }}>
                                {selectedCategories.map((value) => (
                                    <Chip
                                        key={value}
                                        label={value}
                                        onDelete={() => handleDeleteCategory(value)}
                                        deleteIcon={<span style={{ fontFamily: 'Outfit', fontSize: '14px', color: 'white', fontWeight: 500, paddingRight: '4px' }}>X</span>}
                                        style={{ margin: '2px', fontFamily: 'Outfit', fontSize: '14px', borderRadius: '10px', backgroundColor: '#A0A4FF', color: 'white' }}
                                    />
                                ))}
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>

                <Divider style={{marginTop: '-4px'}}/>

                <DialogActions style={{paddingRight: '40px', marginTop: '5px', marginBottom: '5px'}}>
                    <Card sx={{height: '40px', width: '71'}} square={false} style={{overflow:'hidden', borderRadius: '8px', color: '#5B5B5B', border: "1px solid #5B5B5B", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <CardContent style={{ marginTop: '7px', fontFamily: 'Outfit', fontSize: '16px', cursor:'pointer'}} onClick={backSecondPop}> 
                            Back
                        </CardContent>
                    </Card>
                        <Card sx={{height: '40px', width: '85.5px'}} square={false} style={{overflow:'hidden', borderRadius: '8px', background: "#4A4FE4", color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CardContent style={{ marginTop: '7px', fontFamily: 'Outfit', fontSize: '16px', cursor:'pointer'}} onClick={PostJobs}> 
                            Submit
                        </CardContent>
                    </Card>
                </DialogActions>
            </Dialog>
        )
    }

    // posts the job
    async function PostJobs() {
        const hasTitleError = val.title === '';
        const hasNameError = val.name === '';
        const hasLocationError = val.location === '';
        const hasPayError = val.pay === '' || parseFloat(val.pay) <= 0;
        const hasDescriptionError = val.description === '';
        const hasCategoryError = selectedCategories.length === 0;
        const hasDateError = !selectedDate;

        const isToday = selectedDate && dayjs(selectedDate).isSame(dayjs(), 'day');
        const isStartTimeInvalid = startTime && isToday && dayjs(startTime).isBefore(dayjs());
        const isEndTimeInvalid = !endTime || (startTime && endTime && dayjs(endTime).isBefore(dayjs(startTime)));

        setError({
            titleError: hasTitleError,
            nameError: hasNameError,
            locationError: hasLocationError,
            payError: hasPayError,
            descriptionError: hasDescriptionError,
            categoryError: hasCategoryError,
            dateError: hasDateError,
            startTimeError: isStartTimeInvalid,
            endTimeError: isEndTimeInvalid,
        });

        if (hasTitleError || hasNameError || hasLocationError || hasPayError || hasDescriptionError || hasCategoryError || hasDateError || isStartTimeInvalid || isEndTimeInvalid) {
            return;
        }

        handleError()
        if (!(error.titleError === true || error.nameError === true || error.locationError === true || error.payError === true || error.descriptionError === true || error.categoryError === true)) {
            console.log('val.date:', val.date);
            console.log('val.startTime:', val.startTime);
            console.log('val.endTime:', val.endTime);
            const categoryList = selectedCategories; 
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: val.title,
                    job_poster: val.name,
                    description: val.description,
                    pay: val.pay,
                    location: val.location,
                    categories: categoryList,
                    time: [new Date(val.date.year, val.date.month-1, val.date.day, val.startTime.hour, val.startTime.min), new Date(val.date.year, val.date.month-1, val.date.day, val.endTime.hour, val.endTime.min)],
                    job_type: "Quick Jobs",
                    date_posted: new Date(),
                    poster_email: localStorage.getItem("email")
                })
            }
            const route = "https://jiffyjobs-api-production.up.railway.app/api/jobs/create"
            console.log(requestOptions)
            fetch(route, requestOptions)
                .then((response) => {
                    response.json()
                    toast.dismiss()
                    toast.success('Your job has been posted!', {
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
                    empytyVals()
                    setOpenStartPop(false)
                    setOpenSecondPop(false)
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error)
            })
        }
    }
    

    return {
        searchInput,
        renderJobPosting: (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Box style={{paddingTop: '3.9px', width: '1128px'}}> 
                    <div className='inner-div' style={{marginBottom: '8px', }}>
                        <Card elevation={4} style={{ overflow: 'hidden', borderRadius: '15px', textAlign: 'center', height: '222px', width: '1128px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ marginBottom: '29px' }}> 
                                    <text className='job-search-text' style={{}}> 
                                        Find jobs or hire college students starting now with <span className='job-search-logo' style={{color: '#4A4FE4'}}>JIFFYJOBS</span>
                                    </text>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '23px' }}>
                                    <TextField 
                                        placeholder="Search Jobs..." 
                                        type="search"  
                                        style={{ width: '332px', }} 
                                        value={searchInput} 
                                        onChange={(e) => {setSearchInput(e.target.value)}}
                                        onKeyDown={(e) => {
                                            // if (e.key === 'Enter') {
                                            //     handleSearchClick();
                                            // }
                                            // console.log(e)
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Button onClick={() => {}} style={{ borderRadius: '8px', background: "#4348DB", color: 'white', minWidth: '47px', height: '47px', padding: '0', marginRight: '-6px'}}>
                                                        <SearchIcon />
                                                    </Button>
                                                </InputAdornment>
                                            ),
                                            style: {  borderRadius: '11px', fontFamily: 'Outfit', fontSize: '18px', backgroundColor: '#EFEFEF', color: '#141414' }
                                        }}
                                    />
                                    <Card sx={{ width: '140px', height: '58px' }} style={{borderRadius: '8px', background: "#4348DB", color: 'white', display: 'flex', justifyContent: 'center', cursor:'pointer'}}>
                                        <CardContent onClick={openPop} style={{marginTop: '2px', fontFamily: 'Outfit', fontSize: '18px', fontWeight: 400}}> 
                                            Post a Job
                                        </CardContent>
                                    </Card>
                                </div>
                                { openSecondPop ? secondJobSlide() : firstJobSlide() }
                            </div>
                        </Card>
                    </div>
                </Box>
            </div>
        )
    }
}