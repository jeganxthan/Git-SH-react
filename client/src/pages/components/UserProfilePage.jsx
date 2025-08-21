import { MoveLeft } from 'lucide-react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../constants/axiosInstance';
import { API_PATHS } from '../../constants/apiPaths';

const UserProfilePage = () => {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1);
    };
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState("");
    const fetchUser = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(API_PATHS.USER.GET_USER)
            setUser(response.data);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(()=>{
        fetchUser();
    },[]);
    return (
        <div>
            <button
                onClick={handleBackClick}
                className="p-2 bg-gray-800 rounded-full text-white hover:bg-gray-600 transition duration-300"
            >
                <MoveLeft className="w-6 h-6" />
            </button>
        </div>
    )
}

export default UserProfilePage