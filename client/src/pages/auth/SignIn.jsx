import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";  // ✅ missing import
import { validateEmail } from "../../constants/helper";
import { API_PATHS } from "../../constants/apiPaths";
import Input from "../../components/input/Input";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const googleAuth = () => {
    window.open(
      `${import.meta.env.VITE_BACKEND_URL}/auth/google/callback`,
      "_self"
    );
  };

  const githubAuth = () => {
    window.open(
      `${import.meta.env.VITE_BACKEND_URL}/auth/github/callback`,
      "_self"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // ✅ validation
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        API_PATHS.AUTH.LOGIN,
        { email, password },
        { withCredentials: true } // ✅ keep session cookie
      );

      // ✅ Navigate after login
      if (response.data?.user) {
        if (response.data.user.hasCompletedOnboarding) {
          navigate("/dashboard");
        } else {
          navigate("/onboarding");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

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

        <div className="flex flex-row space-x-4 mt-2">
          <button
            onClick={googleAuth}
            className="w-full bg-white text-black p-2 rounded-xl border hover:bg-slate-400 hover:cursor-pointer flex items-center justify-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
            <span>Google</span>
          </button>

          <button
            onClick={githubAuth}
            className="w-full bg-white text-black p-2 rounded-xl border hover:bg-slate-400 hover:cursor-pointer flex items-center justify-center space-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="black"
            >
              <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.42 7.86 10.95.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.74 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.47.11-3.07 0 0 .96-.31 3.14 1.18.91-.25 1.88-.38 2.85-.39.97.01 1.94.14 2.85.39 2.18-1.49 3.14-1.18 3.14-1.18.62 1.6.23 2.78.11 3.07.73.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.67.41.35.77 1.03.77 2.08 0 1.5-.01 2.7-.01 3.07 0 .31.21.67.8.56A10.52 10.52 0 0023.5 12C23.5 5.74 18.27.5 12 .5z" />
            </svg>
            <span>GitHub</span>
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}
      </div>
    </div>
  );
};

export default SignIn;
