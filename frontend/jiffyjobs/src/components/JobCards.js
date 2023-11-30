import React from 'react';
import { Box, Grid, Link, Card, CardMedia, Typography } from '@mui/material';

export function JobCards ({ jobData, page, cardsPerPage, openPopUp }) {
    return (    
            <Box sx={{ display: 'flex', justifyContent: 'center' }}> 
                <Grid container className='job-table-grid' sx={{ maxWidth: 'lg', justifyContent: 'center' }} rowSpacing={4} columnSpacing={0}> 
                    {jobData.slice((page - 1) * cardsPerPage, page * cardsPerPage).map((key) => (
                        <Grid key={key} item xs={12} sm={6} md={4} lg={3} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Link overlay underline="none" sx={{ color: 'text.tertiary', cursor: 'pointer' }} onClick={() => openPopUp(key)}>
                                <Card sx={{width: 264, height: 264,   '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' }}} elevation={8} square={false} style={{overflow:'hidden', borderRadius: '15px' }}>
                                    <CardMedia
                                        component="img"
                                        alt="placeholder"
                                        height="99px"
                                        image={key[1][0]}
                                        
                                    />
                                    <Typography style={{fontFamily: 'Outfit', fontSize:"14px", marginLeft:'27.5px', marginRight:'28.5px', marginTop:'21px', fontWeight: 'bold'}}>
                                        <u>{key[0][1]}</u>
                                    </Typography>
                                    <div style={{display: 'flex', maxHeight: '16px'}}>
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
                                    <div style={{display: 'flex', maxHeight: '16px'}}>
                                        <Typography style={{fontFamily: 'Outfit', fontSize:"12px", fontWeight: 400, marginLeft:'27.5px'}}>
                                            Time: 
                                        </Typography>
                                        <Typography style={{fontFamily: 'Outfit', fontSize:"12px", fontWeight: 500, marginLeft:'5px', marginRight:'28.5px'}}>
                                            {key[5][1]}
                                        </Typography>
                                    </div>
                                    <Typography display='flex' style={{fontFamily: 'Outfit', fontSize:"12px", fontWeight: 400, marginLeft:'27.5px'}}>
                                        Description: 
                                        <Typography noWrap='true' style={{fontFamily: 'Outfit', fontSize:"12px", fontWeight: 500, marginLeft:'5px', marginRight:'28.5px', textOverflow: "ellipsis"}}>
                                            {key[4][1]}
                                        </Typography>
                                    </Typography>
                                
                                {/* <div style={{display: 'flex', maxHeight: '32px'}}>
                                    
                                </div> */}
                        
                                {/* <Typography style={{fontFamily: 'Outfit', fontSize:"12px", marginLeft:'27.5px', marginRight:'28.5px', marginTop:'16px', paddingBottom: '26.43px', position:'relative', overflow:'hidden', textOverflow:'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, maxHeight:'12px'}}>
                                    Description: {key[4][1]};
                                </Typography> */}

                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Box>

    );
}