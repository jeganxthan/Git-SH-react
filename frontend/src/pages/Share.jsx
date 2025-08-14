import React, { useState } from 'react';
import axiosInstance from '../constants/axiosInstance'; // Your axios instance

const Share = () => {
  const [shContent, setShContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleShSubmit = async (e) => {
    e.preventDefault();
    if (!shContent) {
      setError('SH content is required');
      return;
    }

    try {
      const response = await axiosInstance.post('/api/sh/sh', { sh: shContent });
      setSuccess('SH posted successfully!');
      setShContent('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error posting SH');
    }
  };

  return (
    <div>
      <form onSubmit={handleShSubmit}>
        <textarea
          value={shContent}
          onChange={(e) => setShContent(e.target.value)}
          placeholder="Enter your SH content"
        />
        <button type="submit">Post SH</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default Share;
