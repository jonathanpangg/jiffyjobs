import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { styled } from '@mui/material/styles';
import '../styles/Dashboard.css';
import Divider from '@mui/material/Divider'

const CustomTab = styled((props) => <Tab {...props} />)(() => ({
    textTransform: 'none',
    fontFamily: 'Outfit',
    fontSize: 'medium',
}))

function allyProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export function VerticalDashboardBar() {
    const [value, setValue] = useState(4);

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    return {
        value,
        renderVerticalDashBoard:(
            <Tabs orientation="vertical" value={value} onChange={handleChange} variant="scrollable" sx={{ borderRight: 1, borderColor: 'divider' }}>
                {[...Array(4)].map((_) => 
                    <br></br>                    
                )}
                <CustomTab label='Status' {...allyProps(4)}/> 
                <Divider/>
                <CustomTab label='History' {...allyProps(6)}/> 
                <Divider/>
                <CustomTab label='Saved Jobs' {...allyProps(8)}/> 
            </Tabs>
        )
    }
}