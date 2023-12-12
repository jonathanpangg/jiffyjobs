import React, { useEffect, useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Dashboard.css';
import { Box, Card } from '@mui/material'
import PropTypes from 'prop-types';
import { VerticalDashboardBar } from '../components/VerticalDashboardBar';
import { StatusDashboard } from '../components/StatusDashboard';
import { ViewApplicants } from '../components/ViewApplicants';
import { SavedJobDashboard } from '../components/SavedJobDashboard';
import { PostedJobDashboard } from '../components/PostedJobDashboard';
import { useNavigate } from 'react-router-dom';
import reject from '../images/Reject.png';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
        <div 
            role="tabpanel" 
            hidden={value !== index} 
            id={`vertical-tabpanel-${index}`} 
            aria-labelledby={`vertical-tab-${index}`} 
            {...other}
        >
            {value === index && (
                <div>
                    {children}
                </div>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export function Dashboard() {
    const { renderVerticalDashBoard, value } = VerticalDashboardBar()
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [showToken, setShowToken] = useState(false);
    // gives either 'seeker' or 'provider'
    const [userRole, setUserRole] = useState(localStorage.getItem('user'));
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) setShowToken(true);
    },[token]);

    useEffect(()=> {
        if (showToken) {
            console.log(showToken);
            toast.dismiss()
            toast.error('Please Login!', {
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
            navigate('/login');
            setShowToken(false);
        }
    }, [showToken])

    return (
        <div className='outerCard' style={{marginTop: '-25px'}}>
            <div style={{transform: 'scale(0.85)', }}> 
                <Box className='outer-box'>
                    <div className='inner-div'>
                        <Card elevation='4' style={{display: 'flex', overflow: 'hidden', borderRadius: '15px', width: "100%"}}> 
                            { renderVerticalDashBoard }
                            {userRole !== 'provider' && (
                                <TabPanel value={value} index={2} className='progress-tab'>
                                <StatusDashboard/>
                                </TabPanel>
                            )}
                            {userRole === 'provider' ? 
                            <TabPanel value={value} index={2} className='progress-tab'>
                                <PostedJobDashboard/>
                            </TabPanel> : 
                            <TabPanel value={value} index={3} className='progress-tab'>
                            <PostedJobDashboard/>
                            </TabPanel> }
                            {userRole !== 'provider' && 
                            (<TabPanel value={value} index={4} className='progress-tab'>
                                <SavedJobDashboard/>
                            </TabPanel>)}
                        </Card>
                    </div>
                </Box> 
            </div>
        </div>
    );
}