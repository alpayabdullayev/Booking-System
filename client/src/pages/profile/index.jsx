import { UserContext } from '@/context/userContext';
import React, { useContext } from 'react';

const Profile = () => {
  const { role, user } = useContext(UserContext);

  return (
    <div>
      <h1>Username: {user}</h1>
      <h2>Role: {role}</h2>
    </div>
  );
};

export default Profile;
