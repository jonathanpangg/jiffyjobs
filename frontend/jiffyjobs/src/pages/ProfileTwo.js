import React, { useEffect, useState } from 'react';
import { Box, Card, Grid, Container, Typography, TextField, Button, FormControlLabel, Checkbox, Avatar, FormGroup, FormControl, InputLabel, OutlinedInput, Select, MenuItem } from '@mui/material';
import '../styles/profile.css'
import { deepOrange } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Profile() {
    const [UserEmailstate, setuserEmail] = useState("");
    const [major, setMajor] = useState('');
    const [grade, setGrade] = useState('')
    const [bio, setBio] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [fname, setFname] = useState("");
    const [userPassword, setuserPassword] = useState("");
    const [lname, setLname] = useState("");
    const [org, setOrg] = useState("");
    const [ userRole, setUserRole ] = useState(localStorage.getItem("user"));

    // user email
    const gradeList = ["Freshmen", "Sophomore", "Junior", "Senior", "Graduate Student", "Other"]

    const [personalInfo, setpersonalInfo] = useState({});

    const [ token, setToken ] = useState(localStorage.getItem("token"));
    const [showToken, setShowToken] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) setShowToken(true);
    },[token]);

    useEffect(() => {
        if (showToken) {
            console.log(showToken);
            toast.dismiss()
            toast.error('Please Login!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate('/login');
            setShowToken(false);
        }

    }, [showToken])

    // const userEmail = "pangj@bu.edu"; // This will eventually come from user login state
    // const userEmail = "example_email@bu.edu"
    const wordLimit = 50;


    useEffect(() => {
        if (personalInfo.first_name) {
            setFname(personalInfo.first_name);
        }
    }, [personalInfo.first_name]); 

    useEffect(() => {
        if (personalInfo.organization) {
            setFname(personalInfo.organization);
        }
    }, [personalInfo.organization]); 



    useEffect(() => {
        if (personalInfo.last_name) {
            setLname(personalInfo.last_name);
        }
    }, [personalInfo.last_name]); 


    useEffect(() => {
        if (personalInfo.personal_statement) {
            try {
                setBio(personalInfo.personal_statement[0]);
            }
            catch {
                setBio(" ")
            }
        }
    }, [personalInfo.personal_statement]); 

    useEffect(() => {
        if (personalInfo.grade) {
            setGrade(personalInfo.grade);
        }
    }, [personalInfo.grade]); 

    useEffect(() => {
        if (personalInfo.major) {
            setMajor(personalInfo.major);
        }
    }, [personalInfo.major]); 



    useEffect(() => {
        // Fetch user profile data from the API and set it to state
        // Replace with your actual API request
        const getProfile = async (userID) => {
            const route = `https://jiffyjobs-api-production.up.railway.app/api/users/getinfo/${userID}/${userRole}`;
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
                console.log(error)
                console.error("Error fetching profile data:", error);
            }
        };
        if (localStorage.getItem("email")) {
            getProfile(localStorage.getItem("email"));
        }
    }, []);

    const handleGradeChange = (event) => {
        setGrade(event.target.value)
    };
    const handleBioChange = (event) => {
        const text = event.target.value;
        const words = text.split(/\s+/); 
        if (words.length <= wordLimit || text.endsWith(" ")) {
          setBio(text);
        } else {
          // If the word limit is exceeded, we rebuild the string with only the first 50 words
          const trimmedText = words.slice(0, wordLimit).join(' ');
          setBio(trimmedText);
          // Optionally, you could provide feedback to the user that the word limit has been reached
        }
      };

    const handleMajorChange = (event) => {
        setMajor(event.target.value);
    }

    const handleOrgChange = (event) => {
        setOrg(event.target.value);
    }


      const saveProfileChanges = async () => {
        // Assuming `bio` is a state variable holding the bio information   
        let requestBody = {};
       
    
        try {
            if (userRole === "seeker") { 
                requestBody = {
                    userEmail: UserEmailstate, // Should be dynamically set
                    role: "seeker", // Should be dynamically set
                    major: major, // Should be dynamically set or obtained from state
                    grade: grade, // Should be dynamically set or obtained from state
                    bio: bio, // Using the bio from your state
                };
            } else if (userRole === "provider") {
                requestBody = {
                    userEmail: UserEmailstate,
                    role: "provider",
                    organization: org
                }
            }
            console.log(requestBody)

            const response = await fetch('https://jiffyjobs-api-production.up.railway.app/api/users/getinfo/update', { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            if (response.ok) {
                // Handle success
                const result = await response.json();
                console.log('Profile updated:', result);
            } else {
                // Handle errors
                console.error('Failed to update profile:', response.statusText);
            }
        } catch (error) {
            // Handle network errors
            console.error('Error saving profile:', error);
        }
    };

    const getInitials = (first_name, last_name) => {
        if (first_name && last_name) {
            return first_name[0] + last_name[0]
        }

    };

    return (

        <div className={'profile-background'}>
        
            <Grid item xs={12} sx={{backgroundColor:"#f3f3f3", marginBottom:"500px", height:450}}>
                    <Card elevation={3} sx={{ p: 2, borderRadius: '15px', maxWidth: 1000, maxHeight:900, mx: "auto" }}> 
                            <Typography variant="h5" component="h2" sx={{ textAlign: 'left', mb: 2, fontFamily: 'Outfit', fontWeight: "90px", marginLeft: "50px", marginTop: "15px" }}>
                                 Edit Profile
                            </Typography>
                             


                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar 
                                    sx={{ bgcolor: "lightgray", marginRight: 2, color: "black", marginLeft: 10, width: 56, height: 56, fontSize: '1.9rem', bottom:"5px" }}>{getInitials(personalInfo.first_name, personalInfo.last_name)}
                                </Avatar>
                                <Typography variant="h6" component="h2" sx={{mb:2, fontFamily: 'Outfit', fontWeight: "88px", fontSize: "25px"}}>
                                    {personalInfo.first_name + " " + personalInfo.last_name || 'Your Name'}
                                </Typography>
                            </Box>
                            <div style={{padding:"15px"}}></div>
                            <text className='basicinformation' style={{paddingTop:"20px"}}>
                                Basic Information
                            </text>
                            {userRole === "seeker" ?  
                            <div>
                            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch', alignContent: 'center', paddingLeft: '10px'}}} noValidate autoComplete="off">
                                <Grid container spacing={1} >
                               
                                <div className='label-input-pair'>

                                    <Grid item xs={6} sm={3} className='name-box-pair' >
                                        <Typography className='profile-components' sx={{fontSize:"15px", fontWeight:"normal"}} gutterBottom>
                                        <p>School<span style={{"color": "red"}}>*</span></p>
                                        </Typography>

                                        <TextField
                                            disabled
                                            id="school"
                                            value={personalInfo.school}
                                            className='profile-box-fixed'
                                        />
                                
                                    </Grid>

                                    <Grid item xs={6} sm={3} className='name-box-pair' >
                                            <Typography className='profile-components'  sx={{fontSize:"15px", fontWeight:"normal"}} gutterBottom>
                                                Email<span style={{"color": "red"}}>*</span>
                                            </Typography>

                                            <TextField
                                                disabled
                                                id="email"
                                                sx={{ fontSize:"40px" }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                value={UserEmailstate}                    
                                                className='profile-box-fixed'
                                            />
                                        </Grid>
                                </div>
                                <div className='label-input-pair'> 
                                    
                               
                                <Grid item xs={6} sm={3} className='name-box-pair' >
                                    <Typography className='profile-components'  sx={{fontSize:"15px", fontWeight:"normal", paddingLeft:"12px"}} gutterBottom>
                                        Major
                                    </Typography>
                                        <TextField
                                            required
                                            sx={{ fontSize:"42.5px" }}
                                            id="major"
                                            value={major}
                                            fullWidth
                                            onChange={handleMajorChange}
                                            className='profile-box'
                                        />
                                    </Grid>
                                <Grid item xs={6} sm={3} className='name-box-pair'  >
                                        <Typography className='profile-components'  sx={{fontSize:"15px", fontWeight:"normal", marginLeft:"4px"}} gutterBottom>
                                            Grade
                                        </Typography>
                                        <FormControl fullWidth variant="outlined" className='profile-box' >

                                            <Select
                                            id="degree"
                                            value={grade || ''}
                                            onChange={handleGradeChange}
                                            sx={{height:"34px", width:"195px", marginLeft:"18px"}}
                                            className='dropdown-box'
                                            >
                                            { gradeList.map((data) => {
                                                return (<MenuItem value={data}> {data} </MenuItem>)
                                            })}
                                            </Select>
                                        </FormControl>
                                    </Grid>                        
                                 </div>               
                                </Grid>                             
                            </Box> 
                            <div style={{paddingTop:"50px"}}></div>

                            <text className='otherinformation' style={{paddingBottom:"109px"}}>
                                Other Information
                            </text>
                            <div style={{paddingTop:"20px"}}></div>

                            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch', alignContent: 'center', paddingLeft: '15px' } }} noValidate autoComplete="off">
                                <Grid container spacing={1} >
                                    <div className='label-input-pair-beg'>
                                    <Grid item className='name-box-pair'>
                                        <Typography className='profile-components-bio' sx={{marginLeft:"20px"}} gutterBottom>
                                            Bio
                                        </Typography>
                                        <TextField  
                                            multiline rows={3} 
                                            placeholder="Start typing..."  
                                            helperText={bio ? `${bio.split(/\s+/).filter(Boolean).length}/${wordLimit} words` : `0/${wordLimit} words`}
                                            onChange={handleBioChange} 
                                            type="search" 
                                            square={false} 
                                            sx={{width:"1000px", minWidth:"800px", paddingLeft:'500px', right:"30px"}} 
                                            className='profile-box-bio' 
                                            id='bio' 
                                            value={bio}/>
                                    </Grid>
                                    </div>      
                                </Grid>
                                <div className='label-input-pair' >
                                </div>
                                <div className='label-input-pair-beg'>
                                    <div style={{ textAlign: 'left', marginLeft:'80%' }}>
                                        <Button 
                                            variant="contained" 
                                            sx={{ 
                                            bgcolor: 'grey.700', // This sets the background color to a shade of grey
                                            color: 'white', // Sets the text color to black
                                            '&:hover': {
                                                bgcolor: 'grey.500', // Darker grey on hover
                                            },
                                            mb: 2 // Margin bottom if needed
                                            }}
                                            onClick={saveProfileChanges} 
                                        >
                                            Save Changes
                                        </Button>
                                    </div>
                                </div>
                        </Box></div>




                        :
                        <div> 
                            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch', alignContent: 'center', paddingLeft: '10px'}}} noValidate autoComplete="off">
                                <Grid container spacing={1} >
                                    
                                    <div className='label-input-pair'>

                                        <Grid item xs={6} sm={3} className='name-box-pair' >
                                            <Typography sx={{ fontSize:"15px", fontWeight:"normal"}}>
                                            <p>Organization<span style={{"color": "red"}}>*</span></p>
                                            </Typography>

                                            <TextField
                                                sx={{ minWidth:"200px"}}
                                                id="organzation"
                                                onChange={handleOrgChange}
                                                value={personalInfo.organization}
                                                className='profile-box'
                                            />
                                        </Grid>
                                    </div>
                                    <div className='label-input-pair'> 
                                                
                                           
                                            <Grid item xs={6} sm={3} className='name-box-pair' >
                                                <Typography className='profile-components'  sx={{fontSize:"15px", width:"200px", marginLeft:"50px", fontWeight:"normal"}}>
                                                                Email<span style={{"color": "red"}}>*</span>
                                                            </Typography>
                
                                                            <TextField
                                                                disabled
                                                                id="email"
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                                sx={{minWidth:"200px"}}
                                                                value={UserEmailstate}                    
                                                                className='profile-box-fixed-provider'
                                                            />
                                                </Grid>
                                             </div>               
                                            </Grid>                             
                                        </Box> 
                                        <div style={{paddingTop:"50px"}}></div>
            
            
                                        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch', alignContent: 'center', paddingLeft: '15px' } }} noValidate autoComplete="off">
                                          
                                            <div className='label-input-pair' >
                                            </div>
                                            <div className='label-input-pair-beg'>
                                                <div style={{ textAlign: 'left', marginLeft:'80%' }}>
                                                    <Button 
                                                        variant="contained" 
                                                        sx={{ 
                                                        bgcolor: 'grey.700', // This sets the background color to a shade of grey
                                                        color: 'white', // Sets the text color to black
                                                        '&:hover': {
                                                            bgcolor: 'grey.500', // Darker grey on hover
                                                        },
                                                        mb: 2 // Margin bottom if needed
                                                        }}
                                                        onClick={saveProfileChanges} 
                                                    >
                                                        Save Changes
                                                    </Button>
                                                </div>
                                            </div>
                                        </Box>
                                </div>}
                    </Card>
                </Grid>
    </div>
    );
}
