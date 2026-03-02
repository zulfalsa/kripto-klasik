import React, { useState } from 'react';
import { Menu, X, Gamepad2 } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white border-b-4 border-[#A8DF8E] z-50 shadow-[0_4px_0_0_#F0FFDF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="w-12 h-12 bg-[#FFAAB8] border-4 border-[#ff7a93] shadow-[2px_2px_0_0_#ff7a93] flex items-center justify-center text-white font-bold pb-1">
              <Gamepad2 size={28} />
            </div>
            <span className="font-bold text-3xl text-[#1a3617] tracking-wider uppercase mt-1">
              KriptoQuest
            </span>
          </div>
          
          <div className="hidden md:flex space-x-6 items-center">
            <button onClick={() => handleNavClick('home')} className={`text-xl font-bold transition-all uppercase px-4 py-2 border-4 ${activeTab === 'home' ? 'bg-[#FFD8DF] border-[#FFAAB8] text-[#ff7a93] shadow-[4px_4px_0_0_#FFAAB8]' : 'border-transparent text-[#5c8b48] hover:text-[#1a3617] hover:border-[#A8DF8E] hover:bg-[#F0FFDF]'}`}>Mainkan</button>
            <button onClick={() => handleNavClick('calc')} className={`text-xl font-bold transition-all uppercase px-4 py-2 border-4 ${activeTab === 'calc' ? 'bg-[#FFD8DF] border-[#FFAAB8] text-[#ff7a93] shadow-[4px_4px_0_0_#FFAAB8]' : 'border-transparent text-[#5c8b48] hover:text-[#1a3617] hover:border-[#A8DF8E] hover:bg-[#F0FFDF]'}`}>Kalkulator</button>
            <button onClick={() => handleNavClick('about')} className={`text-xl font-bold transition-all uppercase px-4 py-2 border-4 ${activeTab === 'about' ? 'bg-[#FFD8DF] border-[#FFAAB8] text-[#ff7a93] shadow-[4px_4px_0_0_#FFAAB8]' : 'border-transparent text-[#5c8b48] hover:text-[#1a3617] hover:border-[#A8DF8E] hover:bg-[#F0FFDF]'}`}>Tentang</button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#1a3617] border-4 border-[#A8DF8E] p-2 shadow-[2px_2px_0_0_#A8DF8E] active:translate-y-1 active:shadow-none focus:outline-none bg-white">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden absolute w-full bg-white border-b-4 border-[#A8DF8E] transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-screen shadow-xl' : 'max-h-0'}`}>
        <div className="px-4 pt-4 pb-6 space-y-3 flex flex-col">
          <button onClick={() => handleNavClick('home')} className={`text-left px-5 py-4 border-4 font-bold uppercase text-xl ${activeTab === 'home' ? 'bg-[#FFD8DF] border-[#FFAAB8] text-[#ff7a93]' : 'border-[#F0FFDF] text-[#5c8b48]'}`}>Start Menu</button>
          <button onClick={() => handleNavClick('calc')} className={`text-left px-5 py-4 border-4 font-bold uppercase text-xl ${activeTab === 'calc' ? 'bg-[#FFD8DF] border-[#FFAAB8] text-[#ff7a93]' : 'border-[#F0FFDF] text-[#5c8b48]'}`}>Laboratorium</button>
          <button onClick={() => handleNavClick('about')} className={`text-left px-5 py-4 border-4 font-bold uppercase text-xl ${activeTab === 'about' ? 'bg-[#FFD8DF] border-[#FFAAB8] text-[#ff7a93]' : 'border-[#F0FFDF] text-[#5c8b48]'}`}>Manual</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;