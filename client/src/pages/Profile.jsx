import React, { useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import moment from 'moment';
import defaultProfilePic from '../assets/profilepic.jpg';

const Profile = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (!user) return <div className="text-center mt-4 text-red-500">User not logged in.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-900 text-white rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-[100px] h-[100px] shrink-0">
          <img
            src={user.profileImage||defaultProfilePic}
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
            <div className="text-sm text-gray-400 mt-4 sm:mt-0">
              {moment().format("ddd Do MMM YYYY")}
            </div>
            </div>

          <div className="flex gap-10 mt-6">
            <div className="flex flex-col items-center">
              <p className="text-2xl font-semibold">{user.followers?.length || 0}</p>
              <span className="text-sm text-gray-400">Followers</span>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-2xl font-semibold">{user.following?.length || 0}</p>
              <span className="text-sm text-gray-400">Following</span>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
