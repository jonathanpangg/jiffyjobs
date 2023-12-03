import React, { useState } from 'react';
import '../styles/Dashboard.css';

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { styled, Tab, Tabs, Divider } from '@mui/material';


const CustomTab = styled((props) => <Tab {...props} />)(() => ({
    textTransform: 'none',
    fontFamily: 'Outfit',
    fontSize: '12px',
    fontWeight: 500,
    fontStyle: 'normal',
    textAlign: 'start',
    minHeight: '0px',
    height: '33px',
    width: "142px",
    justifyContent: 'flex-start',
    whiteSpace: 'nowrap',
    borderRadius: '5px',
    "&.Mui-selected": {
        backgroundColor: '#A4A4A4',
    },
}))

function allyProps(index) {
    return {
        id: `vertical-tab-${index}`,
    };
}
  
export function VerticalDashboardBar() {
    const [value, setValue] = useState(2);

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    return {
        value,
        renderVerticalDashBoard:(
            <Tabs 
                orientation="vertical" 
                value={value} 
                onChange={handleChange} 
                variant="scrollable"
                textColor= "inherit"
                TabIndicatorProps={{style: {display: 'none'}}}
                sx={{ 
                    borderRight: 1, 
                    borderColor: 'divider', 
                    width: "159px",
                    alignItems: 'center',
                }}
            >
                <div className='logo' style={{paddingTop: '24px', paddingLeft: '24px'}}>
                    JIFFY
                </div>
                <div className='logo' style={{paddingLeft: '24px', paddingBottom: '24px'}}>
                    JOBS
                </div>
                <CustomTab label='Status' icon={<TrendingUpIcon/>} iconPosition="start" {...allyProps(2)}/> 
                <CustomTab label='Jobs Posted' icon={<AssignmentIcon/>} iconPosition="start" {...allyProps(3)}/>      
                <CustomTab label='Saved Jobs' icon={<StarOutlineRoundedIcon/>} iconPosition="start" {...allyProps(4)}/>      
            </Tabs>
        )
    }
}