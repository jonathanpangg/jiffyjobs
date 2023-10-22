import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Form } from 'react-router-dom';
import Chip from '@mui/material/Chip';


export function Filter() {
    const [location, setLocation] = useState([]);
    const [category, setCategory] = useState([]);
    const [duration, setDuration] = useState([]);
    const [payRate, setPayRate] = useState([]);
    const [onOffCampus, setOnOffCampus] = useState([]);


    const handleLocationChange = (event) => { setLocation(event.target.value); };
    const handleCategoryChange = (event) => { setCategory(event.target.value); };
    const handleDurationChange = (event) => { setDuration(event.target.value); };
    const handlePayRateChange = (event) => { setPayRate(event.target.value); };
    const handleOnOffCampusChange = (event) => { setOnOffCampus(event.target.value); };
    const removeSelectedOption = (option, stateUpdater) => { stateUpdater((prevSelected) => prevSelected.filter((item) => item !== option)); };
  
    const filterOptions = {
      location: ['Less than a mile away', '1-2 miles away', '3-5 miles away', '7+ miles away'],
      category: ['Cleaning', 'Food/Restaurant', 'Office jobs', 'Retail', 'Other'],
      duration: ['Less than 6 hours', '1 day', 'Few days - 1 week', 'A few weeks', '1 month', 'More than 1 month'],
      payRate: ['$15/hour', '$15-20/hour', '$20+/hour', 'Stipend based'],
      onOffCampus: ['On campus', 'Off campus'],
    };
    const anyFilterSelected =
    location.length > 0 ||
    category.length > 0 ||
    duration.length > 0 ||
    payRate.length > 0 ||
    onOffCampus.length > 0;

    const customDropdownStyle = {
      width: '200px',
      fontSize: '10px',
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '& .MuiSelect-select': {
        border: 'none',
        paddingRight: '24px', 
      },
    };

    const getKeyFromValue = (value, filterCategory) => {
      for (const key in filterOptions) {
        if (filterOptions[key].includes(value) && key === filterCategory) {
          return key;
        }
      }
      return '';
    };

    const renderSelectedOptions = (selected, stateUpdater) => {
      return selected.map((option) => (
          <Chip
              key={option}
              label={option}
              onDelete={() => removeSelectedOption(option, stateUpdater)}
              color="primary"
              style={{ margin: '4px' }}
          />
      ));
    };

    const selectedOptions = (
      <Card sx={{ m: 2, backgroundColor: '#f0f0f000',  height: '80px', display: 'flex', alignItems: 'center', border: 'none'}}>
          <CardContent>
            <div>
                <p>
                    {renderSelectedOptions(location, setLocation)} 
                    {renderSelectedOptions(category, setCategory)}
                    {renderSelectedOptions(duration, setDuration)}
                    {renderSelectedOptions(payRate, setPayRate)}
                    {renderSelectedOptions(onOffCampus, setOnOffCampus)}
                </p>
            </div>
          </CardContent>
      </Card>
    );

    const renderValue = (selected, filterCategory) => {
      // const selectedKey = getKeyFromValue(selected[0], filterCategory);
      // return selectedKey;
      return ' ';
    };

    return (
      <Card sx={{ m: 2, backgroundColor: '#f0f0f000', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <CardContent>
      <Box sx={{ flexGrow: 1 }}>
        <Grid item xs={12}>
          <Grid container rowSpacing={2} columnSpacing={10} flexWrap="nowrap" >
            {Object.keys(filterOptions).map((filterCategory) => (
              <FormControl key={filterCategory} sx={{ m: 1, ...customDropdownStyle }}>
                <InputLabel>{filterCategory === 'location' ? 'Location' : filterCategory === 'category' ? 'Category' : filterCategory === 'duration' ? 'Duration' : filterCategory === 'payRate' ? 'Pay Rate' : 'On/Off Campus'}</InputLabel>
                <Select
                  label={filterCategory}
                  multiple
                  value={filterCategory === 'location' ? location : filterCategory === 'category' ? category : filterCategory === 'duration' ? duration : filterCategory === 'payRate' ? payRate : onOffCampus}
                  onChange={(e) => {
                    if (filterCategory === 'location') handleLocationChange(e);
                    else if (filterCategory === 'category') handleCategoryChange(e);
                    else if (filterCategory === 'duration') handleDurationChange(e);
                    else if (filterCategory === 'payRate') handlePayRateChange(e);
                    else if (filterCategory === 'onOffCampus') handleOnOffCampusChange(e);
                  }}
                  renderValue={(selected) => renderValue(selected, filterCategory)}
                >
                  {filterOptions[filterCategory].map((option) => (
                    <MenuItem key={option} value={option}>
                      <div>
                        <input type="checkbox" checked={filterCategory === 'location' ? location.indexOf(option) > -1 : filterCategory === 'category' ? category.indexOf(option) > -1 : filterCategory === 'duration' ? duration.indexOf(option) > -1 : filterCategory === 'payRate' ? payRate.indexOf(option) > -1 : onOffCampus.indexOf(option) > -1} />
                        {option}
                      </div>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}
          </Grid>
        </Grid>
        {anyFilterSelected && selectedOptions}
      </Box>
      </CardContent>
      </Card>
    );
  }