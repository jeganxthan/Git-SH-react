import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserProvider';
import axiosInstance from '../../constants/axiosInstance';
import { API_PATHS } from '../../constants/apiPaths';
import Input from '../input/Input';
import ProfilePhoto from '../input/ProfilePhoto';
import { validateEmail } from '../../constants/helper';
import Particles from '../Particles';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    let profileImageUrl = '';
    
    if (!validateEmail(email)) {
      setError("Please Enter the valid email");
      setLoading(false);
      return;
    }
    if (!password) {
      setError("Please Enter a valid password");
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }
    if (!username) {
      setError("Please Enter the username");
      setLoading(false);
      return;
    }
    setError("");
    
    try {
      if (profilePic) {
        console.log('Uploading image...');
        const imgUploadsRes = await uploadImages(profilePic);

        if (!imgUploadsRes || !imgUploadsRes.imageUrl) {
          throw new Error('Image upload failed');
        }

        profileImageUrl = imgUploadsRes.imageUrl;
        console.log('Image uploaded:', profileImageUrl);
      }
      
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name,
        email,
        password,
        username,
        profileImageUrl,
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
          zIndex: -1, // Ensure the particles stay in the background
          width: '100%',
          height: '100%',
        }}
      />
      
      {/* SignUp form */}
      <form 
        className='flex justify-center flex-col items-center gap-y-6 md:ml-0 ml-[-205px] ms:ml-[-240px] ml:ml-[-290px]'
        onSubmit={handleSignup}
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
        <ProfilePhoto image={profilePic} setImage={setProfilePic} />
        <div className='flex flex-row space-x-6'>
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
          </div>
        <div className='flex flex-row space-x-6'>
        <Input 
          label="Name" 
          placeholder="Your Full Name" 
          value={name} 
          onChange={({ target }) => setName(target.value)} 
          type="text" 
          />
        <Input 
          label="Username" 
          placeholder="Unique username" 
          value={username} 
          onChange={({ target }) => setUsername(target.value)} 
          type="text" 
          />
          </div>
        {error && <p className='text-red-500 text-sm'>{error}</p>}
        <button type="submit" className='bg-[#1947a8] w-full p-2 hover:bg-[#638ee8] text-white'>
          Sign-Up
        </button>
        <p>
          Already have an account?{' '}
          <Link to="/login" className="text-violet-950 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
