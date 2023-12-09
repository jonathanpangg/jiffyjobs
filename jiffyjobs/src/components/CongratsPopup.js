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

    return (
        <Dialog open={open} onClose={onClose} maxWidth={"360px"} PaperProps={{ sx: { width: '374px', height: '209px', borderRadius: "10.9px", display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Outfit' } }}>
            <DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontFamily: 'Outfit', width: '129px', height: '12px' }}>
                    <Typography style={{ fontFamily: 'Outfit', fontSize: '17px', fontWeight: 600, color: '#4A4FE4' }}>Congratulations!</Typography>
                </div>
                <div style={{ textAlign: 'center', fontFamily: 'Outfit', width: '259px', height: '46px', marginTop: '24px' }}>
                    <Typography style={{ fontFamily: 'Outfit', fontSize: '14px', fontWeight: 400 }}>You have successfully submitted your profile. You can now track your status of the application in the <span style={{textDecoration: 'underline', fontWeight: 600}}>Dashboard</span>.</Typography>
                </div>
            </DialogContent>
            <Divider style={{ width: '100%', height: '1.44px', paddingTop: '10px', fontWeight: 500 }} />
            <DialogActions style={{ justifyContent: 'center', padding: '13px' }}>
                <Button onClick={handleToDashboard} sx={{ border: '1px solid #5B5B5B', borderRadius: '7px', textTransform: 'none', color: '#5B5B5B', fontFamily: 'Outfit', fontSize: '14px', width: '143px', height: '32px', fontWeight: 400 }}>
                    View Dashboard
                </Button>
                <Button onClick={handleApplyMore} sx={{ border: '1px solid #D9D9D9', borderRadius: '7px', textTransform: 'none', color: '#5B5B5B', backgroundColor: '#D9D9D9', '&:hover': {backgroundColor: '#D9D9D9'}, fontFamily: 'Outfit', fontSize: '14px', width: '143px', height: '32px', fontWeight: 400 }}>
                    Back to Job Board
                </Button>
            </DialogActions>
        </Dialog>          
    );
}