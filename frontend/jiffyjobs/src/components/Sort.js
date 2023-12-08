import React, { useState } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Grid, MenuItem, Menu, } from '@mui/material';

import dayjs from 'dayjs';

export function Sort({ rawData, setRawData, setJobData }) {
    const [selectedSortBy, setSelectedSortBy] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);

    // handle filter options
    const filterOptions = {
        SortBy: ['Date Deadline', 'Pay: Low to High', 'Pay: High to Low']
    };

    // handle menu click
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // handle menu close
    const handleClose = (value) => {
        setSelectedSortBy(value);
        
        console.log("Before sorting: ", rawData);
        const sortedData = sortJobs(value, rawData);
        console.log("After sorting: ", sortedData);
        
        setRawData(sortedData);
        setJobData(sortedData.map(obj => {
            return [[obj._id, obj.title], [`https://source.unsplash.com/random?${obj.categories.toString().split(",")[0]}`, obj.job_poster], ["", obj.location], ["", obj.pay], ["", obj.description], ["", dayjs(new Date(obj.time[0])).format('MM/DD/YY h:mm A')  + " " + " - " + dayjs(new Date(obj.time[1])).format('h:mm A')], ["", obj.categories.toString()]]
        }));
    };
    
    // sort jobs based on selected criteria
    const sortJobs = (criteria, data) => {
        console.log("Selected criteria: ", criteria);
        const sortedData = [...data];
        switch (criteria) {
            case 'Pay: High to Low':
            sortedData.sort((a, b) => parseFloat(b.pay) - parseFloat(a.pay));
            break;
            case 'Pay: Low to High':
            sortedData.sort((a, b) => parseFloat(a.pay) - parseFloat(b.pay));
            break;
            case 'Date Deadline':
            sortedData.sort((a, b) => new Date(a.time[0]) - new Date(b.time[0]));
            break;
        }
        return sortedData;
    };
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container justifyContent="flex-end" alignItems="center" style={{ marginLeft: '-72px' }}>
                <div style={{width: '12.5%', whiteSpace: 'nowrap'}} className='filters'>
                    <Grid 
                      item
                      xs={1.5}
                      onClick={handleClick}
                      className='filter-tab'
                      style={{fontFamily: 'Outfit', cursor:'pointer'}}
                    >
                        Sort by 
                        { anchorEl 
                            ? <KeyboardArrowUpIcon className='arrow-pad' /> 
                            : <KeyboardArrowDownIcon className='arrow-pad' />
                        }
                    </Grid>

                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >
                        {filterOptions.SortBy.map(option => (
                            <MenuItem key={option} onClick={() => handleClose(option)} style={{fontFamily: 'Outfit', fontSize: '14px'}}>
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
            </Grid>
        </Box>
    );
}
