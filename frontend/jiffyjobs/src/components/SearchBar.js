import * as React from 'react';
import TextField from '@mui/material/TextField';

export function SearchBar() {
    return (
        <div> 
            <TextField id="outlined-search" label="Search" type="search" />
        </div>
    );
}