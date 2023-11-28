import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, 
       Button, TextField, Grid, Typography, Stack, Avatar, 
       Divider } from '@mui/material';

// submit profile popup
function SubmitProfilePopup({ open, onClose, onSubmit }) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth={"xl"} PaperProps={{ sx: { borderRadius: "15px", margin: 'auto', width: '500px' } }}>
            <DialogTitle sx={{ textAlign: 'center', fontFamily: 'Outfit', marginTop: 2, }}>Are you sure you want to submit?</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px', margin: 'auto', border: '2px dashed #ccc', borderRadius: '5px', maxWidth: 'calc(100% - 150px)' }}>
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" style={{ paddingBottom: 4, paddingTop: 20, marginRight: '60px'}} >
                        <Avatar sx={{ bgcolor: '#D9D9D9', width: 45, height: 45, color: 'black', fontSize: '25px'}}>LY</Avatar>
                        <Typography variant="subtitle1" style={{ fontFamily: 'Outfit', fontSize: '20px', fontWeight: 'bold' }}>
                            Lucas Yoon
                        </Typography>
                    </Stack>
                    <form noValidate autoComplete="off" style={{ width: '100%' }}>
                        <Grid container alignItems="center" justifyContent="center" style={{ width: '100%' }}>
                            <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 8 }}>
                                <Typography variant="subtitle1" align="right" style={{ fontFamily: 'Outfit', color: '#A4A4A4'}}>School<span style={{"color": "red"}}>*</span></Typography>
                            </Grid>
                            <Grid item xs={7} style={{ padding: 8 }}>
                                <TextField disabled defaultValue="Boston University" variant="outlined" size="small" className="inputSubmit" style={{ width: '200px' }}
                                InputProps={{ style: { textAlign: 'center',  fontFamily: 'Outfit', fontSize: '14px' }}}/>
                            </Grid>
                            <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 8 }}>
                                <Typography variant="subtitle1" align="right" style={{ fontFamily: 'Outfit', color: '#A4A4A4' }}>Major</Typography>
                            </Grid>
                            <Grid item xs={7} style={{ padding: 8 }}>
                                <TextField disabled defaultValue="Computer Science" variant="outlined" size="small" style={{ width: '200px' }}
                                InputProps={{ style: { textAlign: 'center',  fontFamily: 'Outfit', fontSize: '14px' }}}/>
                            </Grid>
                            <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 8 }}>
                                <Typography variant="subtitle1" align="right" style={{ fontFamily: 'Outfit', color: '#A4A4A4' }}>Grade</Typography>
                            </Grid>
                            <Grid item xs={7} style={{ padding: 8 }}>
                                <TextField disabled defaultValue="Third-year" variant="outlined" size="small" style={{ width: '200px' }}
                                InputProps={{ style: { textAlign: 'center',  fontFamily: 'Outfit', fontSize: '14px' }}}/>
                            </Grid>
                            <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 8 }}>
                                <Typography variant="subtitle1" align="right" style={{ fontFamily: 'Outfit', color: '#A4A4A4' }}>Email<span style={{"color": "red"}}>*</span></Typography>
                            </Grid>
                            <Grid item xs={7} style={{ padding: 8 }}>
                                <TextField disabled defaultValue=".edu" variant="outlined" size="small" className="inputSubmit" style={{ width: '200px' }}
                                InputProps={{style: { textAlign: 'center',  fontFamily: 'Outfit', fontSize: '14px' }}}/>
                            </Grid>
                            <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 8 }}>
                                <Typography diabled variant="subtitle1" align="right" style={{ fontFamily: 'Outfit', color: '#A4A4A4' }}>Bio</Typography>
                            </Grid>
                            <Grid item xs={7} style={{ paddingRight: 8, paddingTop: 8, paddingLeft: 8 }}>
                                <TextField disabled defaultValue="I'm a third-year student at BU studying CS. I want money!" variant="outlined" multiline rows={6} size="small" style={{ width: '200px' }}
                                InputProps={{style: { textAlign: 'center',  fontFamily: 'Outfit', fontSize: '14px', }}} />
                            </Grid>
                        </Grid>
                    </form>            
                </DialogContent>
                <Divider style={{ width: '100%', marginTop: '25px',  height: '4px' }} />
            <DialogActions sx={{ marginRight: '15px' }}>
                <Button onClick={onClose} sx={{ border: '1px solid #5B5B5B', borderRadius: '8px', padding: '6px 12px', fontFamily: 'Outfit', textTransform: 'none', color: '#5B5B5B' }}>
                    Cancel
                </Button>
                <Button onClick={onSubmit} sx={{ border: '1px solid #D9D9D9', borderRadius: '8px', padding: '6px 12px', fontFamily: 'Outfit', textTransform: 'none', color: '#5B5B5B', backgroundColor: '#D9D9D9', '&:hover': {backgroundColor: '#D9D9D9'}}}>
                    Submit Profile
                </Button>
            </DialogActions>
        </Dialog>
    );
}


export default SubmitProfilePopup;
