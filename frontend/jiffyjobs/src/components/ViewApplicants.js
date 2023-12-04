import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';
import { Box, Grid, Avatar } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle';

export function ViewApplicants({children, jobID}) {
    const [applicantData, setApplicantData] = useState([]) 

    const getInitials = (first_name, last_name) => {
        if (first_name && last_name) {
            return first_name[0] + last_name[0]
        }
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
                        return [count++, obj.personal_info.first_name, obj.personal_info.last_name,]
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
        <div>
            <div className='header-one'>
                Applicants
            </div>
            <div className='header-two'>
                See the list of applicants and accept or reject them!
            </div>
            <Box className='progress-box'>
                <Grid container className='progress-grid' rowSpacing={0} columnSpacing={3} width='900px' style={{paddingBottom: '1%'}}>
                    { applicantData.map((key) => {
                        return (
                            <Grid width='900px' key={key} item> 
                                <div style={{display: 'flex', width: '92.5%', height: '50px', alignItems: 'center', fontFamily: 'Outfit', border: '1px solid #D9D9D9', borderTopLeftRadius: key[0] === 0 ? '10px': '0px', borderTopRightRadius: key[0] === 0 ? '10px': '0px', borderBottomLeftRadius: key[0] === applicantData.length-1 ? '10px': '0px', borderBottomRightRadius: key[0] === applicantData.length-1 ? '10px': '0px'}}>
                                    <Avatar sx={{ bgcolor: "#cccccc", color: "#5B5B5B", width: '26px', height: '26px', fontSize: '16px', fontFamily: 'Outfit', marginLeft: '25px', marginRight: '13px'}}>{ getInitials(key[1], key[2]) }</Avatar>
                                    <u style={{fontSize: '16px'}}> {key[1] + " " + key[2]} </u>
                                    <CircleIcon style={{width: '5px', height: '5px', marginLeft: '6px', marginRight: '6px', color: '#5B5B5B'}}/>
                                    <div style={{fontSize: '12px', color: '#5B5B5B'}}> Click to view Profile </div>
                                    <div style={{display: 'flex', position: 'absolute', right: 300}}>
                                        <div style={{display: 'flex', position: 'relative', width: '60.5px', height: '26.25px', fontSize: '12px', color: '#FFFFFF', alignItems: 'center', justifyContent: 'center', backgroundColor: "#66C120", borderRadius: '6px', marginRight: '8.5px'}}> Accept </div>
                                        <div style={{display: 'flex', position: 'relative', width: '60.5px', height: '26.25px', fontSize: '12px', color: '#FFFFFF', alignItems: 'center', justifyContent: 'center', backgroundColor: "#C12020", borderRadius: '6px'}}> Reject </div>
                                    </div>
                                </div>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
        </div>
    )
}