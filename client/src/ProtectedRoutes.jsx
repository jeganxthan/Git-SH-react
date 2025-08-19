import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/auth/profile", {
          withCredentials: true,
        });
        setUser(data.user);
      } catch (error) {
        console.error("❌ Auth check failed:", error.response?.data || error.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;

  // Not logged in → redirect login
  if (!user) return <Navigate to="/login" replace />;

  // Logged in but onboarding not done → onboarding page
  if (!user.hasCompletedOnboarding) return <Navigate to="/onboarding" replace />;

  // ✅ Logged in + onboarding done → allow children
  return children;
}
