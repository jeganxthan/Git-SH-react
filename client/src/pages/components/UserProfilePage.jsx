import { MoveLeft } from 'lucide-react'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../constants/axiosInstance';
import { API_PATHS } from '../../constants/apiPaths';
import defaultProfilePic from '../../assets/profilepic.jpg';

const UserProfilePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const handleBackClick = () => {
        navigate(-1);
    };

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [isFollowing, setIsFollowing] = useState(false);
    const fetchUser = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(API_PATHS.USER.GET_USER(id));
            setUser(response.data);
        } catch (error) {
            console.error("Failed to fetch user:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFollow = async () => {
        try {
            if (isFollowing) {
                await axiosInstance.post(API_PATHS.USER.UNFOLLOW_USER, { targetUserId: id });
                setIsFollowing(false);
                setUser((prev) => ({
                    ...prev,
                    followers: prev.followers.filter((uid) => uid !== id),
                }));
            } else {
                await axiosInstance.post(API_PATHS.USER.FOLLOW_USER, { targetUserId: id });
                setIsFollowing(true);
                setUser((prev) => ({
                    ...prev,
                    followers: [...(prev.followers || []), id],
                }));
            }
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        if (id) fetchUser();
    }, [id]);

    return (
        <div className="p-4">
            <button
                onClick={handleBackClick}
                className="p-2 bg-gray-800 rounded-full text-white hover:bg-gray-600 transition duration-300"
            >
                <MoveLeft className="w-6 h-6" />
            </button>

            {loading ? (
                <div className="p-6 max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-md animate-pulse">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <div className="w-[100px] h-[100px] shrink-0 rounded-full bg-gray-700"></div>

                        <div className="flex-1 w-full space-y-4">
                            <div className="h-6 w-40 bg-gray-700 rounded"></div>
                            <div className="h-4 w-32 bg-gray-700 rounded"></div>
                            <div className="h-4 w-60 bg-gray-700 rounded"></div>

                            <div className="flex gap-10 mt-6">
                                <div className="h-6 w-12 bg-gray-700 rounded"></div>
                                <div className="h-6 w-12 bg-gray-700 rounded"></div>
                                <div className="h-8 w-20 bg-gray-700 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="p-6 max-w-4xl mx-auto bg-gray-900 text-white rounded-lg shadow-md">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <div className="w-[100px] h-[100px] shrink-0">
                            <img
                                src={user.profileImage || defaultProfilePic}
                                alt="Profile"
                                className="w-full h-full object-cover rounded-full border border-gray-700 shadow"
                            />
                        </div>

                        <div className="flex-1 w-full">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold">{user.name}</h2>
                                    <p className="text-sm text-gray-400">@{user.username}</p>
                                    <p className="mt-1 text-gray-300">{user.bio}</p>
                                </div>

                                <div className="flex gap-10 mt-6 sm:mt-0">
                                    <div className="flex flex-col items-center">
                                        <p className="text-2xl font-semibold">{user.followers?.length || 0}</p>
                                        <span className="text-sm text-gray-400">Followers</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <p className="text-2xl font-semibold">{user.following?.length || 0}</p>
                                        <span className="text-sm text-gray-400">Following</span>
                                    </div>
                                    <button className="bg-blue-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition" onClick={handleFollow}>
                                        {isFollowing ? "Unfollow" : "Follow"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserProfilePage;
