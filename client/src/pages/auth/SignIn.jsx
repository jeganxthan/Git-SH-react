import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../constants/helper";
import { API_PATHS } from "../../constants/apiPaths";
import Input from "../../components/input/Input";
import axiosInstance from "../../constants/axiosInstance";
import { UserContext } from "../../context/UserProvider";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { updateUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      setLoading(false);
      return;
    }
    if (!password) {
      setError('Please enter a valid password');
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }
    try {
      const payload = {
        email,
        password,
      };

      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, payload);
      const { token } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        updateUser(response.data);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Signup failed:', err);
      if (err.response && err.response.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }

  }

  return (
    <div className="flex justify-center align-middle mt-10">
      <div className="max-w-md mx-auto mt-10 p-6 border bg-white text-black rounded-2xl h-100%">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-[#1947a8] w-full p-2 hover:bg-[#638ee8] text-white disabled:opacity-50 rounded-lg"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="my-4 text-center">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-700">
            Sign Up
          </Link>
        </div>
        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}
      </div>
    </div>
  );
};

export default SignIn;
