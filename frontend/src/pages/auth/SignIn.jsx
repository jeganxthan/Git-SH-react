import React from 'react'

const SignIn = () => {
  const googleAuth = () => {
    window.open(`${import.meta.env.VITE_BACKEND_URL}/auth/google/callback`, "_self");
  };
  const githubAuth = () => {
    window.open(`${import.meta.env.VITE_BACKEND_URL}/auth/github/callback`, "_self");
  };


  return (
    <div>
      <h1>Login</h1>
      <button onClick={googleAuth} className='bg-red-400'>Google</button>
      <button onClick={githubAuth} className='bg-red-400'>Github</button>
    </div>
  )
}

export default SignIn