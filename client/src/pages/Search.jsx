import React, { useEffect, useState } from 'react';
import axiosInstance from '../constants/axiosInstance';
import { API_PATHS } from '../constants/apiPaths';

const Search = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // <-- ✅ Added state
  const [loading, setLoading] = useState(true);

  const fetchUsers = async (term = "") => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.USER.GET_ALL_USERS}?search=${encodeURIComponent(term)}`
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); // Initial fetch without search
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchUsers(value);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search users..."
        className="border px-4 py-2 rounded-md mb-4 w-full text-black"
      />

      {loading ? (
        <div className="text-center mt-6">Loading users...</div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {users.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center">No users found.</p>
          ) : (
            users.map((user) => (
              <div
                key={user._id}
                className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center text-center"
              >
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover mb-3"
                />
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-500">@{user.username}</p>
                <p className="text-sm text-gray-600 mt-2">{user.bio}</p>
                <p className="text-xs text-gray-400 mt-1">{user.email}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
