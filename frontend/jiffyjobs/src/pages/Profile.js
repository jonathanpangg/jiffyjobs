import React, { useEffect, useState } from 'react';
import { Box, Card, Grid, Container, Typography, TextField, Button, FormControlLabel, Checkbox, Avatar, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import '../styles/profile.css'
import { deepOrange } from '@mui/material/colors';


export function Profile() {
    const [UserEmailstate, setuserEmail] = useState("");
    const [userPassword, setuserPassword] = useState("");


    const [personalInfo, setpersonalInfo] = useState({});

    const userEmail = "Hello_world@bu.edu"; // This will eventually come from user login state

    useEffect(() => {
        // Fetch user profile data from the API and set it to state
        // Replace with your actual API request
        const getProfile = async (userID) => {
            const route = `http://localhost:4000/api/users/getinfo/${userID}`;
            try {
                const response = await fetch(route);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // Set the data to the state here

                setuserEmail(data.email)
                setuserPassword(data.password)
                setpersonalInfo(data.personal_info)
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        if (userEmail) {
            getProfile(userEmail);
        }
    }, []);



    //   const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setProfileData(prevData => ({
    //         ...prevData,
    //         [name]: value,
    //     }));
    // };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you would typically send the profileData state to the server
    };

    const getInitials = (name) => {
        return name.split(' ').map((n) => n[0]).join('');
    };

    return (

        <div className={'profile-background'}>
        <Box sx={{ flexGrow: 1 }}>
            <Grid item xs={12}>
                <Grid container className='job-table-grid' rowSpacing={2} columnSpacing={2}>
                    <text style={{width: "100%"}} className='recently-posted-jobs'> 
                    <Card elevation={3} sx={{ p: 2, borderRadius: '15px', maxWidth: 1200, mx: "auto" }}> 
                             <Typography variant="h5" component="h2" sx={{ textAlign: 'left', mb: 2, fontFamily: 'Outfit', fontWeight: "88px", marginLeft: "50px", marginTop: "15px" }}>
                                 Edit Profile
                             </Typography>
                             <text className='basicinformation'>
                                Basic Information
                            </text>


                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar sx={{ bgcolor: "lightgray", marginRight: 2, color: "black", marginLeft: 10, width: 56, height: 56, fontSize: '1.9rem'  }}>{getInitials(personalInfo.first_name + " " + personalInfo.last_name)}</Avatar>
                                <Typography variant="h6" component="h2" sx={{mb:2, fontFamily: 'Outfit', fontWeight: "88px", fontSize: "25px"}}>
                                    {personalInfo.first_name + " " + personalInfo.last_name || 'Your Name'}
                                </Typography>
                            </Box>
                            

                            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch', alignContent: 'center', paddingLeft: '10px' } }} noValidate autoComplete="off">
                                <Grid container spacing={1} alignItems="flex-end">
                                <div>
                                <Grid item >
                                    <text className='profile-components'>
                                        School
                                    </text>
                                    <TextField
                                        disabled
                                        id="school"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        margin="normal"
                                        value={personalInfo.school}
                                        className='profile-box-fixed'
                                        fullWidth
                                    />
                                </Grid>


                                <Grid item >
                                <text className='profile-components'>
                                        degree
                                    </text>
                                    <TextField
                                        required
                                        id="degree"
                                        value={personalInfo.degree}
                                        fullWidth
                                        className='profile-box'
                                        // You can handle the Degree value similar to School and Email if needed
                                    />
                                </Grid>
                                    <TextField
                                        required
                                        id="major"
                                        label="Major(s)"
                                        // Handle the Major(s) similarly if needed
                                    />
                                    {/* Add more TextFields for other fields like Minor, Grade, Date, etc. */}
                                </div>
                                <div>
                                    <TextField
                                        disabled
                                        id="email"
                                        label="Email"
                                        type="email"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        margin="normal"
                                        value={UserEmailstate}                    
                                    />
                                    <TextField
                                        id="phone-number"
                                        label="Phone number"
                                        // Handle the Phone number similarly if needed
                                    />
                                </div>
                                {/* ... more input fields */}
                                
                                {/* For checkboxes */}
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="genderPronounsPublic"
                                            color="primary"
                                            // You should manage the checked state with useState if you need to handle its state
                                        />
                                    }
                                    label="I do not wish to display my gender and pronouns publicly."
                                />

                                {/* ... rest of the form */}
                                </Grid>

                                {/* For the submit button */}
                                <Button variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
                                    Save Changes
                                </Button>
                            </Box>
                                                

                        </Card>
                    </text>
                </Grid>
            </Grid>   
        </Box>
    </div>
    );
}
