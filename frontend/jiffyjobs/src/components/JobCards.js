import React from 'react';
import { Box, Grid, Link, Card, CardMedia, Typography } from '@mui/material';

const JobCards = ({ jobData, page, cardsPerPage, openPopUp }) => {
    return (
        <Box>
            <Grid container className= { 'job-table-grid' } style={{ backgroundColor: 'inherit' }}rowSpacing={2} columnSpacing={2}>
                {jobData.slice((page - 1) * cardsPerPage, page * cardsPerPage).map((key) => (
                    <Grid key={key} item>
                        <Link overlay underline="none" sx={{ color: 'text.tertiary', cursor: 'pointer' }} onClick={() => openPopUp(key)}>
                            <Card sx={{width: '21.5vw', height: '21.5vw', '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' }}} elevation={8} square={false} style={{overflow:'hidden', borderRadius: '15px', }}>
                                <CardMedia
                                    component="img"
                                    alt="placeholder"
                                    height="120"
                                    image="https://source.unsplash.com/random"
                                    
                                />
                                <Typography style={{fontFamily: 'Outfit', fontSize:"14px", marginLeft:'27.5px', marginRight:'28.5px', marginTop:'21px', fontWeight: 'bold'}}>
                                    <u>{key[0][1]}</u>
                                </Typography>
                                <Typography style={{fontFamily: 'Outfit', fontSize:"12px", marginLeft:'27.5px', marginRight:'28.5px', marginTop:'14px'}}>
                                    Pay: <strong>${key[3][1]}</strong>
                                </Typography>
                                <Typography style={{fontFamily: 'Outfit', fontSize:"12px", marginLeft:'27.5px', marginRight:'28.5px', position:'relative', overflow:'hidden', textOverflow:'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1, maxHeight:'22px'}}>
                                    Location:  <strong><u>{key[2][1]}</u></strong>
                                </Typography>
                                <Typography style={{fontFamily: 'Outfit', fontSize:"12px", marginLeft:'27.5px', marginRight:'28.5px'}}>
                                    Time: <strong>{key[5][1]}</strong>
                                </Typography>
                                <Typography style={{fontFamily: 'Outfit', fontSize:"12px", marginLeft:'27.5px', marginRight:'28.5px', marginTop:'14px', paddingBottom: '26.43px', position:'relative', overflow:'hidden', textOverflow:'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, maxHeight:'12px'}}>
                                    Description: <strong>{key[4][1]}</strong>
                                </Typography>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default JobCards;
