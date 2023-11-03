import React, { useState } from 'react';
import '../styles/Filter.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export function Filter() {
    const [expandMap, setExpandMap] = useState(new Map(
      [["Category", false],
      ["JobType", false],
      ["DateRange", false]
      // ["OnOffCampus", false]
    ]
    )) 
    const [filterList, setFilterList] = useState(new Set())
    const filterOptions = {
      Category: ['Cleaning', 'Food/Restaurant', 'Office jobs', 'Retail', 'Moving'], 
                //  'Cleaning', 'Food/Restaurant', 'Office jobs', 'Retail', 'Moving',
                //  'Cleaning', 'Food/Restaurant', 'Office jobs', 'Retail', 'Moving',
                //  'Cleaning', 'Food/Restaurant', 'Office jobs', 'Retail', 'Moving'],
      JobType: ['Quick Jobs (1 day)', 'Short Term Jobs (1-7 days)', 'Part-Time Jobs (7+ Days)'],
      DateRange: [],
      // OnOffCampus: ['On campus', 'Off campus'],
    };

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

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
        if (newFilterList.has(val)) {
          newFilterList.delete(val);
        } else {
          newFilterList.add(val);
        }
        return newFilterList;
      });
    }
    
    // handles deleting selected filters
    function handleDelete(option) {
      setFilterList((prevFilterList) => {
        const newFilterList = new Set(prevFilterList);
        newFilterList.delete(option);
        return newFilterList;
      });
    }

    // clears all current filters
    function clearAllFilters() {
      setFilterList(new Set());
    }
  
    // renders chips for display and delete filters
    const renderSelectedOptions = (selected) => {
      return Array.from(selected, option => (
          <Chip
              key={option}
              label={option}
              onDelete={() => handleDelete(option)}
              style={{ margin: '4px', background: 'transparent', border: 'none', paddingLeft: '4px', paddingRight: '4px', display: 'flex', alignItems: 'center', fontFamily: 'Outfit', fontSize: 'medium'}}
              deleteIcon={<ClearIcon className='filter-delete'></ClearIcon>}
            />
      ));
    }

    // renders filters
    const renderFilters = (filterCategory, bool) => {
      console.log(filterCategory, bool);
      if (filterCategory === "DateRange") {
        return (
          <div style={{width: '12.5%', display: 'flex', flexDirection: 'column'}} className='filters'>
            <Grid item xs={1.5} onClick={() => toggleFilter(filterCategory)} className='filter-tab'>
                { filterCategory } 
                { bool ? <KeyboardArrowDownIcon className='arrow-pad'/> : <KeyboardArrowUpIcon className='arrow-pad'/> }
            </Grid>
            { bool && 
              <div className='timeOuter' style={{display: 'flex', flexDirection: 'row', width: '100%', minWidth: '350%'}}>
                <div className='date' style={{display: 'flex', flexDirection: 'column',  minWidth: '15%'}}>
                  <text className='pop-textfield-title'>
                    Start Date
                  </text>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                        renderInput={(params) => <TextField {...params} helperText="Start date" variant="outlined" style={{ marginRight: '10%' }} />}
                      />
                  </LocalizationProvider>
                </div>
                <div style={{display: 'flex', flexDirection: 'column',  minWidth: '15%'}}>
                  <text className='pop-textfield-title'>
                    End Date
                  </text>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={endDate}
                        onChange={(newValue) => setEndDate(newValue)}
                        renderInput={(params) => <TextField {...params} helperText="End date" variant="outlined" />}
                      />
                  </LocalizationProvider>
                </div>
              </div>
            }
          </div>
        );
      }
      
    const options = filterOptions[filterCategory];
    const maxColumns = 5; 
    const columns = Math.ceil(options.length / maxColumns);

    return (
      <div style={{width: '12.5%'}} className='filters'>
        <Grid item xs={1.5} onClick={() => toggleFilter(filterCategory)} className = 'filter-tab'>
            { filterCategory } 
            { bool ? <KeyboardArrowDownIcon className='arrow-pad'/> : <KeyboardArrowUpIcon className='arrow-pad'/> }
        </Grid>
        { bool && 
          <div style={{ display: 'flex', whiteSpace: 'nowrap', minWidth: '250%' }}>
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
                              style={{ backgroundColor: 'white', width: '16px', height: '16px', display: 'block', borderRadius: '4px', border: '1px solid grey' }}
                            ></span>
                          }
                          checkedIcon={
                            <span
                              style={{ backgroundColor: 'gray', width: '16px', height: '16px', display: 'block', borderRadius: '4px', border: '1px solid grey' }}
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
        <Grid container columnSpacing={2}>
          { filterList.size > 0 && <text className='filterby-tag'> Filtered By: </text>}
          { renderSelectedOptions(filterList, setFilterList) } 
          { filterList.size > 0 && 
            <text className='filter-clearall' onClick={clearAllFilters} >
                CLEAR ALL
            </text>
          }
        </Grid>
    </Box>
  )};
}
