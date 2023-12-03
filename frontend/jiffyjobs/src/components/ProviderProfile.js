export function ProviderProfile() {


return (
<div> 
<Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch', alignContent: 'center', paddingLeft: '10px'}}} noValidate autoComplete="off">
    <Grid container spacing={1} >
        
        <div className='label-input-pair'>

            <Grid item xs={6} sm={3} className='name-box-pair' >
                <Typography sx={{ fontSize:"15px", fontWeight:"normal"}}>
                <p>Organization<span style={{"color": "red"}}>*</span></p>
                </Typography>

                <TextField
                    sx={{ minWidth:"200px"}}
                    id="organzation"
                    onChange={handleOrgChange}
                    value={personalInfo.organization}
                    className='profile-box'
                />
            </Grid>
        </div>
        <div className='label-input-pair'> 
                    
               
                <Grid item xs={6} sm={3} className='name-box-pair' >
                    <Typography className='profile-components'  sx={{fontSize:"15px", width:"200px", marginLeft:"50px", fontWeight:"normal"}}>
                                    Email<span style={{"color": "red"}}>*</span>
                                </Typography>

                                <TextField
                                    disabled
                                    id="email"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{minWidth:"200px"}}
                                    value={UserEmailstate}                    
                                    className='profile-box-fixed-provider'
                                />
                    </Grid>
                 </div>               
                </Grid>                             
            </Box> 
            <div style={{paddingTop:"50px"}}></div>


            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch', alignContent: 'center', paddingLeft: '15px' } }} noValidate autoComplete="off">
              
                <div className='label-input-pair' >
                </div>
                <div className='label-input-pair-beg'>
                    <div style={{ textAlign: 'left', marginLeft:'80%' }}>
                        <Button 
                            variant="contained" 
                            sx={{ 
                            bgcolor: 'grey.700', // This sets the background color to a shade of grey
                            color: 'white', // Sets the text color to black
                            '&:hover': {
                                bgcolor: 'grey.500', // Darker grey on hover
                            },
                            mb: 2 // Margin bottom if needed
                            }}
                            onClick={saveProfileChanges} 
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            </Box>
    </div>
)}