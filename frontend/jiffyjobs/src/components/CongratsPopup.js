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
        <Dialog open={open} onClose={onClose} maxWidth={"500px"} PaperProps={{ sx: { width: '345px', height: '220px', borderRadius: "15px", display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Outfit' } }}>
            <DialogTitle style={{ textAlign: 'center', fontFamily: 'Outfit' }}>Congratulations!</DialogTitle>
            <DialogContent style={{ textAlign: 'center', fontFamily: 'Outfit' }}>
                <Typography style={{ fontSize: '17px' }}>You have successfully submitted your profile. You can track your status in the Dashboard.</Typography>
            </DialogContent>
            <Divider style={{ width: '100%', height: '4px', paddingTop: '14px' }} />
            <DialogActions style={{ justifyContent: 'center' }}>
                <Button onClick={handleToDashboard} sx={{ border: '1px solid #5B5B5B', borderRadius: '8px', padding: '6px 12px', textTransform: 'none', color: '#5B5B5B', margin: '0 8px' }}>
                    View Dashboard
                </Button>
                <Button onClick={handleApplyMore} sx={{ border: '1px solid #D9D9D9', borderRadius: '8px', padding: '6px 12px', textTransform: 'none', color: '#5B5B5B', backgroundColor: '#D9D9D9', '&:hover': {backgroundColor: '#D9D9D9'}, margin: '0 8px' }}>
                    Back to Job Board
                </Button>
            </DialogActions>
        </Dialog>        
    );
}