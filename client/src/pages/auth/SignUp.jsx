import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../constants/helper";
import { API_PATHS } from "../../constants/apiPaths";
import Input from "../../components/input/Input";
import axiosInstance from "../../constants/axiosInstance";
import { UserContext } from "../../context/UserProvider";

const SignUp = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
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
    if (!password || password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        name,
        username,
        email,
        password,
      };

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, payload);

      updateUser(response.data);
      navigate(`/verification?email=${encodeURIComponent(email)}`);
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
    <div className="flex justify-center align-middle mt-10 max-w-md mx-auto ">
      <div className="mt-10 p-6 border bg-white text-black rounded-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Name"
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label="Email"
            type="text"
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
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="my-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700">
            Login
          </Link>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
