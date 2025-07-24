import React from 'react';

const Input = ({ type, label, placeholder, value, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <div className='relative w-full'>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="md:w-[400px] w-[230px] lg:w-[400px] xl1:w-[450px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 ml:w-[300px] text-black"
        />
      </div>
    </div>
  );
};

export default Input;
