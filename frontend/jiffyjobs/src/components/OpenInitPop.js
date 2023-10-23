import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import Divider  from '@mui/material/Divider';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';

export function OpenInitPop() {
    const [title ,setTitle] = useState("")
    const [name ,setName] = useState("")
    const [location ,setLocation] = useState("")
    const [pay ,setPay] = useState(0)
    const [description ,setDescription] = useState("")
    const [openStartPop, setOpenStartPop] = useState(false)
    const descriptionElementRefStartPop = React.useRef(null)
    React.useEffect(() => {
        if (openStartPop) {
            const { current: descriptionElement } = descriptionElementRefStartPop
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [openStartPop])

    function updateTitle(event) {
        setTitle(event.target.value)
    }

    function updateName(event) {
        setName(event.target.value)
    }

    function updateLocation(event) {
        setLocation(event.target.value)
    }

    function updatePay(event) {
        setPay(event.target.value)
    }
    

    function PostJobs() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: title,
                job_poster: name,
                description: "Our server ran away, we need a replacement for this weekend ASAP",
                pay: pay,
                location: location,
                categories: ["serving", "cleaning"],
                time: ["2023-10-20T10:00:00", "2023-10-20T18:00:00"],
                date_posted: "2023-10-20T10:00:00"
            })
        }
        const route = "http://localhost:4000/api/jobs/create"
        fetch(route, requestOptions)
            .then((response) => {
                response.json()
                setTitle("")
                setName("")
                setPay(0)
                setLocation("")
                setDescription("")
            })
            .catch((error) => {
                console.log(error)
            })
    }
/*
open={openStartPop} onClose={closePop}
*/
    return (

        <Dialog maxWidth={"1000px"} PaperProps={{sx: { borderRadius: "15px"}}}> 
            <div className='popup-title'>
                <DialogTitle style={{width: "90%"}}> 
                    Tell us more about the job!
                </DialogTitle>
                <IconButton> 
                    <ClearIcon/>
                </IconButton>
            </div>
            <Divider/>
                <DialogContent>
                    <DialogContentText ref={descriptionElementRefStartPop} tabIndex={-1} style={{width: '1000px'}}>
                        <div>
                            <text className='pop-textfield-title'>
                                Job Title
                            </text> <br></br>
                            <TextField required={true} placeholder="" type="search" square={false} style={{width: '98.5%'}} onChange={updateTitle} value={title}/>
                        </div>
                        <div style={{paddingTop: '2.5%'}}>
                            <text className='pop-textfield-title'>
                                Company or Employer Name
                            </text> <br></br>
                            <TextField required={true} placeholder="" type="search" square={false} style={{width: '98.5%'}} onChange={updateName} value={name}/>
                        </div>
                        <div style={{paddingTop: '2.5%'}}>
                            <text className='pop-textfield-title'>
                                Job Location
                            </text> <br></br>
                            <TextField required={true} placeholder="" type="search" square={false} style={{width: '98.5%'}} onChange={updateLocation} value={location}/>
                        </div>
                        <div style={{paddingTop: '2.5%', display: 'flex'}}>
                            <div style={{width: '35%', paddingRight: '2.5%'}}>
                                <text className='pop-textfield-title'>
                                    Pay 
                                </text> <br></br>
                                <TextField required={true} placeholder="" type="search" square={false} className='pop-textfield-title' style={{width: '100%'}} onChange={updatePay} value={pay}/>
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
            <Divider/>
                <DialogActions>
                    <Card sx={{height: 50, width: '10%'}} square={false} style={{overflow:'hidden', borderRadius: '15px', color: 'black', border: "1px solid black"}}>
                        <CardContent style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 
                            Back
                        </CardContent>
                    </Card>
                    <Card sx={{height: 50, width: '10%'}} square={false} style={{overflow:'hidden', borderRadius: '15px', background: "gray", color: 'white'}}>
                        <CardContent style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 
                            Next
                        </CardContent>
                    </Card>
                </DialogActions>
        </Dialog>
    )
}