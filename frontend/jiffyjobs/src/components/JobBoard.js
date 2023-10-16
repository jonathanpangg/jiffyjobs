import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import { Divider } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export function JobBoard() {
    const [jobData, setJobData] = useState([])
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
            descriptionElement.focus();
        }
        }
    }, [open]);

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
                    setJobData (data.map(function(obj) {
                        return [[0, obj.title], ["", "Job Provider: " + obj.job_poster], ["", "Location: " + obj.location], ["", "Pay: $" + obj.pay]]
                    }))
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        GetAllJobs()
    }, [jobData]);

    return (
        <div className='job-board-outer'>
            <Box sx={{ flexGrow: 1 }}>
                <Grid item xs={12}>
                    <Grid container className='job-table-grid' rowSpacing={0} columnSpacing={2}>
                        <Grid item className='job-search-tab'> 
                            <Card sx={{height: 200, width: 1250}} elevation={8} square={false} style={{overflow: 'hidden', borderRadius: '15px', paddingTop: '3.5%'}}>
                                <text className='job-search-text'> 
                                    Find jobs or hire college students starting now with {" "}
                                </text>
                                <text className='job-search-logo'>
                                    JIFFYJOBS
                                </text>
                                <br></br>
                                <Grid container className='job-table-grid' columnSpacing={2} style={{paddingLeft: '30%', paddingTop: '1.5%'}}> 
                                    <TextField placeholder="Find Jobs..." type="search" square={false} style={{width: '45%'}}/>
                                    <Grid className='job-button'>
                                        <Card sx={{height: 55, width: '100%'}} elevation={8} square={false} style={{overflow:'hidden', borderRadius: '15px', background: "#8253E7", color: 'white'}}>
                                            <CardContent style={{ display: 'flex', alignItems: 'center' }} onClick={handleClickOpen}> 
                                                Post a Job
                                            </CardContent>
                                        </Card>
                                        <Dialog open={open} onClose={handleClose} maxWidth={"1000px"} PaperProps={{sx: { borderRadius: "15px"}}}>
                                            <div className='popup-title'>
                                                <DialogTitle style={{width: "90%"}}> 
                                                    Tell us more about the job!
                                                </DialogTitle>
                                                <IconButton onClick={handleClose}>
                                                    <ClearIcon/>
                                                </IconButton>
                                            </div>
                                            <Divider/>
                                                <DialogContent>
                                                    <DialogContentText ref={descriptionElementRef} tabIndex={-1} style={{width: '1000px'}}>
                                                        <div>
                                                            <text className='pop-textfield-title'>
                                                                Job Title
                                                            </text> <br></br>
                                                            <TextField required placeholder="" type="search" square={false} style={{width: '100%'}}/>
                                                        </div>
                                                        <div style={{paddingTop: '2.5%'}}>
                                                            <text className='pop-textfield-title'>
                                                                Company or Employer Name
                                                            </text> <br></br>
                                                            <TextField required placeholder="" type="search" square={false} style={{width: '100%'}}/>
                                                        </div>
                                                        <div style={{paddingTop: '2.5%'}}>
                                                            <text className='pop-textfield-title'>
                                                                Job Location
                                                            </text> <br></br>
                                                            <TextField required placeholder="" type="search" square={false} style={{width: '100%'}}/>
                                                        </div>
                                                        <div style={{paddingTop: '2.5%', display: 'flex'}}>
                                                            <div style={{width: '32%', paddingRight: '2.5%'}}>
                                                                <text className='pop-textfield-title'>
                                                                    Pay
                                                                </text> <br></br>
                                                                <Select style={{width: '100%'}} className='pop-textfield-title'>
                                                                    <MenuItem value={"Hourly"}> Hourly </MenuItem>
                                                                    <MenuItem value={"Daily"}> Daily </MenuItem>
                                                                </Select>
                                                            </div>
                                                            <div style={{width: '32%', paddingRight: '2.5%'}}>
                                                                <text className='pop-textfield-title'>
                                                                    Pay Range
                                                                </text> <br></br>
                                                                <TextField required placeholder="Enter minimum range" type="search" square={false} className='pop-textfield-title' style={{width: '100%'}}/>
                                                            </div>
                                                            <div style={{width: '32%'}}>
                                                                <br></br>
                                                                <TextField required placeholder="Enter maximum range" type="search" square={false} className='pop-textfield-title' style={{width: '100%'}}/>
                                                            </div>
                                                        </div>
                                                    </DialogContentText>
                                                </DialogContent>
                                            <Divider/>
                                            <DialogActions>
                                                <Card sx={{height: 50, width: '10%'}} square={false} style={{overflow:'hidden', borderRadius: '15px', color: 'black', border: "1px solid black"}}>
                                                    <CardContent style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={handleClose}> 
                                                        Back
                                                    </CardContent>
                                                </Card>
                                                <Card sx={{height: 50, width: '10%'}} square={false} style={{overflow:'hidden', borderRadius: '15px', background: "gray", color: 'white'}}>
                                                    <CardContent style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={handleClickOpen}> 
                                                        Next
                                                    </CardContent>
                                                </Card>
                                            </DialogActions>
                                        </Dialog>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        
                        <text style={{width: "100%"}} className='recently-posted-jobs'> 
                            Recently Posted Jobs
                        </text> 
                        {jobData.map((key) => (
                            <Grid key={key} item>
                                <Card sx={{height: 300, width: 300}} elevation={8} square={false} style={{overflow:'hidden', borderRadius: '15px'}}>
                                    {key.map((data) => (
                                        <text className={'card-grid-' + data[0]}>
                                            {data[1]} <br></br>
                                        </text>
                                    ))}
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>   
            </Box>
        </div>
    )
}