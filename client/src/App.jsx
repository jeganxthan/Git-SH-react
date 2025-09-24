import { BrowserRouter, Routes, Route } from "react-router-dom";

import Hero from "./components/Hero";
import Learnmore from "./layouts/Learnmore";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Chat from "./pages/Chat";
import Share from "./pages/Share";
import Profile from "./pages/Profile";

import { ToastContainer } from "react-toastify";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Onboarding from "./pages/onboarding/Onboarding";
import UserProfilePage from "./pages/components/UserProfilePage";
import Followers from "./pages/components/Followers";
import Following from "./pages/components/Following";
import TextMessage from "./pages/components/TextMessage";
import Otp from "./pages/auth/Otp";
import UserProvider from "./context/UserProvider";

const App = () => (
  <UserProvider>

    <BrowserRouter>
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
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verification" element={<Otp />} />

        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/learn-more" element={<Learnmore />} />

        <Route path="/dashboard" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="chat" element={<Chat />} />
          <Route path="sh" element={<Share />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:id" element={<UserProfilePage />} />
          <Route path="profile/followers" element={<Followers />} />
          <Route path="profile/following" element={<Following />} />
          <Route path="chat/:id" element={<TextMessage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </UserProvider>
);

export default App;
