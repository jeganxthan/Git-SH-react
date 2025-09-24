import React, { useEffect, useState, useContext } from "react";
import { API_PATHS, BASE_URL } from "../constants/apiPaths";
import defaultProfilePic from "../assets/profilepic.jpg";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token } = useContext(UserContext);

  const fetchUsers = async (term = "") => {
    setLoading(true);

    if (!token) {
      console.warn("No token found. Redirecting to login.");
      navigate("/login");
      return;
    }

    try {
      console.log("Searching for:", term);

      const response = await fetch(
        `${BASE_URL}${API_PATHS.USER.GET_ALL_USERS}?search=${encodeURIComponent(term)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Backend error:", errorData);
        throw new Error(`Failed to fetch users: ${response.status}`);
      }

      const data = await response.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchUsers(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
                className="bg-gray-800 shadow-md p-4 rounded-lg flex flex-col items-center text-center hover:bg-gray-500 hover:cursor-pointer"
                onClick={() => navigate(`/dashboard/profile/${user._id}`)}
              >
                <img
                  src={user.profileImage || defaultProfilePic}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover mb-3"
                />
                <h2 className="text-lg font-semibold text-gray-500">{user.username}</h2>
                <p className="text-sm text-gray-200">{user.name}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
