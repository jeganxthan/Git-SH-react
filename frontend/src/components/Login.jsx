import {GOOGLE_AUTH_URL} from '../constants/apiPaths'
const Login = () => {
  const handleLogin = () => {
    window.open(GOOGLE_AUTH_URL, "_self");
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
