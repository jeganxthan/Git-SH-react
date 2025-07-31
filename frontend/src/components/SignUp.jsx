import {GOOGLE_AUTH_URL} from '../constants/apiPaths'
const SignUp = () => {
  const handleLogin = () => {
    window.open(GOOGLE_AUTH_URL, "_self"); 
  };

  return (
    <div>
      <h1>Sign in</h1>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default SignUp;
