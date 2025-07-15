import React from 'react';
import { useAuth } from '@clerk/clerk-react';

const ClerkTokenLogger = () => {
  const { getToken } = useAuth();

  const handleLogToken = async () => {
    const token = await getToken();
    console.log('🔐 Clerk JWT Token:', token);
  };

  return (
    <button
      onClick={handleLogToken}
      style={{
        padding: '10px',
        backgroundColor: '#6c47ff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
      }}
    >
      Log Clerk Token
    </button>
  );
};

export default ClerkTokenLogger;
