import axios from 'axios'
import React, { useState } from 'react'
import { API_PATHS, BASE_URL } from '../../constants/apiPaths'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../constants/axiosInstance';

const Onboarding = () => {
    const [boarding, setBoarding] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [bio, setBio] = useState("");
    const navigate = useNavigate();
    
    const handleFileChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleSubmit = async () => {
    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('username', username);
        formData.append('profileImage', profileImage);
        formData.append('bio', bio);

        // Create user with form data (file upload)
        const response = await axios.post(API_PATHS.USER.CREATE_USER, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        // If successful, navigate to dashboard
        if (response.status === 201) {
            navigate("/dashboard");
        }
    } catch (error) {
        console.error('Error completing onboarding: ', error.response?.data || error.message);
    }
};


    return (
        <div className='text-black'>
            <input 
                type="text" 
                placeholder="Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
            />
            <textarea 
                placeholder="Write a short bio..." 
                value={bio} 
                onChange={(e) => setBio(e.target.value)} 
            />
            <button onClick={handleSubmit} className='bg-red-300'>Submit</button>
        </div>
    );
}

export default Onboarding;
