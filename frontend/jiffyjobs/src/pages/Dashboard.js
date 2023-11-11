import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import { styled } from '@mui/material/styles';
import '../styles/Dashboard.css';
import Grid from '@mui/material/Grid';

const CustomTab = styled((props) => <Tab {...props} />)(() => ({
    textTransform: 'none',
}))

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
            <Box sx={{ p: 3 }}>
                {children}
            </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
  
function allyProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export function Dashboard() {
    const [value, setValue] = useState(1);
    const [jobData, setJobData] = useState(['1', '2', '3', '4',]) // '5', '6', '7', '8', '9']

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ flexGrow: 1 }} className='outer-box'>
            <Card elevation='4' style={{display: 'flex', overflow: 'hidden', borderRadius: '15px'}}> 
                <Tabs orientation="vertical" value={value} onChange={handleChange} variant="scrollable" sx={{ borderRight: 1, borderColor: 'divider' }}>
                    <div>
                        <text className='logo-font'>
                            {"JIFFY"}
                        </text> <br></br>
                        <text className='logo-font'>
                            {"JOBS"}
                        </text>
                    </div>
                    <CustomTab label='Status' {...allyProps(1)}/> 
                    <CustomTab label='History' {...allyProps(2)}/> 
                    <CustomTab label='Saved Jobs' {...allyProps(3)}/> 
                </Tabs>
                <TabPanel value={value} index={1} className='progress-tab'>
                    <div style={{fontSize: 'x-large', fontFamily: 'Outfit'}}>
                        Progress
                    </div>
                    <div style={{fontSize: 'medium', fontFamily: 'Outfit'}}>
                        Check your the progress on your job applications!
                    </div>
                    <Grid container className='progress-grid' rowSpacing={2} columnSpacing={2} width='100%'>
                        {jobData.map((key) => {
                            return ( <Grid key={key} item> 
                                <Card sx={{height: 250, width: 250}} elevation={8} square={false} style={{overflow:'hidden', borderRadius: '15px'}}>
                                    <CardMedia
                                        component="img"
                                        alt="placeholder"
                                        height="120px"
                                        image="https://source.unsplash.com/random"
                                    />
                                    <div>
                                        {key}
                                    </div>
                                </Card>
                            </Grid>)
                        })}
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={3}>
                    Item Three
                </TabPanel>
            </Card>
        </Box> 
    );
}