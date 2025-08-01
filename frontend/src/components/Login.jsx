import { useState, useContext } from 'react'
import Input from './input/Input'
import { validateEmail } from '../constants/helper'
import axiosInstance from '../constants/axiosInstance'
import { API_PATHS } from '../constants/apiPaths'
import { UserContext } from '../context/UserProvider'
import { useNavigate } from 'react-router-dom'
const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please Enter the validate email");
      return;
    } if (!password) {
      setError("Please Enter the valid password");
      return;
    }
    setError("");
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      })
      await updateUser(response.data);
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard")
      }
    } catch (error) {
      if (error.response && error.response.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  }
  return (
    <div>
      <form className='flex justify-center flex-col items-center gap-y-6 md:ml-0 ml-[-205px] ms:ml-[-240px] ml:ml-[-290px]' onSubmit={handleLogin}>
        <h1 className='text-2xl font-Urbanist lg:text-4xl'>WELCOME</h1>
        <Input label="Email Address" placeholder="eg. John Doe" value={email} onChange={({ target }) => setEmail(target.value)} type="text" />
        <Input label="Password" placeholder="Min 8 Characters" value={password} onChange={({ target }) => setPassword(target.value)} type="password" />
        {error && <p className='text-red-500 text-sm'>{error}</p>}
        <button type="submit" className='bg-[#1947a8] w-full p-2 hover:bg-[#638ee8] text-white'>Login</button>
        <p>Don't have an account?{" "}
          <button className='text-violet-950 underline' onClick={() => setCurrentPage('signup')}>
            SignUp
          </button>
        </p>
      </form>
    </div>
  )
}

export default Login