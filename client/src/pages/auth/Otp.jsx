import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../constants/axiosInstance";
import { API_PATHS } from "../../constants/apiPaths";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Otp = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const emailFromQuery = query.get("email") || "";
  const [email] = useState(emailFromQuery);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5 * 60);

  useEffect(() => {
    if (!emailFromQuery) {
      navigate("/signup");
    }
  }, [emailFromQuery, navigate]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.VERIFY_OTP, {
        email,
        otp,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        setSuccess("OTP Verified successfully!");
        setTimeout(() => navigate("/onboarding"), 1000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.RESEND_OTP, { email });
      setSuccess(res.data.message);
      setTimeLeft(5 * 60); // reset timer after resend
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">Verify Your Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
          />

          <input
            type="text"
            placeholder="Enter the OTP"
            className="w-full p-2 border border-gray-300 rounded"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <button
            onClick={handleResend}
            disabled={loading || timeLeft > 0}
            className={`underline text-blue-600 ${loading || timeLeft > 0 ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Resend OTP
          </button>
          <span>Expires in: {formatTime(timeLeft)}</span>
        </div>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        {success && <p className="text-green-600 text-center mt-2">{success}</p>}
      </div>
    </div>
  );
};

export default Otp;
