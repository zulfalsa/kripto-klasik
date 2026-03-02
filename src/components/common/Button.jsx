import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', icon: Icon, disabled = false }) => {
  const baseStyle = "flex items-center justify-center gap-3 px-6 py-3 font-bold transition-all duration-100 uppercase tracking-widest text-lg disabled:opacity-50 disabled:cursor-not-allowed";
  
  // Menggunakan palet: A8DF8E (Hijau), F0FFDF (Hijau Pucat), FFD8DF (Pink Pucat), FFAAB8 (Pink)
  const variants = {
    primary: "bg-[#FFAAB8] text-[#1a3617] border-4 border-[#ff7a93] shadow-[4px_4px_0_0_#ff7a93] hover:bg-[#FFD8DF] active:translate-y-1 active:shadow-none",
    secondary: "bg-[#A8DF8E] text-[#1a3617] border-4 border-[#86c968] shadow-[4px_4px_0_0_#86c968] hover:bg-[#F0FFDF] active:translate-y-1 active:shadow-none",
    outline: "bg-white border-4 border-[#FFAAB8] text-[#ff7a93] shadow-[4px_4px_0_0_#FFD8DF] hover:bg-[#F0FFDF] active:translate-y-1 active:shadow-none"
  };

  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {Icon && <Icon size={22} />}
      {children}
    </button>
  );
};

export default Button;