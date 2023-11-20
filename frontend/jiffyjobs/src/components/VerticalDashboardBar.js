import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { styled } from '@mui/material/styles';
import '../styles/Dashboard.css';
import Divider from '@mui/material/Divider'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';

const CustomTab = styled((props) => <Tab {...props} />)(() => ({
    textTransform: 'none',
    fontFamily: 'Outfit',
    fontSize: 'large',
    selected: {
        backgroundColor: 'gray',
    },
    textAlign: 'start',
    justifyContent: 'flex-start'
}))

function allyProps(index) {
    return {
        id: `vertical-tab-${index}`,
    };
}
  
export function VerticalDashboardBar() {
    const [value, setValue] = useState(7);

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
                sx={{ 
                    borderRight: 1, 
                    borderColor: 'divider', 
                    width: "15vw"
                }}
            >
                {[...Array(7)].map((_) => 
                    <br></br>                    
                )}
                <CustomTab label='Status' icon={<TrendingUpIcon/>} iconPosition="start" {...allyProps(7)}/> 
                <Divider/>
                <CustomTab label='Saved Jobs' icon={<StarOutlineRoundedIcon/>} iconPosition="start" {...allyProps(9)}/>      
            </Tabs>
        )
    }
}