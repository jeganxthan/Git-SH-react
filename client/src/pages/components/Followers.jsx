import React, { useEffect, useState } from 'react'
import axiosInstance from '../../constants/axiosInstance'
import { API_PATHS } from '../../constants/apiPaths'
import defaultProfilePic from '../../assets/profilepic.jpg'
import { MoveLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
const Followers = () => {
    const [followerData, setFollowerData] = useState(null);
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1);
    };
    const fetchFollower = async () => {
        try {
            const { data } = await axiosInstance.get(API_PATHS.USER.SOCIAL_DATA, {
                withCredentials: true,
            });
            setFollowerData(data?.follower || []);
        } catch (err) {
            console.error("Error in fetching the following", err);
        }
    };

    useEffect(() => {
        fetchFollower();
    }, []);

    if (!followerData) {
        return <p>Loading....</p>;
    }

    return (
        <div>
          <button
                onClick={handleBackClick}
                className="p-2 bg-gray-800 rounded-full text-white hover:bg-gray-600 transition duration-300"
            >
                <MoveLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-semibold mt-4 mb-2">Following</h2>
            {followerData.length > 0 ? (
                followerData.map((user) => (
                    <div key={user._id} className="flex items-center gap-2 mb-4">
                        <img
                            src={user.profileImage || defaultProfilePic}
                            alt={user.username}
                            className="w-10 h-10 rounded-full"
                        />
                        <span>{user.username}</span>
                    </div>
                ))
            ) : (
                <p>Not following anyone yet.</p>
            )}
        </div>
    )
}

export default Followers