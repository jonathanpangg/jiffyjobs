import React, { useState } from 'react';
import '../styles/Filter.css';

import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Grid, Chip, FormGroup, FormControlLabel, Checkbox, 
       TextField } from '@mui/material';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export function Filter() {
    const [filterList, setFilterList] = useState(new Set())
    const filterOptions = {
      Category: ['Arts', 'Catering', 'Childcare', 'Data Entry', 'Eldercare',
                'Focus Groups', 'Food Services', 'Graphic Design', 'Home Services', 'IT Help',
                'Moving', 'Music & Theatre', 'Office Help', 'Party Help', 'Pet Care',
                'Research', 'Sales & Marketing', 'Snow Shoveling', 'Tutoring', 'Yardwork'
                ]
    };
    const [expandMap, setExpandMap] = useState(new Map(
      [["Category", false],
    ])) 
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [dateRangeSelected, setDateRangeSelected] = useState(false);
    const [dateAdded, setDateAdded] = useState(false);

    // handles the expanding of filters
    function toggleFilter(type) { 
      setExpandMap(prevMap => {
        const newMap = new Map(prevMap);  
        newMap.forEach((val, key) => {
          newMap.set(key, key === type ? !val : false);  
        });
        console.log(newMap);
        return newMap;
      });
    }
    
    // handles functionality of filtering
    function handleFilterList(event) {
      const val = event.target.value;
      setFilterList((prevFilterList) => {
          const newFilterList = new Set(prevFilterList);
          if (val === "DateRange") {
              if (dateRangeSelected) { 
                newFilterList.add(val);
              } else {
                  newFilterList.delete(val);
              }
          } else {
              if (newFilterList.has(val)) {
                  newFilterList.delete(val);
              } else {
                  newFilterList.add(val);
              }
          }
          return newFilterList;
      });
    }
  
    // handles deleting selected filters
    function handleDelete(option) {
      if (isDateRangeString(option)) {
          setStartDate(null);
          setEndDate(null);
          setDateRangeSelected(false);
          setDateAdded(false); 
      }
      setFilterList((prevFilterList) => { 
          const newFilterList = new Set(prevFilterList);
          newFilterList.delete(option);
          return newFilterList;
      });
    }

    // checks if string is a date range
    function isDateRangeString(str) {
      const pattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}\+\d{2}:\d{2},\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}\+\d{2}:\d{2}$/;
      return pattern.test(str);
  }
  
    // updates filter list with date range
    function updateFilterListWithDateRange(dateRangeString) {
      setFilterList(prevFilterList => {
          const newFilterList = new Set(prevFilterList);
          Array.from(newFilterList).forEach(item => {
              if (isDateRangeString(item)) {
                  newFilterList.delete(item);
              }
          });
          newFilterList.add(dateRangeString);
          return newFilterList;
      });
    }

    // clears all current filters
    function clearAllFilters() {
      setFilterList(new Set());
      setStartDate(null);
      setEndDate(null);
      setDateRangeSelected(false);
      setDateAdded(false); 
  }
  
    // renders chips for display and delete filters
    const renderSelectedOptions = (selected) => {
      const chips = Array.from(selected).map(option => {
          if (isDateRangeString(option)) {
              const matches = option.match(/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}\+\d{2}:\d{2})/g);
              if (matches && matches.length === 2) {
                  const startDateStr = dayjs(matches[0]).format('MM/DD/YYYY');
                  const endDateStr = dayjs(matches[1]).format('MM/DD/YYYY');
                  return (
                    <Chip
                      key={option}
                      label={`${startDateStr} - ${endDateStr}`}
                      onDelete={() => handleDelete(option)}
                      style={{ margin: '4px', background: 'transparent', border: 'none', paddingLeft: '4px', paddingRight: '4px', display: 'flex', alignItems: 'center', fontFamily: 'Outfit', fontSize: 'medium'}}
                      deleteIcon={<ClearIcon className='filter-delete'></ClearIcon>}
                    />
                  );
              } else {
                  return (
                    <Chip
                      key={option}
                      label={option}
                      onDelete={() => handleDelete(option)}
                      style={{ margin: '4px', background: 'transparent', border: 'none', paddingLeft: '4px', paddingRight: '4px', display: 'flex', alignItems: 'center', fontFamily: 'Outfit', fontSize: 'medium'}}
                      deleteIcon={<ClearIcon className='filter-delete'></ClearIcon>}
                    />
                  );
              }
            } else {
              return (
                <Chip
                  key={option}
                  label={option}
                  onDelete={() => handleDelete(option)}
                  style={{ margin: '4px', background: 'transparent', border: 'none', paddingLeft: '4px', paddingRight: '4px', display: 'flex', alignItems: 'center', fontFamily: 'Outfit', fontSize: 'medium'}}
                  deleteIcon={<ClearIcon className='filter-delete'></ClearIcon>}
                />
              );
          }
          }
        );
      return chips;
    }
    
    // renders filters
    const renderFilters = (filterCategory, bool) => {
      const options = filterOptions[filterCategory];
      const maxColumns = 5; 
      const columns = Math.ceil(options.length / maxColumns);
      console.log(filterCategory, bool);
      
      if (filterCategory === "DateRange") {
        return (
          <div style={{width: '12.5%', display: 'flex', flexDirection: 'column'}} className='filters'>
            <Grid item xs={1.5} onClick={() => toggleFilter(filterCategory)} className='filter-tab'>
                { filterCategory } 
                { bool ? <KeyboardArrowDownIcon className='arrow-pad'/> : <KeyboardArrowUpIcon className='arrow-pad'/> }
            </Grid>
            { bool && 
              <div className='timeOuter' style={{display: 'flex', flexDirection: 'row', width: '100%', minWidth: '350%', marginTop: '10px'}}>
                <div className='date' style={{display: 'flex', flexDirection: 'column',  minWidth: '10%'}}>
                  <text className='pop-textfield-title'>
                    Start Date
                  </text>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={startDate}
                        onChange={(newValue) => { 
                          setStartDate(newValue);
                          if (endDate && !dateAdded) {
                              setDateAdded(true);
                              const dateRangeString = `${dayjs.utc(newValue).format('YYYY-MM-DDTHH:mm:ss.SSSZ')},${dayjs.utc(endDate).format('YYYY-MM-DDTHH:mm:ss.SSSZ')}`;
                              updateFilterListWithDateRange(dateRangeString);}
                        }}
                        shouldDisableDate={date => endDate && date.isAfter(endDate)}
                        renderInput={(params) => <TextField {...params} helperText="Start date" variant="outlined" style={{ marginRight: '10%' }} />}
                      />
                  </LocalizationProvider>
                </div>
                <div className='date' style={{display: 'flex', flexDirection: 'column',  minWidth: '10%'}}>
                  <text className='pop-textfield-title'>
                    End Date
                  </text>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={endDate}
                        onChange={(newValue) => { 
                          setEndDate(newValue);
                          if (startDate && !dateAdded) {
                              setDateAdded(true);
                              const dateRangeString = `${dayjs.utc(startDate).format('YYYY-MM-DDTHH:mm:ss.SSSZ')},${dayjs.utc(newValue).format('YYYY-MM-DDTHH:mm:ss.SSSZ')}`;
                              updateFilterListWithDateRange(dateRangeString);}
                        }}
                        shouldDisableDate={date => startDate && date.isBefore(startDate)}
                        renderInput={(params) => <TextField {...params} helperText="End date" variant="outlined" style={{ marginRight: '10%' }}/>}
                      />
                  </LocalizationProvider>
                </div>
              </div>
            }
          </div>
        );
      }

    return (
      <div style={{width: '12.5%'}} className='filters'>
        <Grid item xs={1.5} onClick={() => toggleFilter(filterCategory)} className = 'filter-tab'>
            { filterCategory } 
            { bool ? <KeyboardArrowUpIcon className='arrow-pad'/> : <KeyboardArrowDownIcon className='arrow-pad'/> }
        </Grid>
        { bool && 
          <div style={{ display: 'flex', whiteSpace: 'nowrap', minWidth: '250%', marginTop: '10px' }}>
          {Array.from({ length: columns }, (_, columnIndex) => (
            <div key={columnIndex} style={{ display: 'flex', flexDirection: 'column', marginRight: '16px' }}>
              {options
                .slice(columnIndex * maxColumns, (columnIndex + 1) * maxColumns)
                .map((option) => (
                  <FormGroup key={option}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={filterList.has(option)}
                          color='primary'
                          icon={
                            <span
                              style={{ backgroundColor: 'white', width: '14px', height: '14px', display: 'block', borderRadius: '4px', border: '1px solid grey' }}
                            ></span>
                          }
                          checkedIcon={
                            <span
                              style={{ backgroundColor: 'gray', width: '14px', height: '14px', display: 'block', borderRadius: '4px', border: '1px solid grey' }}
                            ></span>
                          }
                        />
                      }
                      color='default'
                      value={option}
                      label={option}
                      onChange={handleFilterList}
                      className='checkboxes'
                    />
                  </FormGroup>
                ))}
            </div>
          ))}
        </div>
        }
      </div>
    )
  }

  return {
    filterList,
    render: (
    <Box sx={{ flexGrow: 1 }}>
        <Grid container columnSpacing={1} wrap="nowrap">
            { Object.keys(filterOptions).map((filterCategory) => (
              renderFilters(filterCategory, expandMap.get(filterCategory))
            ))}   
        </Grid>
        <Grid container columnSpacing={2} style = {{marginTop: '10px'}}>
          { (filterList.size > 0 || dateRangeSelected) && <text className='filterby-tag'> Filtered By: </text>}
          { renderSelectedOptions(filterList) } 
          { (filterList.size > 0 || dateRangeSelected) && 
            <text className='filter-clearall' onClick={clearAllFilters}>
                CLEAR ALL
            </text>
          }
        </Grid>
    </Box>
  )};
}
