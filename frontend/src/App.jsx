import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Hero from "./components/Hero";
import Learnmore from "./layouts/Learnmore";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Chat from "./pages/Chat";
import Share from "./pages/Share";
import Profile from "./pages/Profile";

import { ToastContainer } from 'react-toastify';
import UserProvider from "./context/UserProvider";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";

const App = () => (
  <UserProvider> 
    <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/learn-more" element={<Learnmore />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="chat" element={<Chat />} />
          <Route path="sh" element={<Share />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  </UserProvider> 
);

export default App;
