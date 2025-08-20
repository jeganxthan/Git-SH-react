import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../constants/axiosInstance";
import { API_PATHS } from "../../constants/apiPaths";
import ProfilePhoto from "../../components/input/ProfilePhoto";

const Onboarding = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [bio, setBio] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!profileImage) {
        setError("Please upload a profile photo");
        setIsSubmitting(false);
        return;
      }

      const formData = new FormData();
      // ⚡ field name MUST match multer config
      formData.append("profileImage", profileImage);
      formData.append("bio", bio);

      console.log("Uploading:", { profileImage, bio });

      const response = await axiosInstance.post(API_PATHS.UPLOAD.IMAGE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, // if using cookies/session auth
      });

      console.log("Upload success:", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Upload failed:", error);
      setError("Failed to upload profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-12 text-black">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Complete Your Profile
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* ProfilePhoto should call setImage(file) */}
          <ProfilePhoto image={profileImage} setImage={setProfileImage} />

          <textarea
            placeholder="Write a short bio..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-colors ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
