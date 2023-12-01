import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Dialog, Divider, Typography, DialogContentText, DialogContent, 
        DialogActions, DialogTitle, Link, Button, Pagination, Grid, 
        CardContent, Card, Box, IconButton, Chip, TextField, Avatar,
        Stack,  } from '@mui/material';

// handles congrats popup
export function CongratsPopup({ open, onClose}) {
    const [openPop, setOpenPop] = useState(false)
    const [openCongratsPopup, setOpenCongratsPopup] = useState(false);

    const navigate = useNavigate();

    // close popups
    const handleApplyMore = () => {
        setOpenCongratsPopup(false); 
        setOpenPop(false); 
    };

    // goes to dashboard
    const handleToDashboard = () => {
        navigate('/dashboard');
    };

    const handleClose = () => {
        onClose(); 
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth={"500px"} PaperProps={{ sx: { width: '519px', height: '290px', borderRadius: "15px", display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Outfit', } }}>
            <DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', fontFamily: 'Outfit', width: '179px', height: '16px',  }}>
                    <Typography style={{ textAlign: 'center', fontFamily: 'Outfit', fontSize: '24px', fontWeight: 500}}>Congratulations!</Typography>
                </div>
                <div style={{ textAlign: 'center', fontFamily: 'Outfit', width: '360px', height: '64px', marginTop: '33px' }}>
                    <Typography style={{ fontFamily: 'Outfit', fontSize: '20px', fontWeight: 400 }}>You have successfully submitted your profile. You can now track your status in the Dashboard.</Typography>
                </div>
            </DialogContent>
            <Divider style={{ width: '100%', height: '2px', paddingTop: '14px', fontWeight: 500 }} />
            <DialogActions style={{ justifyContent: 'center', padding: '17.9px' }}>
                <Button onClick={handleToDashboard} sx={{ border: '1px solid #5B5B5B', borderRadius: '8px', textTransform: 'none', color: '#5B5B5B', fontFamily: 'Outfit', fontSize: '19.2px', width: '199.2px', height: '44.2px', fontWeight: 400}}>
                    View Dashboard
                </Button>
                <Button onClick={handleApplyMore} sx={{ border: '1px solid #D9D9D9', borderRadius: '8px', textTransform: 'none', color: '#5B5B5B', backgroundColor: '#D9D9D9', '&:hover': {backgroundColor: '#D9D9D9'}, fontFamily: 'Outfit', fontSize: '19.2px', width: '199.2px', height: '44.2px', fontWeight: 400 }}>
                    Back to Job Board
                </Button>
            </DialogActions>
        </Dialog>        
    );
}