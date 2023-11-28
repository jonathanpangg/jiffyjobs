import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { styled } from '@mui/material/styles';
import '../styles/Dashboard.css';
import Divider from '@mui/material/Divider'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import { alignProperty } from '@mui/material/styles/cssUtils';

const CustomTab = styled((props) => <Tab {...props} />)(() => ({
    textTransform: 'none',
    fontFamily: 'Outfit',
    fontSize: '12px',
    fontWeight: 500,
    fontStyle: 'normal',
    textAlign: 'start',
    justifyContent: 'flex-start',
    whiteSpace: 'nowrap',
    // borderRadius: '15px',
    // "&.Mui-selected": {
    //     backgroundColor: '#A4A4A4',
    // },
    // '&.MuiTab-root': {
    //     height: '33px'
    // }
}))

function allyProps(index) {
    return {
        id: `vertical-tab-${index}`,
    };
}
  
export function VerticalDashboardBar() {
    const [value, setValue] = useState(6);

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
                TabIndicatorProps={{style: {backgroundColor: 'black'}}}
                sx={{ 
                    borderRight: 1, 
                    borderColor: 'divider', 
                    width: "142px",
                    // height: '99px',
                }}
            >
                {[...Array(6)].map((_) => 
                    <br></br>                    
                )}
                <CustomTab label='Status' icon={<TrendingUpIcon/>} iconPosition="start" {...allyProps(6)}/> 
                <CustomTab label='Posted Jobs' icon={<AssignmentIcon/>} iconPosition="start" {...allyProps(7)}/>      
                <CustomTab label='Saved Jobs' icon={<StarOutlineRoundedIcon/>} iconPosition="start" {...allyProps(8)}/>      
            </Tabs>
        )
    }
}