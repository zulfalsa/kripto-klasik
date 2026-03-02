import React from 'react';

const InputGroup = ({ label, type = "text", value, onChange, placeholder, desc }) => (
  <div className="mb-5">
    <label className="block text-xl font-bold text-indigo-900 mb-2 uppercase tracking-wide">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 border-4 border-purple-300 focus:border-pink-500 focus:shadow-[4px_4px_0_0_#ec4899] outline-none transition-all bg-white text-lg font-bold"
    />
    {desc && <p className="mt-2 text-base text-purple-600 font-semibold">{desc}</p>}
  </div>
);

export default InputGroup;