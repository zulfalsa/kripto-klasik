import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', icon: Icon }) => {
  const baseStyle = "flex items-center justify-center gap-3 px-6 py-3 font-bold transition-all duration-100 active:translate-y-1 active:shadow-none uppercase tracking-widest text-lg";
  const variants = {
    primary: "bg-purple-500 text-white border-4 border-purple-800 shadow-[4px_4px_0_0_#4c1d95] hover:bg-purple-400",
    secondary: "bg-white text-indigo-900 border-4 border-purple-400 shadow-[4px_4px_0_0_#a855f7] hover:bg-purple-50",
    outline: "bg-transparent border-4 border-pink-400 text-pink-600 shadow-[4px_4px_0_0_#f472b6] hover:bg-pink-50"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {Icon && <Icon size={22} />}
      {children}
    </button>
  );
};

export default Button;