import React, { useEffect, useState } from 'react';
import { Box, Card, Grid, Container, Typography, TextField, Button, FormControlLabel, Checkbox, Avatar, FormControl, InputLabel, OutlinedInput, Select, MenuItem } from '@mui/material';
import '../styles/profile.css'
import { deepOrange } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';


export function Profile() {
    const [UserEmailstate, setuserEmail] = useState("");
    const [userPassword, setuserPassword] = useState("");
    const [degree, setDegree] = useState('');
    const [minor, setMinor] = useState('');
    const [major, setMajor] = useState('');
    const [GPA, setGPA] = useState('');
    const [gender, setGender] = useState('');
    const [pronouns, setPronouns] = useState('');


    const [personalInfo, setpersonalInfo] = useState({});

    const userEmail = "example_email@bu.edu"; // This will eventually come from user login state

    const navigate = useNavigate();

    useEffect(() => {
        const loggedin = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (!loggedin) {
            alert('Please login!');
            navigate('/login')
        }
    },[])

    useEffect(() => {
        if (personalInfo.minor) {
            setMinor(personalInfo.minor);
        }
    }, [personalInfo.minor]); 


    useEffect(() => {
        if (personalInfo.major) {
            setMajor(personalInfo.major);
        }
    }, [personalInfo.major]); 


    useEffect(() => {
        if (personalInfo.gpa) {
            setMajor(personalInfo.gpa);
        }
    }, [personalInfo.gpa]); 

    useEffect(() => {
        if (personalInfo.gender) {
            setGender(personalInfo.gender);
        }
    }, [personalInfo.gender]); 

    useEffect(() => {
        if (personalInfo.pronouns) {
            setPronouns(personalInfo.pronouns);
        }
    }, [personalInfo.pronouns]); 

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

                // when the user is not found
                if (data.err) {
                    setuserEmail("user not found")
                    setuserPassword("user not found")
                    setpersonalInfo("user not found")
                } else {
                    setuserEmail(data.email)
                    setuserPassword(data.password)
                    setpersonalInfo(data.personal_info)
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        if (userEmail) {
            getProfile(userEmail);
        }
    }, []);



    const handleMinorChange = (event) => {
        setMinor(event.target.value);
    };
    const handleMajorChange = (event) => {
        setMajor(event.target.value);
    };
    const handleGPAChange = (event) => {
        setGPA(event.target.value);
    };
    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };
    const handlePronounsChange = (event) => {
        setPronouns(event.target.value);
    };


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
                                <Grid container spacing={1} >
                               
                                <div className='label-input-pair'>

                                    <Grid item xs={6} sm={3} className='name-box-pair' >
                                        <Typography className='profile-components'  gutterBottom>
                                            School<span style={{"color": "red"}}>*</span>
                                        </Typography>

                                        <TextField
                                            disabled
                                            id="school"
                                            sx={{ fontSize:"16px" }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={personalInfo.school}
                                            className='profile-box-fixed'
                                        />
                                
                                    </Grid>


                                    <Grid item xs={6} sm={3} className='name-box-pair'>
                                        <Typography className='profile-components' gutterBottom>
                                            Degree
                                        </Typography>
                                        <FormControl fullWidth variant="outlined" className='profile-box' sx={{ m: 2, minWidth: 10 }}>

                                            <Select
                                            id="degree"
                                            value={personalInfo.degree}
                                            onChange={(e) => setDegree(e.target.value)}
                                            sx={{height:"41px"}}
                                            className='dropdown-box'
                                            >
                                            <MenuItem value="">
                                                <em>Delete Option</em>
                                            </MenuItem>
                                            <MenuItem value="Bachelor of Arts">Bachelor of Arts</MenuItem>
                                            <MenuItem value="Bachelor of Science">Bachelor of Science</MenuItem>
                                            <MenuItem value="Master of Arts">Master of Arts</MenuItem>
                                            <MenuItem value="Master of Arts">Master of Science</MenuItem>
                                            <MenuItem value="Other">Other</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>


                                <Grid item xs={6} sm={3} className='name-box-pair'>
                                <Typography className='profile-components' gutterBottom>
                                    &nbsp; GPA
                                </Typography>
                                    <TextField
                                        required
                                        sx={{ fontSize:"14px" }}
                                        id="GPA"
                                        value={GPA}
                                        onChange={handleGPAChange}
                                        fullWidth
                                        className='profile-box'
                                    />
                                </Grid>
                                </div>

                                            
                                <div className='label-input-pair'> 
                                    <Grid item xs={6} sm={3} className='name-box-pair'>
                                    <Typography className='profile-components' gutterBottom>
                                        Major&nbsp;
                                    </Typography>
                                        <TextField
                                            required
                                            sx={{ fontSize:"27.5px" }}
                                            id="major"
                                            value={major}
                                            fullWidth
                                            onChange={handleMajorChange}
                                            className='profile-box'
                                        />
                                    </Grid>
                               
                                    
                                    <Grid item xs={6} sm={3} className='name-box-pair'>
                                    <Typography className='profile-components' gutterBottom>
                                    &nbsp;Minor&nbsp;
                                    </Typography>
                                        <TextField
                                            required
                                            sx={{ fontSize:"27.5px" }}
                                            id="minor"
                                            value={minor}
                                            fullWidth
                                            onChange={handleMinorChange}
                                            className='profile-box'
                                        />
                                    </Grid>
                                 </div>               


                                <div className='label-input-pair'>
                                {/* <Grid item xs={6} sm={3} className='name-box-pair'>
                                        <Typography className='profile-components' gutterBottom>
                                            Grade
                                        </Typography>
                                        <FormControl fullWidth variant="outlined" className='profile-box' sx={{ m: 2, minWidth: 10 }}>

                                            <Select
                                            id="degree"
                                            value={personalInfo.degree}
                                            onChange={(e) => setDegree(e.target.value)}
                                            sx={{height:"41px"}}
                                            className='dropdown-box'
                                            >
                                            <MenuItem value="">
                                                <em>Delete Option</em>
                                            </MenuItem>
                                            <MenuItem value="Bachelor of Arts">Bachelor of Arts</MenuItem>
                                            <MenuItem value="Bachelor of Science">Bachelor of Science</MenuItem>
                                            <MenuItem value="Master of Arts">Master of Arts</MenuItem>
                                            <MenuItem value="Master of Arts">Master of Science</MenuItem>
                                            <MenuItem value="Other">Other</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid> */}

                                </div>            

                                
                                 <div className='label-input-pair'> 
                                    <Grid item xs={6} sm={3} className='name-box-pair'>
                                    <Typography className='profile-components' gutterBottom>
                                        Gender&nbsp;
                                    </Typography>
                                        <TextField
                                            required
                                            sx={{ fontSize:"27.5px" }}
                                            id="gender"
                                            value={gender}
                                            fullWidth
                                            onChange={handleGenderChange}
                                            className='profile-box'
                                        />
                                    </Grid>
                               
                                    
                                    <Grid item xs={6} sm={3} className='name-box-pair'>
                                    <Typography className='profile-components' gutterBottom style={{fontSize: "15px"}}>
                                        Pronouns
                                    </Typography>
                                        <TextField
                                            required
                                            sx={{ fontSize:"27.5px" }}
                                            id="pronouns"
                                            value={pronouns}
                                            fullWidth
                                            onChange={handlePronounsChange}
                                            className='profile-box'
                                        />
                                    </Grid>
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
