import React, { useRef, useState } from "react";
import { Pen, User, Trash } from "lucide-react";

const ProfilePhoto = ({ image, setImage }) => {
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // send the actual File to parent
      setPreview(URL.createObjectURL(file)); // local preview
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const triggerFileInput = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center items-center mt-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      <div className="relative w-[100px] h-[100px]">
        {preview ? (
          <img
            src={preview}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
            <User className="text-gray-500" size={40} />
          </div>
        )}

        <button
          type="button"
          onClick={triggerFileInput}
          className="absolute bottom-0 right-0 bg-blue-600 p-1.5 rounded-full shadow"
        >
          <Pen size={14} className="text-white" />
        </button>

        {preview && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-0 right-0 bg-red-100 text-red-500 p-1.5 rounded-full shadow"
          >
            <Trash size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePhoto;
