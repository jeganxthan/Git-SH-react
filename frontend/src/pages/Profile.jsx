import React, { useContext } from 'react';
import { UserContext } from '../context/UserProvider';

const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      {user?.profileImageUrl 
        ? <img src={user.profileImageUrl} alt="profile" />
        : null
      }
      <h2>{user?.name}</h2>
    </div>
  );
};

export default Profile;
