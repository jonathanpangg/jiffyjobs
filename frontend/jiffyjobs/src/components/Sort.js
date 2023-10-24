import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';


export function Sort() {
    const [selectedSortBy, setSelectedSortBy] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);

    const filterOptions = {
        SortBy: ['Pay: Hight to Low', 'Pay: Low to High', 'Date: New to Old', 'Date: Old to New']
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (value) => {
        setSelectedSortBy(value);
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container columnSpacing={1}>
                <div style={{width: '12.5%'}} className='filters'>
                    <Grid 
                      item
                      xs={1.5}
                      onClick={handleClick}
                      className='filter-tab'
                    >
                        SortBy 
                        { anchorEl 
                            ? <KeyboardArrowDownIcon className='arrow-pad'/> 
                            : <KeyboardArrowUpIcon className='arrow-pad'/>
                        }
                    </Grid>

                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >
                        {filterOptions.SortBy.map(option => (
                            <MenuItem key={option} onClick={() => handleClose(option)}>
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
            </Grid>
        </Box>
    );
}
