import React, { useEffect, useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Card, Stack, Avatar, Typography, Grid, TextField } from '@mui/material';
import '../styles/Dashboard.css';

export function Profile() { 
    const [userType, setUserType] = useState('seeker');

    const renderFields = () => {
        if (userType === 'provider') {
            return (
                <>
                    <Grid item xs={6} container direction="row" alignItems="center" spacing={1}>
                        <Grid item xs={3}>
                            <Typography style={{ fontFamily: 'Outfit', color: '#A4A4A4', fontWeight: 400, fontSize: '14px' }}>
                                Organization
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField disabled variant="outlined" fullWidth size="small" className="inputSubmit" style={{ width: '161px' }}
                            InputProps={{ style: { fontFamily: 'Outfit', fontSize: '12px' }}}/>
                        </Grid>
                    </Grid>

                    <Grid item xs={6} container direction="row" alignItems="center" spacing={1}>
                        <Grid item xs={3}>
                            <Typography style={{ fontFamily: 'Outfit', color: '#A4A4A4', fontWeight: 400, fontSize: '14px' }}>
                                Email<span style={{color: "red"}}>*</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField disabled variant="outlined" fullWidth size="small" className="inputSubmit" style={{ width: '161px' }}
                            InputProps={{ style: { fontFamily: 'Outfit', fontSize: '12px' }}}/>
                        </Grid>
                    </Grid>
                    
                </>
            );
        } else {
            return (
                <>
                <Grid container direction="row" alignItems="center" spacing={2}>
                    <Grid item xs={6} container direction="row" alignItems="center" spacing={1}>
                        <Grid item xs={3}>
                            <Typography style={{ fontFamily: 'Outfit', color: '#A4A4A4', fontWeight: 400, fontSize: '14px' }}>
                                School<span style={{ color: "red" }}>*</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField disabled variant="outlined" fullWidth size="small" className="inputSubmit" style={{ width: '161px' }}
                                InputProps={{ style: { fontFamily: 'Outfit', fontSize: '12px' }}} />
                        </Grid>
                    </Grid>
                    <Grid item xs={6} container direction="row" alignItems="center" spacing={1}>
                        <Grid item xs={3}>
                            <Typography style={{ fontFamily: 'Outfit', color: '#A4A4A4', fontWeight: 400, fontSize: '14px' }}>
                                School<span style={{color: "red"}}>*</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField disabled variant="outlined" fullWidth size="small" className="inputSubmit" style={{ width: '161px' }}
                            InputProps={{ style: { fontFamily: 'Outfit', fontSize: '12px' }}}/>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container direction="row" alignItems="center" spacing={2}>
                    <Grid item xs={6} container direction="row" alignItems="center" spacing={1}>
                        <Grid item xs={3}>
                            <Typography style={{ fontFamily: 'Outfit', color: '#A4A4A4', fontWeight: 400, fontSize: '14px' }}>
                                Grade
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField disabled variant="outlined" fullWidth size="small" className="inputSubmit" style={{ width: '161px' }}
                            InputProps={{ style: { fontFamily: 'Outfit', fontSize: '12px' }}}/>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container direction="row" alignItems="center" spacing={2}>
                    <Grid item xs={6} container direction="row" alignItems="center" spacing={1}>
                        <Grid item xs={3}>
                            <Typography style={{ fontFamily: 'Outfit', color: '#A4A4A4', fontWeight: 400, fontSize: '14px' }}>
                                Email<span style={{color: "red"}}>*</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField disabled variant="outlined" fullWidth size="small" className="inputSubmit" style={{ width: '161px' }}
                            InputProps={{ style: { fontFamily: 'Outfit', fontSize: '12px' }}}/>
                        </Grid>
                    </Grid>
                </Grid>

                <Typography style={{ fontFamily: 'Outfit', color: '#A4A4A4', fontWeight: 400, fontSize: '14px' }}> Other Information</Typography>

                <Grid container direction="row" alignItems="center" spacing={2}>
                    <Grid item xs={6} container direction="row" alignItems="center" spacing={1}>
                        <Grid item xs={3}>
                            <Typography style={{ fontFamily: 'Outfit', color: '#A4A4A4', fontWeight: 400, fontSize: '14px' }}>
                                Bio
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField disabled variant="outlined" fullWidth size="small" className="inputSubmit" style={{ width: '161px' }}
                            InputProps={{ style: { fontFamily: 'Outfit', fontSize: '12px' }}}/>
                        </Grid>
                    </Grid>
                </Grid>
                </>
            )
        }
    };
    return (
        <div className='outerCard' style={{ marginTop: '0px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{}}>
                <Box className='outer-box'>
                    <div className='inner-div'>
                        <Card elevation='4' style={{ overflow: 'hidden', borderRadius: '15px', width: "100%" }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '16px', marginLeft: '73px' }}>
                                <div style={{ marginBottom: '8px' }}>
                                    <Grid container direction="column" spacing={2} style={{marginTop: '10px'}}>
                                        
                                        <Typography style={{ fontFamily: 'Outfit', color: '#A4A4A4', fontWeight: 400, fontSize: '14px' }}> Edit Profile</Typography>
                                        
                                        <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                                            <Avatar sx={{ bgcolor: '#D9D9D9', width: 50, height: 50, color: 'black', fontSize: '26.231px', fontFamily: 'Outfit', fontWeight: 400 }}>XX</Avatar>
                                        
                                            <div style={{ fontFamily: 'Outfit', fontSize: '18px', fontWeight: 500, marginLeft: '8px' }}>
                                                NAME
                                            </div>
                                        </div>


                                        <Typography style={{ fontFamily: 'Outfit', color: '#A4A4A4', fontWeight: 400, fontSize: '14px' }}> Basic Information</Typography>

                                        {renderFields()}
                                    </Grid>
                                </div>
                            </div>
                        </Card>
                    </div>
                </Box>
            </div>
        </div>
    )
}
