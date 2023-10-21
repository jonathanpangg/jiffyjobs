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



export function Filter() {
    const [location, setLocation] = useState([]);
    const [category, setCategory] = useState([]);
    const [duration, setDuration] = useState([]);
    const [payRate, setPayRate] = useState([]);
    const [onOffCampus, setOnOffCampus] = useState([]);


    const handleLocationeChange = (event) => { setLocation(event.target.value); };
    const handleCategoryChange = (event) => { setCategory(event.target.value); };
    const handleDurationChange = (event) => { setDuration(event.target.value); };
    const handlePayRateChange = (event) => { setPayRate(event.target.value); };
    const handleOnOffCampusChange = (event) => { setOnOffCampus(event.target.value); };
  
    const locationOptions = ['Less than a mile away', '1-2 miles away', '3-5 miles away', '7+ miles away'];
    const categoryOptions = ['Cleaning', 'Food/Restaurant', 'Office jobs', 'Retail', 'Other'];
    const durationOptions = ['Less than 6 hours', '1 day', 'Few days - 1 week', 'A few weeks', '1 month', 'More than 1 month'];
    const payOptions = ['$15/hour', '$15-20/hour', '$20+/hour', 'Stipend based'];
    const campusOptions = ['On campus', 'Off campus'];

    return (
        <Box display="flex" >
            <Card sx={{ minWidth: 275 }}>
                <Grid container spacing={1} flexWrap="nowrap">
                    <Grid item xs={1} sm={6}>
                        <FormControl sx={{ m: 1, width: 200}}>
                            <InputLabel>Location</InputLabel>
                            <Select
                                label="Location"
                                multiple
                                value={location}
                                onChange={handleLocationeChange}
                                renderValue={(selected) => (
                                    <div>
                                      {selected.map((value) => (
                                        <div key={value}>{value}</div>
                                      ))}
                                    </div>
                                  )}
                                >
                                  {locationOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                      <div>
                                        <input
                                          type="checkbox"
                                          checked={location.indexOf(option) > -1}
                                        />
                                        {option}
                                      </div>
                                    </MenuItem>
                                  ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <FormControl sx={{ m: 1, width: 200}}>
                            <InputLabel>Category</InputLabel>
                            <Select
                                label="Category"
                                multiple
                                value={category}
                                onChange={handleCategoryChange}
                                renderValue={(selected) => (
                                    <div>
                                      {selected.map((value) => (
                                        <div key={value}>{value}</div>
                                      ))}
                                    </div>
                                  )}
                                >
                                  {categoryOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                      <div>
                                        <input
                                          type="checkbox"
                                          checked={category.indexOf(option) > -1}
                                        />
                                        {option}
                                      </div>
                                    </MenuItem>
                                  ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <FormControl sx={{ m: 1, width: 200}}>
                            <InputLabel>Duration</InputLabel>
                            <Select
                                label="Duration"
                                multiple
                                value={duration}
                                onChange={handleDurationChange}
                                renderValue={(selected) => (
                                    <div>
                                      {selected.map((value) => (
                                        <div key={value}>{value}</div>
                                      ))}
                                    </div>
                                  )}
                                >
                                  {durationOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                      <div>
                                        <input
                                          type="checkbox"
                                          checked={duration.indexOf(option) > -1}
                                        />
                                        {option}
                                      </div>
                                    </MenuItem>
                                  ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <FormControl sx={{ m: 1, width: 200}}>
                            <InputLabel>Pay Rate</InputLabel>
                            <Select
                                label="Pay Rate"
                                multiple
                                value={payRate}
                                onChange={handlePayRateChange}
                                renderValue={(selected) => (
                                    <div>
                                      {selected.map((value) => (
                                        <div key={value}>{value}</div>
                                      ))}
                                    </div>
                                  )}
                                >
                                  {payOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                      <div>
                                        <input
                                          type="checkbox"
                                          checked={payRate.indexOf(option) > -1}
                                        />
                                        {option}
                                      </div>
                                    </MenuItem>
                                  ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <FormControl sx={{ m: 1, width: 200}}>
                            <InputLabel>On/Off Campus</InputLabel>
                            <Select
                                label="On/Off Campus"
                                multiple
                                value={onOffCampus}
                                onChange={handleOnOffCampusChange}
                                renderValue={(selected) => (
                                    <div>
                                      {selected.map((value) => (
                                        <div key={value}>{value}</div>
                                      ))}
                                    </div>
                                  )}
                                >
                                  {campusOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                      <div>
                                        <input
                                          type="checkbox"
                                          checked={onOffCampus.indexOf(option) > -1}
                                        />
                                        {option}
                                      </div>
                                    </MenuItem>
                                  ))}
                            </Select>
                        </FormControl>
                    </Grid>     
                    </Grid>
               
            </Card>
        </Box>
    );
}

