import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { Divider } from '@mui/material';
import { Filter } from '../components/Filter';
import { Sort } from '../components/Sort';
import { JobPosting } from '../components/JobPosting';

export function JobBoard() {
    const [jobData, setJobData] = useState([])
    const [rawData, setRawData] = useState([]);
    const [size, setSize] = useState(0)
    const [background, setBackground] = useState("")

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
                        return [[0, obj.title], ["", "Job Provider: " + obj.job_poster], ["", "Location: " + obj.location], ["", "Pay: $" + obj.pay], ["", "Category: " + obj.categories]]
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
        // if (categoryList.value.length === 0)
        GetAllJobs()
    }, []);

    // handles filtering job
    useEffect(() => {
        async function FilterJobs() {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    // "job_category": categoryList
                })
            }
            const route = "http://localhost:4000/api/jobs/filter/jobs"
            fetch(route, requestOptions)
                .then((data) => {
                    setJobData(data.map(function(obj) {
                        return [[0, obj.title], ["", "Job Provider: " + obj.job_poster], ["", "Location: " + obj.location], ["", "Pay: $" + obj.pay], ["", "Category: " + obj.categories]]
                    }))
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
        
        // if (categoryList.value.length >= 1)
        //     FilterJobs()
    }, [])

    // handles posting jobs
    
    // const handleLogJobData = () => {
    //     console.log('rawdata: ', rawData);
    //     console.log('jobdata: ', jobData);
    // }
    
    return (
        <div className={'job-board-outer' + background}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid item xs={12}>
                    <Grid container className='job-table-grid' rowSpacing={2} columnSpacing={2}>
                        <JobPosting> </JobPosting>
                        
                        <text style={{width: "100%"}} className='recently-posted-jobs'> 
                            Job Board
                        </text>
                        
                        <text style={{width: "100%"}} className='recently-posted-jobs'>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                                <Filter />
                                <div style={{ marginLeft: 'auto', marginRight: '8%' }}>
                                <Sort rawData={rawData} setRawData={setRawData} setJobData={setJobData} />
                                </div>
                            </div>
                            <Divider style={{ paddingTop: '1%', width: '92.5%'}}/>
                        </text>
                        {/* <button onClick={handleLogJobData}>Log Job Data</button> */}

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