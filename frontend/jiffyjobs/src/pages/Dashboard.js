import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box'
import PropTypes from 'prop-types';
import Card from '@mui/material/Card'
import { VerticalDashboardBar } from '../components/VerticalDashboardBar';
import { StatusDashboard } from '../components/StatusDashboard';
import { SavedJobDashboard } from '../components/SavedJobDashboard';
import '../styles/Dashboard.css';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
        <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
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

export function Dashboard() {
    const { renderVerticalDashBoard, value } = VerticalDashboardBar()

    return (
        <div className={ 'outerCard' }>
            <Box className='outer-box'>
                <div className='inner-div'>
                    <Card elevation='4' style={{display: 'flex', overflow: 'hidden', borderRadius: '15px'}}> 
                        { renderVerticalDashBoard }
                        <TabPanel value={value} index={4} className='progress-tab'>
                            <StatusDashboard/>
                        </TabPanel>
                        <TabPanel value={value} index={6}>
                            Item Two
                        </TabPanel>
                        <TabPanel value={value} index={8} className='progress-tab'>
                            <SavedJobDashboard/>
                        </TabPanel>
                    </Card>
                </div>
            </Box> 
        </div>
    );
}