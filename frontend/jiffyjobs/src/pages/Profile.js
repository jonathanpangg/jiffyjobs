import React, { useEffect, useState } from 'react';
import { Box, Card, Grid, Container, Typography, TextField, Button, FormControlLabel, Checkbox, Avatar, FormGroup, FormControl, InputLabel, OutlinedInput, Select, MenuItem } from '@mui/material';
import '../styles/profile.css'
import { deepOrange } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Profile() {
    const [UserEmailstate, setuserEmail] = useState("");
    const [userPassword, setuserPassword] = useState("");
    const [degree, setDegree] = useState('');
    const [minor, setMinor] = useState('');
    const [major, setMajor] = useState('');
    const [GPA, setGPA] = useState('');
    const [gender, setGender] = useState('');
    const [pronouns, setPronouns] = useState('');
    const [grade, setGrade] = useState('')
    const [bio, setBio] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    //tells you if its 'seeker' or 'provider'
    const [ userRole, setUserRole ] = useState(localStorage.getItem("user"));

    // user email
    // const [ userEmail, setEmail ] = useState(localStorage.getItem("email"));

    const gradeList = ["Freshmen", "Sophomore", "Junior", "Senior", "Graduate Student", "Other"]

    const [personalInfo, setpersonalInfo] = useState({});

    const [ token, setToken ] = useState(localStorage.getItem("token"));
    const [showToken, setShowToken] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) setShowToken(true);
    },[token]);

    useEffect(()=> {
        if (showToken) {
            console.log(showToken);
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
        if (personalInfo.minor) {
            setMinor(personalInfo.minor);
        }
    }, [personalInfo.minor]); 

    useEffect(() => {
        if (personalInfo.first_name) {
            setFname(personalInfo.first_name);
        }
    }, [personalInfo.first_name]); 


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
                console.error("Error fetching profile data:", error);
            }
        };
        console.log(localStorage.getItem("user"))
        if (localStorage.getItem("email")) {
            getProfile(localStorage.getItem("email"));
        }
    }, []);



      


    const handleCheckboxChange = (event) => {
        setIsPublic(event.target.checked);
      };
    const handleFnameChange = (event) => {
        setFname(event.target.value);
    };
    const handleLnameChange = (event) => {
        setLname(event.target.value);
    };
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



      const saveProfileChanges = async () => {
        // Assuming `bio` is a state variable holding the bio information    
        const requestBody = {
            userEmail: UserEmailstate, // Should be dynamically set
            role: "seeker", // Should be dynamically set
            major: major, // Should be dynamically set or obtained from state
            grade: grade, // Should be dynamically set or obtained from state
            bio: bio, // Using the bio from your state
        };
    
        try {
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
    



    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you would typically send the profileData state to the server
    };

    const getInitials = (first_name, last_name) => {
        if (first_name && last_name) {
            return first_name[0] + last_name[0]
        }

    };

    return (

        <div className={'profile-background'}>
        
            <Grid item xs={12} sx={{backgroundColor:"#f3f3f3", marginBottom:"500px", height:900}}>
                    <Card elevation={3} sx={{ p: 2, borderRadius: '15px', maxWidth: 1000, maxHeight:900, mx: "auto" }}> 
                             <Typography variant="h5" component="h2" sx={{ textAlign: 'left', mb: 2, fontFamily: 'Outfit', fontWeight: "88px", marginLeft: "50px", marginTop: "15px" }}>
                                 Edit Profile
                             </Typography>
                             


                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar sx={{ bgcolor: "lightgray", marginRight: 2, color: "black", marginLeft: 10, width: 56, height: 56, fontSize: '1.9rem'  }}>{getInitials(personalInfo.first_name, personalInfo.last_name)}</Avatar>
                                <Typography variant="h6" component="h2" sx={{mb:2, fontFamily: 'Outfit', fontWeight: "88px", fontSize: "25px"}}>
                                    {personalInfo.first_name + " " + personalInfo.last_name || 'Your Name'}
                                </Typography>
                            </Box>
                            <text className='basicinformation'>
                                Basic Information
                            </text>

                            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch', alignContent: 'center', paddingLeft: '10px' } }} noValidate autoComplete="off">
                            {userRole === "seeker" ?  <Grid container spacing={1} >
                               
                                <div className='label-input-pair'>

                                    <Grid item xs={6} sm={3} className='name-box-pair' >
                                        <Typography className='profile-components'  gutterBottom>
                                        <p>School<span style={{"color": "red"}}>*</span></p>
                                        </Typography>

                                        <TextField
                                            disabled
                                            id="school"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={personalInfo.school}
                                            className='profile-box-fixed'
                                        />
                                
                                    </Grid>

                                    <Grid item xs={6} sm={3} className='name-box-pair' >
                                            <Typography className='profile-components'  gutterBottom>
                                                Email<span style={{"color": "red"}}>*</span>
                                            </Typography>

                                            <TextField
                                                disabled
                                                id="email"
                                                sx={{ fontSize:"25px" }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                value={UserEmailstate}                    
                                                className='profile-box-fixed'
                                            />
                                    
                                        </Grid>
                                </div>
                                <div className='label-input-pair'> 
                                    
                               
                                <Grid item xs={6} sm={3} className='name-box-pair' sx={{marginLeft:"5px" }}>
                                    <Typography className='profile-components' gutterBottom>
                                        Major
                                    </Typography>
                                        <TextField
                                            required
                                            sx={{ fontSize:"25px"}}
                                            id="major"
                                            value={major}
                                            fullWidth
                                            onChange={handleMajorChange}
                                            className='profile-box'
                                        />
                                    </Grid>


                                <Grid item xs={6} sm={3} className='name-box-pair'  >
                                        <Typography className='profile-components' gutterBottom>
                                            Grade
                                        </Typography>
                                        <FormControl fullWidth variant="outlined" className='profile-box' >

                                            <Select
                                            id="degree"
                                            value={grade || ''}
                                            onChange={handleGradeChange}
                                            sx={{height:"41px", width:"195px", marginLeft:"35px"}}
                                            className='dropdown-box'
                                            >
                                            {/* <MenuItem value="">
                                                <em>Delete Option</em>
                                            </MenuItem> */}
                                            { gradeList.map((data) => {
                                                return (<MenuItem value={data}> {data} </MenuItem>)
                                            })}
                                            {/* <MenuItem value="First-year">First-year</MenuItem>
                                            <MenuItem value="Second-year">Second-year</MenuItem>
                                            <MenuItem value="Third-year">Third-year</MenuItem>
                                            <MenuItem value="Fourth-year">Fourth-year</MenuItem>
                                            <MenuItem value="Fifth+-year">Fifth +-year</MenuItem>
                                            <MenuItem value="Graduate student">Graduate student</MenuItem>
                                            <MenuItem value="Other">Other</MenuItem> */}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    
                                 </div>               


                                
                                </Grid> 
                                
                                
                                
                                
                                : <Grid container spacing={1}>
                                    <div className='label-input-pair'>
                                    <Grid item xs={6} sm={3} className='name-box-pair' >
                                        <Typography gutterBottom>
                                        Organization<span style={{"color": "red"}}>*   </span>
                                        </Typography>

                                        <TextField
                                            disabled
                                            id="organization"
                                            sx={{ fontSize:"35px"}}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={personalInfo.school}
                                            className='profile-box-fixed'
                                        />
                                
                                    </Grid>
                                    </div>
                                    <div className='label-input-pair'>
                                    <Grid item xs={6} sm={3} className='name-box-pair' >
                                            <Typography   gutterBottom>
                                                Email<span style={{"color": "red"}}>*</span>
                                            </Typography>

                                            <TextField
                                                disabled
                                                id="email"
                                                sx={{ fontSize:"16px" }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                value={UserEmailstate}                    
                                                className='profile-box-fixed'
                                            />
                                    
                                        </Grid>

                                    </div>
                                </Grid>}
                            </Box> 
                            
                           
                            <div style={{paddingTop:"50px"}}></div>

                            <text className='otherinformation'>
                                Other Information
                            </text>

                            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch', alignContent: 'center', paddingLeft: '10px' } }} noValidate autoComplete="off">
                                <Grid container spacing={1} >
                                    <div className='label-input-pair-beg'>
                                    <Grid item className='name-box-pair'>
                                        <Typography className='profile-components-bio' gutterBottom>
                                            Bio
                                        </Typography>
                                        <TextField  
                                            multiline rows={3} 
                                            placeholder="Start typing..."  
                                            helperText={bio ? `${bio.split(/\s+/).filter(Boolean).length}/${wordLimit} words` : `0/${wordLimit} words`}
                                            onChange={handleBioChange} 
                                            type="search" 
                                            square={false} 
                                            sx={{width:"1000px", minWidth:"850px", paddingLeft:'500px', right:"30px"}} 
                                            className='profile-box-bio' 
                                            id='bio' 
                                            value={bio}/>
                                    </Grid>
                                    </div>      
                                </Grid>
                                <div className='label-input-pair' >
                                {/* <FormGroup>
                                    <FormControlLabel
                                        control={
                                        <Checkbox
                                            checked={isPublic}
                                            onChange={handleCheckboxChange}
                                            name="isPublic"
                                        />
                                        }
                                        label="Make this profile public."
                                    />
                                    <Typography variant="caption" display="block" gutterBottom sx={{marginLeft:"30px", marginTop:"-9px"}}>
                                        By checking this box, you agree to share information on Profile 1 with potential employers. Other profiles won’t be shared.
                                    </Typography>
                                </FormGroup> */}
                                    </div>
                                <div className='label-input-pair-beg'>
                                    {/* For the submit button */}
                                    <div style={{ textAlign: 'left', marginLeft:'760px', marginTop:"20px" }}>
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
                        </Card>
                </Grid>
    </div>
    );
}
