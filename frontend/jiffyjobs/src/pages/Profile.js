import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export function Profile() {

    const userEmail = "Hello_world@bu.edu";
    // change this when we implement login
    useEffect(() => {
        async function getprofile(userID) {
            const route = "http://localhost:4000/api/users/getinfo/" + userID
            fetch(route)
                .then((response) => {
                    if (!response.ok) {
                        console.log(response);
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("heloo worlddddd" + data)
                }) 

        }
        if (userEmail) {
            getprofile(userEmail)
        }
    })

    return (

        <div className={'profile-background'}>
        <Box sx={{ flexGrow: 1 }}>
            <Grid item xs={12}>
                <Grid container className='job-table-grid' rowSpacing={2} columnSpacing={2}>
                    <text style={{width: "100%"}} className='recently-posted-jobs'> 
                    <Card elevation={3} sx={{ p: 2, borderRadius: '15px', maxWidth: 900, mx: "auto" }}> 
                             <Typography variant="h5" component="h2" sx={{ textAlign: 'center', mb: 2 }}>
                                 Edit Profile
                             </Typography>
                             <text style={{width: "100%"}} className='recently-posted-jobs'> 
                                Basic Information
                            </text>
                            
                        </Card>
                    </text>
                </Grid>
            </Grid>   
        </Box>
    </div>
    );
}
