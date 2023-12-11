import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Card, Avatar, Typography, Grid, TextField, Button, InputAdornment, Select, MenuItem } from '@mui/material';
import logo from '../images/Logo.png';
import reject from '../images/Reject.png';

export function Profile() { 
    const [ userRole, setUserRole ] = useState(localStorage.getItem("user"));
    const [ userEmail, setUserEmail ] = useState(localStorage.getItem("email")); 
    const [wordCount, setWordCount] = useState(0);
    const [last, setLast] = useState(localStorage.getItem("last"));
    const [first, setFirst] = useState(localStorage.getItem("first"));
    const [ seeker, setSeeker ] = useState({
        major: '',
        grade: '',
        school: '',
        bio: ''
    })
    const [ provider, setProvider ] = useState({
        org: ''
    })
    const gradeList = ["First-year", "Second-year", "Third-year", "Fourth-year", "Grad Student"];

    const [ token, setToken ] = useState(localStorage.getItem("token"));
    const [ showToken, setShowToken ] = useState(false);
    const navigate = useNavigate();

    const handleMajorChange = (event) => {
        setSeeker({ ...seeker, major: event.target.value });
    };

    const handleGradeChange = (event) => {
        setSeeker({ ...seeker, grade: event.target.value });
    };

    const wordLimit = 50;

    const handleBioChange = (event) => {
        const text = event.target.value;
        const words = text.split(/\s+/).filter(Boolean); 
        const wordCount = words.length;
      
        if (wordCount <= wordLimit) {
          setSeeker({ ...seeker, bio: text });
          setWordCount(wordCount);
          localStorage.setItem("wordCount", wordCount); 
        } else {
          if (text.length < seeker.bio.length) {
            setSeeker({ ...seeker, bio: text });
          }
        }
    };
    
    useEffect(() => {
        const savedWordCount = localStorage.getItem("wordCount");
        if (savedWordCount) {
            setWordCount(parseInt(savedWordCount));
        }
    }, []);
    

    const handleOrgChange = (event) => {
        setProvider({ ...provider, org: event.target.value });
    };
      
      
    useEffect(() => {
        if (!token) {
            setShowToken(true);
        }
    },[token]);

    useEffect(() => {
        if (showToken) {
            console.log(showToken);
            toast.dismiss()
            toast.error('Please Login!', {
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
            navigate('/login');
            setShowToken(false);
        } 
    }, [showToken])

    async function getProfile() {
        const route = `https://jiffyjobs-api-production.up.railway.app/api/users/getinfo/${userEmail}/${userRole}`;
        fetch(route)
            .then(async (response) => {
                const res = await response.json();
                if (!response.ok) {
                    throw new Error(res.message);
                }
                return res;
            }).then(async (data) => {
                if (userRole === 'seeker') {
                    await setSeeker({
                        major: data.personal_info.major,
                        grade: data.personal_info.grade,
                        school: data.personal_info.school,
                        bio: data.personal_info.personal_statement[0]
                    })

                    const words = data.personal_info.personal_statement[0].split(/\s+/).filter(Boolean); 
                    const wordCount = words.length;
                    localStorage.setItem("wordCount", wordCount); 
                    setWordCount(wordCount);
                } else {
                    setProvider({
                        org: data.personal_info.organization
                    })
                }
            }).catch((error) => {
                console.log(error);
            }
        )
    }

    useEffect(() => {
        if (userEmail) {
            getProfile();
        }
    }, [userEmail]);


    const saveProfileChanges = async () => {
        const bodyData = {
            userEmail: userEmail,
            role: userRole,
        };
    
        if (userRole === 'seeker') {
            bodyData.major = seeker.major;
            bodyData.grade = seeker.grade;
            bodyData.bio = seeker.bio;
        } else if (userRole === 'provider') {
            bodyData.organization = provider.org;
        }
    
        const update = {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyData)
        };
    
        const route = 'https://jiffyjobs-api-production.up.railway.app/api/users/getinfo/update';
        await fetch(route, update)
            .then(async (response) => {
                const res = await response.json();
                if (!response.ok) {
                    throw new Error(res.message);
                }
                return res;
            })
            .then(async (data) => {
                if (userRole === 'seeker') {
                    setSeeker({
                        major: data.personal_info.major,
                        grade: data.personal_info.grade,
                        bio: data.personal_info.personal_statement[0]
                    });
                } else if (userRole === 'provider') {
                    setProvider({
                        org: data.personal_info.organization
                    });
                }

                toast.dismiss()
                toast.info('Profile updated successfully!', {
                    icon: ({theme, type}) =>  <img src={logo} style={{ width: '24px', height: '24px', marginRight: '10px', marginBottom:'6px'}}/>,
                    progressStyle: {backgroundColor: '#4A4FE4'},
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
            })
            .catch((error) => {
                console.log(error);
            });
    };
    

    const renderFields = () => {
        if (userRole === 'provider') {
            return (
                <>
                    <Grid container direction="row" alignItems="center" style={{ marginBottom: '12.67px', marginLeft: '8.45px'  }}>
                        <Grid item xs={6} container direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
                            <Grid item >
                                <Typography style={{ fontFamily: 'Outfit', fontWeight: 400, fontSize: '11.825px', marginRight: '10px'  }}>
                                    Organization
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField value={provider.org} onChange={handleOrgChange} variant="outlined" fullWidth size="small" style={{ width: '161px' }}
                                    InputProps={{ style: { fontFamily: 'Outfit', fontSize: '10.135px' }}}/>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" alignItems="center" style={{ marginBottom: '12.67px', marginBottom: '-24px', marginLeft: '8.45px'  }}>
                        <Grid item xs={6} container direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
                            <Grid item >
                                <Typography style={{ fontFamily: 'Outfit', fontWeight: 400, fontSize: '11.825px', marginRight: '10px'  }}>
                                    Email<span style={{color: "red"}}>*</span>
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField disabled value={userEmail} variant="outlined" fullWidth size="small" className="inputSubmit" style={{ width: '161px' }}
                                    InputProps={{ style: { fontFamily: 'Outfit', fontSize: '10.135px' }}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                </>
            );
        } else {
            return (
                <>
                <Grid container direction="row" alignItems="center" style={{ marginBottom: '12.67px', marginLeft: '8.45px'  }}>
                    <Grid item xs={6} container direction="row" justifyContent="flex-end" alignItems="center" >
                        <Typography style={{ fontFamily: 'Outfit', fontWeight: 400, fontSize: '11.825px', marginRight: '15.5px' }}>
                            School<span style={{ color: "red" }}>*</span>
                        </Typography>
                        <Grid xs={9}>
                            <TextField disabled value={seeker.school} variant="outlined" fullWidth size="small" className="inputSubmit" style={{ width: '161px', marginLeft: '2px' }}
                                InputProps={{ style: { fontFamily: 'Outfit', fontSize: '10.135px' }}} />
                        </Grid>
                    </Grid>
                    <Grid xs={6} container direction="row" alignItems="center">
                        <Typography style={{ fontFamily: 'Outfit', fontWeight: 400, fontSize: '11.825px', marginLeft: '-78px', marginRight: '15.5px' }}>
                            Major
                        </Typography>
                        <TextField value={seeker.major} onChange={handleMajorChange} variant="outlined" fullWidth size="small" style={{ width: '161px' }}
                            InputProps={{ style: { fontFamily: 'Outfit', fontSize: '10.135px' }}}/>
                    </Grid>
                </Grid>

                <Grid container direction="row" alignItems="center" style={{ marginBottom: '12.67px', marginLeft: '8.45px' }}>
                    <Grid item xs={6} container direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
                        <Grid item>
                        <Typography style={{ fontFamily: 'Outfit', fontWeight: 400, fontSize: '11.825px', marginRight: '10px' }}>
                            Grade
                        </Typography>
                        </Grid>
                        <Grid item xs={9}>
                        <Select value={seeker.grade} onChange={handleGradeChange} displayEmpty fullWidth size="small" variant="outlined" style={{ width: '161px', fontFamily: 'Outfit', fontSize: '10.135px' }}>
                            {gradeList.map((grade, index) => (
                                <MenuItem key={index} value={grade} style={{ fontFamily: 'Outfit', fontSize: '10.135px' }}> {grade}</MenuItem>
                            ))}
                        </Select>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container direction="row" alignItems="center" style={{ marginBottom: '33.78px', marginLeft: '8.45px'  }}>
                    <Grid item xs={6} container direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
                        <Grid item >
                            <Typography style={{ fontFamily: 'Outfit', fontWeight: 400, fontSize: '11.825px', marginRight: '10px'  }}>
                                Email<span style={{color: "red"}}>*</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField disabled value={userEmail} variant="outlined" fullWidth size="small" className="inputSubmit" style={{ width: '161px' }}
                                InputProps={{ style: { fontFamily: 'Outfit', fontSize: '10.135px' }}}/>
                        </Grid>
                    </Grid>
                </Grid>

                <Typography style={{ fontFamily: 'Outfit', color: '#5B5B5B', fontWeight: 500, fontSize: '11.825px', marginBottom: '16.42px', marginLeft: '8.45px'  }}> Other Information</Typography>

                <Grid container direction="row" alignItems="center" style={{ marginLeft: '8.45px'  }}>
                    <Grid item xs={6} container direction="row" justifyContent="flex-end" spacing={1}>
                        <Grid item>
                            <Typography style={{ fontFamily: 'Outfit', fontWeight: 400, fontSize: '11.825px', marginRight: '10px', marginTop: '6px'  }}>
                                Bio
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField  multiline rows={4} onChange={handleBioChange} value={seeker.bio} variant="outlined" fullWidth size="small" placeholder="Start typing.." style={{ width: '161px', width: '622px', height: '57px', }}
                                InputProps={{  endAdornment: (<InputAdornment style={{marginTop: '50px', marginLeft: '6px', marginRight: '-6px'}}>{wordCount}/50</InputAdornment>), style: { fontFamily: 'Outfit', fontSize: '10.135px' } }}/> 
                        </Grid>
                    </Grid>
                </Grid>
                </>
            )
        }
    };
    return (
        <div className='outerCardProfile' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  }}>
            <Box style={{ width: '850px',  marginTop: '15px', transform: 'scale(1.095)' }}>
                <Card elevation={4} style={{ overflow: 'hidden', borderRadius: '15px', width: '850px',  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '61px', marginRight: '80px', marginTop: '38px' }}>
                        <Grid container direction="column" style={{marginTop: '10px'}}>
                            <Typography style={{ fontFamily: 'Outfit', fontWeight: 500, fontSize: '15.203px'}}>Edit Profile</Typography>

                            <div style={{ marginTop: '17.03px', marginBottom: '34.63px', display: 'flex', alignItems: 'center' }}>
                                <Avatar sx={{ bgcolor: '#4A4FE4', width: 42, height: 42, color: 'white', fontSize: '22.155px', fontFamily: 'Outfit', fontWeight: 400, marginLeft: '31.25px' }}>{first && first.length > 0 && first[0]}{last && last.length > 0 && last[0]} </Avatar>
                            
                                <div style={{ fontFamily: 'Outfit', fontSize: '15.203px', fontWeight: 500, marginLeft: '13px' }}>
                                    {first && first.length > 0 && first} {last && last.length > 0 && last} 
                                </div>
                            </div>
                            <Typography style={{ fontFamily: 'Outfit', color: '#5B5B5B', fontWeight: 500, fontSize: '11.825px', marginBottom: '16.42px', marginLeft: '8.45px' }}> Basic Information</Typography>
                            {renderFields()}
                        </Grid>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '49px', marginBottom: '29px', marginTop: '40px'}}>

                        <Button variant="contained" style={{ width: '131px', height: '34px', backgroundColor: '#4A4FE4', color: 'white', marginTop: '20px', fontSize: '13.514px', fontFamily: 'Outfit', fontWeight: 400, padding: '13px 18px', borderRadius: '8px' }} onClick={saveProfileChanges}>

                            <span style={{textTransform:'none'}}>Save changes</span>
                        </Button>
                    </div>
                </Card>
            </Box>
        </div>
    )
}
