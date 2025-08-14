import axios from 'axios'
import React, { useState } from 'react'
import { API_PATHS } from '../../constants/apiPaths'
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
    const [boarding, setBoarding] = useState("");
    const navigate = useNavigate();
    const completeOnboarding = async()=>{
        try {
            const res = await axios.post(API_PATHS.USER.ONBOARDING,{},{withCredentials:true});
            setBoarding(res.data.user);
            navigate("/dashboard");
        } catch (error) {
            console.error('Error completing onboarding: ', error.response?.data||error.message);
        }
    }
  return (
    <div>
        <button onClick={completeOnboarding}>Submit</button>
    </div>
  )
}

export default Onboarding