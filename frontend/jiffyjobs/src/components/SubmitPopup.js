import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, 
        Stack, Avatar, Typography, Grid, Divider, Button, TextField} from '@mui/material';

export function SubmitProfilePopup({ open, onClose, onSubmit, profile }) {
    const [ userEmail, setUserEmail ] = useState(localStorage.getItem("email"));
    
    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: "15px", margin: 'auto', width: '480px', height: '622px', transform: 'scale(0.85)' } }}>
            <DialogTitle sx={{ textAlign: 'center', fontFamily: 'Outfit', marginTop: 2, fontSize: '24px', fontWeight: 500 }}>Are you sure you want to submit?</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px', margin: 'auto', border: '2px dashed #ccc', borderRadius: '10px', width: '326px', height: '395px', transform: 'scale(1.05)'  }}>
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" style={{ paddingBottom: 0, paddingTop: 20, paddingLeft: '14px', marginRight: '113px'}} >
                        <Avatar sx={{ bgcolor: '#D9D9D9', width: 50, height: 50, color: 'black', fontSize: '26.231px', fontFamily: 'Outfit', fontWeight: 400, }}>{profile[0] && profile[0].length > 0 && profile[0][0]}{profile[1] && profile[1].length > 0 && profile[1][0]}</Avatar>
                        <Typography style={{ fontFamily: 'Outfit', fontSize: '18px', fontWeight: 500 }}>
                            {profile[0] && profile[0].length > 0 && profile[0]} {profile[1] && profile[1].length > 0 && profile[1]}
                        </Typography>
                    </Stack>
                    <form noValidate autoComplete="off" style={{ width: '100%' }}>
                        <Grid container alignItems="center" justifyContent="center" style={{ width: '100%',  }}>
                            <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingLeft: '57px', paddingRight: '10px', paddingTop: '20px', width: '49px', height: '9px' }}>
                                <Typography align="right" style={{ fontFamily: 'Outfit', color: '#A4A4A4', fontWeight: 400, fontSize: '14px'}}>School<span style={{"color": "red"}}>*</span></Typography>
                            </Grid>
                            <Grid item xs={7} style={{ paddingRight: '43px', paddingTop: '20px', }}>
                                <TextField disabled defaultValue={profile[2] && profile[2].length > 0 && profile[2]} variant="outlined" size="small" className="inputSubmit" style={{ width: '161px', }}
                                InputProps={{ style: { textAlign: 'center',  fontFamily: 'Outfit', fontSize: '12px' }}}/>
                            </Grid>

                            <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingLeft: '57px', paddingRight: '10px', paddingTop: '10px', width: '37px', height: '9px' }}>
                                <Typography align="right" style={{ fontFamily: 'Outfit', color: '#A4A4A4', fontWeight: 400, fontSize: '14px'}}>Major</Typography>
                            </Grid>
                            <Grid item xs={7} style={{ paddingRight: '43px', paddingTop: '10px', }}>
                                <TextField disabled defaultValue={(profile[3] && profile[3].length > 0) ? profile[3][0] : ''} variant="outlined" size="small" style={{ width: '161px' }}
                                InputProps={{ style: { textAlign: 'center',  fontFamily: 'Outfit', fontSize: '12px' }}}/>
                            </Grid>

                            <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingLeft: '57px', paddingRight: '10px', paddingTop: '10px', width: '37px', height: '9px' }}>
                                <Typography align="right" style={{ fontFamily: 'Outfit', color: '#A4A4A4', fontWeight: 400, fontSize: '14px' }}>Grade</Typography>
                            </Grid>
                            <Grid item xs={7} style={{ paddingRight: '43px', paddingTop: '10px',  }}>
                                <TextField disabled defaultValue={(profile[4] && profile[4].length > 0) ? profile[4] : ''} variant="outlined" size="small" style={{ width: '161px' }}
                                InputProps={{ style: { textAlign: 'center',  fontFamily: 'Outfit', fontSize: '12px' }}}/>
                            </Grid>

                            <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingLeft: '57px', paddingRight: '10px', paddingTop: '10px', width: '37px', height: '9px'  }}>
                                <Typography align="right" style={{ fontFamily: 'Outfit', color: '#A4A4A4', fontWeight: 400, fontSize: '14px' }}>Email<span style={{"color": "red"}}>*</span></Typography>
                            </Grid>
                            <Grid item xs={7} style={{ paddingRight: '43px', paddingTop: '10px',   }}>
                                <TextField disabled defaultValue={userEmail} variant="outlined" size="small" className="inputSubmit" style={{ width: '161px' }}
                                InputProps={{style: { textAlign: 'center',  fontFamily: 'Outfit', fontSize: '12px' }}}/>
                            </Grid>

                            <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingLeft: '57px', paddingRight: '10px', paddingTop: '10px', width: '37px', height: '9px' }}>
                                <Typography diabled align="right" style={{ fontFamily: 'Outfit', color: '#A4A4A4', fontWeight: 400, fontSize: '14px' }}>Bio</Typography>
                            </Grid>
                            <Grid item xs={7} style={{ paddingRight: '43px', paddingTop: '10px', }}>
                                <TextField disabled defaultValue={(profile[5] && profile[5].length > 5) ? profile[5] : ''} variant="outlined" multiline rows={6} size="small" style={{ width: '161px',  }}
                                InputProps={{style: { textAlign: 'center',  fontFamily: 'Outfit', fontSize: '12px', }}} />
                            </Grid>
                        </Grid>
                    </form>            
                </DialogContent>
                <Divider style={{ width: '100%', marginTop: '25px',  height: '2px' }} />
            <DialogActions sx={{ p: '18.8px', }}>
                <Button onClick={onClose} sx={{ border: '1px solid #5B5B5B', borderRadius: '9.6px', fontFamily: 'Outfit', textTransform: 'none', color: '#5B5B5B', fontSize: '19.2px', width: '102.2px', height: '44.2px', fontWeight: 400 }}>
                    Cancel
                </Button>
                <Button onClick={onSubmit} sx={{ border: '1px solid #D9D9D9', borderRadius: '9.6px', fontFamily: 'Outfit', textTransform: 'none', color: 'white', backgroundColor: '#4A4FE4', '&:hover': {backgroundColor: '#4A4FE4'}, fontSize: '19.2px', width: '162.2px', height: '44.2px', fontWeight: 400}}>
                    Confirm Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}