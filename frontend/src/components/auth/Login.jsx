import { useState, useContext } from 'react'
import Input from '../input/Input'
import { validateEmail } from '../../constants/helper'
import axiosInstance from '../../constants/axiosInstance'
import { API_PATHS } from '../../constants/apiPaths'
import { UserContext } from '../../context/UserProvider'
import { Link, useNavigate } from 'react-router-dom'
import Particles from '../Particles';

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please Enter the valid email");
      return;
    } 
    if (!password) {
      setError("Please Enter the valid password");
      return;
    }
    setError("");
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      await updateUser(response.data);
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {/* Particles background */}
      <Particles
        particleColors={['#ffffff', '#ffffff']}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1, 
          width: '100%',
          height: '100%',
        }}
      />
      
      {/* Login form */}
      <form 
        className='flex justify-center flex-col items-center gap-y-6 md:ml-0 ml-[-205px] ms:ml-[-240px] ml:ml-[-290px]'
        onSubmit={handleLogin}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1, // Ensure the form is above the particles
          width: '90%',
          maxWidth: '400px', // Limit the width of the form
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        <h1 className='text-2xl font-Urbanist lg:text-4xl'>WELCOME</h1>
        <Input 
          label="Email Address" 
          placeholder="eg. John Doe" 
          value={email} 
          onChange={({ target }) => setEmail(target.value)} 
          type="text" 
        />
        <Input 
          label="Password" 
          placeholder="Min 8 Characters" 
          value={password} 
          onChange={({ target }) => setPassword(target.value)} 
          type="password" 
        />
        {error && <p className='text-red-500 text-sm'>{error}</p>}
        <button type="submit" className='bg-[#1947a8] p-2 hover:bg-[#638ee8] text-white w-[400px]'>
          Login
        </button>
        <p>Don't have an account?{" "}
          <Link to="/signup" className="text-violet-950 underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
