import React from 'react';
import { Box, Grid, Link, Card, CardMedia, Typography } from '@mui/material';

export function JobCards ({ jobData, page, cardsPerPage, openPopUp }) {
    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = page * cardsPerPage;
    const pageJobData = jobData.slice(startIndex, endIndex);

    const isLastPageNotFull = pageJobData.length < cardsPerPage;
    const emptySlots = isLastPageNotFull ? cardsPerPage - pageJobData.length : 0;

    return (    
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}> 
            <Grid container sx={{ maxWidth: 'lg', justifyContent: 'center', columnGap: '50px', marginTop: '25px', marginLeft: '-25px'}}> 
                {pageJobData.map((key) => (
                    <Grid item key={key} xs={2.4} style={{ marginBottom: key === pageJobData.length - 1 ? '0' : '25px', }}>
                            <Link overlay underline="none" sx={{ color: 'text.tertiary', cursor: 'pointer' }} onClick={() => openPopUp(key)}>
                                <Card sx={{width: 264, height: 264,   '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' }}} elevation={8} square={false} style={{overflow:'hidden', borderRadius: '15px' }}>
                                    <CardMedia
                                        component="img"
                                        alt="placeholder"
                                        height="99px"
                                        image={key[1][0]}
                                    />
                                    <Typography style={{fontFamily: 'Outfit', fontSize:"14px", marginLeft:'27.5px', marginRight:'28.5px', marginTop:'21px', fontWeight: 500, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',}}>
                                        <u>{key[0][1]}</u>
                                    </Typography>
                                    <div style={{display: 'flex', maxHeight: '16px', marginTop:'9px'}}>
                                        <Typography style={{fontFamily: 'Outfit', fontSize:"12px", fontWeight: 400, marginLeft:'27.5px'}}>
                                            Pay: 
                                        </Typography>
                                        <Typography style={{fontFamily: 'Outfit', fontSize:"12px", fontWeight: 500, marginLeft:'5px', marginRight:'28.5px'}}>
                                            ${key[3][1]}
                                        </Typography>
                                    </div>
                                    <div style={{ display: 'flex', maxHeight: '16px'}}>
                                        <Typography style={{fontFamily: 'Outfit', fontSize:"12px", fontWeight: 400, marginLeft:'27.5px'}}>
                                            Location: 
                                        </Typography>
                                        <Typography noWrap='true' style={{fontFamily: 'Outfit', fontSize:"12px", fontWeight: 500, marginLeft:'5px', marginRight:'28.5px'}}>
                                            <u> {key[2][1]} </u>
                                        </Typography>
                                    </div>
                                    <div style={{display: 'flex', maxHeight: '16px', marginBottom: '9px'}}>
                                        <Typography style={{fontFamily: 'Outfit', fontSize:"12px", fontWeight: 400, marginLeft:'27.5px'}}>
                                            Time: 
                                        </Typography>
                                        <Typography style={{fontFamily: 'Outfit', fontSize:"12px", fontWeight: 500, marginLeft:'5px', marginRight:'28.5px'}}>
                                            {key[5][1]}
                                        </Typography>
                                    </div>
                                    <div style={{display: 'flex', maxHeight: '32px'}}>
                                        <Typography style={{fontFamily: 'Outfit', fontSize:"12px", fontWeight: 400, marginLeft:'27.5px', paddingBottom: '2px', marginRight:'28.5px', position:'relative', overflow:'hidden', textOverflow:'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, lineHeight: '1.1',}}>
                                            Description:  <span style={{ fontWeight: '500' }}>{key[4][1]}</span>
                                        </Typography>
                                    </div>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                    {Array.from({ length: emptySlots }, (key) => (
                    <Grid item key={`empty-${key}`} xs={2.4} style={{ minWidth: 'calc(20% - 25px)' }} />
                ))}
            </Grid>
        </Box>
    );
}