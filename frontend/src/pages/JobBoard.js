import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Divider, Pagination } from '@mui/material';
import dayjs from 'dayjs';
import { Filter } from '../components/Filter';
import { Sort } from '../components/Sort';
import { JobPosting } from '../components/JobPosting';
import { JobCards } from '../components/JobCards';
import { CongratsPopup } from '../components/CongratsPopup';
import { SubmitProfilePopup } from '../components/SubmitPopup';
import { JobPopup } from '../components/JobPopup';
import reject from '../images/Reject.png';

export function JobBoard() {
    const [jobData, setJobData] = useState([])
    const [rawData, setRawData] = useState([]);
    const {render, filterList} = Filter()
    const [filterData, setFilterData] = useState([])
    const [searchData, setSearchData] = useState([])
    const {renderJobPosting, searchInput} = JobPosting()
    const [openPop, setOpenPop] = useState(false)
    const [currentPop, setCurrentPop] = useState([])
    const [profile, setProfile] = useState([])
    const [gotProfile, setGotProfile] = useState(false);

    const [page, setPage] = useState(1);
    const cardsPerPage = 20;
    const totalCards = jobData.length;
    const totalPages = Math.ceil(totalCards / cardsPerPage);

    const [openSubmitProfile, setOpenSubmitProfile] = useState(false);
    const [openCongratsPopup, setOpenCongratsPopup] = useState(false);
    const [userEmail, setUserEmail] = useState(localStorage.getItem("email"));
    const [userRole, setUserRole] = useState(localStorage.getItem("user"));

    // random image for category
    const randomImage = (seed) => {
        return `https://source.unsplash.com/random?${seed}`;
    };    
    
    useEffect(() => {
        // handles getting all jobs
        async function getAllJobs() {
            const route = "https://jiffyjobs-api-production.up.railway.app/api/jobs/get"
            fetch(route)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    data.sort((a, b) => {
                        const startTimeA = dayjs(a.time[0]);
                        const startTimeB = dayjs(b.time[0]);
                        
                        if (!startTimeA.isValid()) return 1;
                        if (!startTimeB.isValid()) return -1;
                        
                        return startTimeA.isAfter(startTimeB) ? 1 : -1;
                    });
                    
                    setRawData(data);
                    const newJobData = data.map(function(obj) {
                        console.log(obj.time)
                        return [[obj._id, obj.title], [randomImage(obj.categories.toString().split(",")[0]), obj.job_poster], ["", obj.location], ["", obj.pay], ["", obj.description], ["", dayjs(new Date(obj.time[0])).format('MM/DD/YY h:mm A')  + " " + " - " + dayjs(new Date(obj.time[1])).format('h:mm A')], ["", obj.categories.toString()]]
                    });
                    setJobData(newJobData)
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        // handles filtering job
        async function filterJobs() {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
            var route = "https://jiffyjobs-api-production.up.railway.app/api/jobs/filter"
            var query = "/*/*/" + Array.from(filterList) + "/*/*"
            route = route + query
            fetch(route, requestOptions)
                .then((response) => {
                    if (!response.ok) { 
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    data.sort((a, b) => {
                        const startTimeA = dayjs(a.time[0]);
                        const startTimeB = dayjs(b.time[0]);
                        
                        if (!startTimeA.isValid()) return 1;
                        if (!startTimeB.isValid()) return -1;
                        
                        return startTimeA.isAfter(startTimeB) ? 1 : -1;
                    });

                    setRawData(data);
                    const newJobData = data.map(function(obj) {
                        return [[obj._id, obj.title], [randomImage(obj.categories.toString().split(",")[0]), obj.job_poster], ["", obj.location], ["", obj.pay], ["", obj.description], ["", dayjs(new Date(obj.time[0])).format('MM/DD/YY h:mm A')  + " " + " - " + dayjs(new Date(obj.time[1])).format('h:mm A')], ["", obj.categories.toString()]]
                    });

                    setFilterData(newJobData)
                })
                .catch((error) => {
                    console.log(error)
                }
            )
        }

        // handles search jobs
        async function searchJob() {
            const route = `https://jiffyjobs-api-production.up.railway.app/api/jobs/search/${searchInput}/prop`;
            fetch(route)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    data.sort((a, b) => {
                        const startTimeA = dayjs(a.time[0]);
                        const startTimeB = dayjs(b.time[0]);
                        
                        if (!startTimeA.isValid()) return 1;
                        if (!startTimeB.isValid()) return -1;
                        
                        return startTimeA.isAfter(startTimeB) ? 1 : -1;
                    });
    
                    setRawData(data);
                    const newJobData = data.map(function(obj) {
                        return [[obj._id, obj.title], [randomImage(obj.categories.toString().split(",")[0]), obj.job_poster], ["", obj.location], ["", obj.pay], ["", obj.description], ["", dayjs(new Date(obj.time[0])).format('MM/DD/YY h:mm A')  + " " + " - " + dayjs(new Date(obj.time[1])).format('h:mm A')], ["", obj.categories.toString()]]
                    });

                    setSearchData(newJobData)
                })
                .catch((error) => {
                    console.log(error)
                })
        };
    
        if (searchInput !== "" && filterList.size !== 0) {
            filterJobs()
            searchJob()

            var oldData = []
            var resultingData = []

            for (let i = 0; i < filterData.length; i++) {
                oldData.push(filterData[i][0][1])
            }

            for (let i = 0; i < searchData.length; i++) {
                if (oldData.includes(searchData[i][0][1])) {
                    resultingData.push(searchData[i])
                }
            }
            setJobData(resultingData);
        } else if (searchInput !== "") {
            searchJob()
            setJobData(searchData)
        } else if (filterList.size !== 0) {
            filterJobs()
            setJobData(filterData)
        } else {
            getAllJobs()
        }
    }, [filterList, searchInput])

    // close popup
    const closePop = () => {
        setOpenPop(false);
    }
    
    // open popup
    const openPopUp = (key) => {
        if (!userEmail) {
            toast.dismiss()
            toast.error('Please login to view!', {
                icon: ({theme, type}) =>  <img src={reject} style={{ width: '24px', height: '24px', marginRight: '10px', marginBottom:'6px'}}/>,
                progressStyle: {backgroundColor: '#C12020'},
                style: {fontFamily: 'Outfit'},
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            setCurrentPop(key);
            console.log(currentPop);
            setOpenPop(true);
        }
    }

    // open submit profile popup
    const handleOpenSubmitProfile = () => {
        if (userRole === 'provider') {
            toast.dismiss()
            toast.error('You can only apply as a Seeker!', {
                icon: ({theme, type}) =>  <img src={reject} style={{ width: '24px', height: '24px', marginRight: '10px', marginBottom:'6px'}}/>,
                progressStyle: {backgroundColor: '#C12020'},
                style: {fontFamily: 'Outfit'},
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (!gotProfile) {
            const requestedOptions = {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
            }
    
            const route = `https://jiffyjobs-api-production.up.railway.app/api/users/getinfo/${userEmail}/${userRole}`;
            fetch(route, requestedOptions)
            .then(async (response) => {
                const res = await response.json()
                if (!response.ok) {
                    throw new Error(res.message);
                }
                return res;
            })
            .then((data) => {
                const user = [data.personal_info.first_name, data.personal_info.last_name, data.personal_info.school, data.personal_info.major, data.personal_info.grade, data.personal_info.personal_statement[0]];
                setProfile(user);
                console.log(profile);
                setOpenSubmitProfile(true);
                setGotProfile(true);
            })
        } else {
            setOpenSubmitProfile(true);
        }
    };

    // close submit profile popup
    const handleCloseSubmitProfile = () => {
        setOpenSubmitProfile(false);
    };


    const handleSubmitProfile = () => {
        const user = {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                seeker_email: userEmail,
                job_id: currentPop[0][0]
            })
        }

        const route = "https://jiffyjobs-api-production.up.railway.app/api/users/apply";
        fetch(route, user)
        .then(async (response) => {
            const res = await response.json()
            if (!response.ok) {
                throw new Error(res.message);
            } 
            return res;
        })
        .then((data) => {
            handleCloseSubmitProfile();
            setOpenCongratsPopup(true);
        })
        .catch((error) => {
            const err = error.message;
            if (err.startsWith('Error: ')) {
                alert(err.slice(7));
                toast.dismiss();
                toast.error(err.slice(7), {
                    icon: ({theme, type}) =>  <img src={reject} style={{ width: '24px', height: '24px', marginRight: '10px', marginBottom:'6px'}}/>,
                    progressStyle: {backgroundColor: '#C12020'},
                    style: {fontFamily: 'Outfit'},
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
            } else {
                toast.error(err, {
                    icon: ({theme, type}) =>  <img src={reject} style={{ width: '24px', height: '24px', marginRight: '10px', marginBottom:'6px'}}/>,
                    progressStyle: {backgroundColor: '#C12020'},
                    style: {fontFamily: 'Outfit'},
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
            }
        });

    };

    const handleApplyMore = () => {
        setOpenCongratsPopup(false); 
        setOpenPop(false); 
    };
    
    return (
        <div className={`outerCard2 ${openPop ? 'blur-background' : ''}`}>
            { renderJobPosting } 
            <Box className='job-table-box'>
                <div className='job-table-inner' style={{ paddingTop: '50px', width: '1136px'}}>
                    <Typography style={{fontFamily: 'Outfit', fontSize: '20px', justifyContent: 'center', alignItems: 'center', textAlign: 'start'}}>
                        Job Board
                    </Typography>
                </div>
            </Box>
            <Box className='job-table-box'>
                <div style={{display: 'grid', justifyContent: 'center', alignItems: 'center',}}>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', width: '1136px', }}>
                        { render }
                        <div>
                            <Sort rawData={rawData} setRawData={setRawData} setJobData={setJobData} />
                        </div>
                    </div>
                    <Divider width='1136px'/>
                </div>
            </Box>
            <JobCards jobData={jobData} page={page} cardsPerPage={cardsPerPage} openPopUp={openPopUp}/>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '1%', fontFamily: 'Outfit', fontSize: '14px' }}>
                <Pagination count={totalPages} page={page} onChange={(event, value) => setPage(value)}  className="custom-pagination" />
            </div>
            {openSubmitProfile && (<SubmitProfilePopup open={openSubmitProfile} onClose={handleCloseSubmitProfile} onSubmit={handleSubmitProfile} profile={profile}/>)}
            {openCongratsPopup && (<CongratsPopup open={openCongratsPopup} onClose={() => setOpenCongratsPopup(false)} apply={handleApplyMore}/>)}
            {openPop && (<JobPopup open={openPop} onClose={closePop} openPopUp={openPopUp} currentPop={currentPop} openSubmitProfile={openSubmitProfile} openCongratsPopup={openCongratsPopup} openSubmit={handleOpenSubmitProfile} />)}
        </div>
    )
}