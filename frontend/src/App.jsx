import { Routes, Route } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";

import Hero from "./components/Hero";
import Learnmore from "./layouts/Learnmore";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Chat from "./pages/Chat";
import Share from "./pages/Share";
import Profile from "./pages/Profile";

import PrivateRoute from "./components/PrivateRoute";
import Onboarding from "./layouts/Onboarding";

const App = () => (
  <Routes>
    <Route path="/" element={<Hero />} />
<Route
  path="/sign-in"
  element={
    <div className="flex justify-center items-center min-h-screen bg-[#07080a]">
      <SignIn redirectUrl="/dashboard" />
    </div>
  }
/>

<Route
  path="/sign-up"
  element={
    <div className="flex justify-center items-center min-h-screen bg-[#07080a]">
      <SignUp redirectUrl="/onboarding" />
    </div>
  }
/>
    <Route path="/learn-more" element={<Learnmore />} />
    <Route path="/onboarding" element={<Onboarding />} />

    {/* Protected routes */}
    <Route
      path="/dashboard"
      element={
        <PrivateRoute>
          <MainLayout />
        </PrivateRoute>
      }
    >
      <Route index element={<Home />} />
      <Route path="search" element={<Search />} />
      <Route path="chat" element={<Chat />} />
      <Route path="sh" element={<Share />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  </Routes>
);

export default App;
