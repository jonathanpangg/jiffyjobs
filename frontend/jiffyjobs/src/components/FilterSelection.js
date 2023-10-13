import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export function FilterSection() {
    return (
        <div> 
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        <Button variant="filledTonal" endIcon = {<KeyboardArrowDownIcon/>}> Experience </Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}