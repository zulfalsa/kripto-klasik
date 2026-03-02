import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white border-b-4 border-purple-300 z-50 shadow-[0_4px_0_0_#f3e8ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="w-12 h-12 bg-purple-500 border-4 border-purple-800 shadow-[2px_2px_0_0_#4c1d95] flex items-center justify-center text-white font-bold text-2xl pb-1">
              K
            </div>
            <span className="font-bold text-3xl text-purple-700 tracking-wider uppercase mt-1">
              KriptoKlasik
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <button onClick={() => handleNavClick('home')} className={`text-xl font-bold transition-all uppercase px-4 py-2 border-4 ${activeTab === 'home' ? 'bg-pink-100 border-pink-400 text-pink-600 shadow-[4px_4px_0_0_#f472b6]' : 'border-transparent text-slate-500 hover:text-purple-600 hover:border-purple-200 hover:bg-purple-50'}`}>Beranda</button>
            <button onClick={() => handleNavClick('calc')} className={`text-xl font-bold transition-all uppercase px-4 py-2 border-4 ${activeTab === 'calc' ? 'bg-pink-100 border-pink-400 text-pink-600 shadow-[4px_4px_0_0_#f472b6]' : 'border-transparent text-slate-500 hover:text-purple-600 hover:border-purple-200 hover:bg-purple-50'}`}>Kalkulator</button>
            <button onClick={() => handleNavClick('about')} className={`text-xl font-bold transition-all uppercase px-4 py-2 border-4 ${activeTab === 'about' ? 'bg-pink-100 border-pink-400 text-pink-600 shadow-[4px_4px_0_0_#f472b6]' : 'border-transparent text-slate-500 hover:text-purple-600 hover:border-purple-200 hover:bg-purple-50'}`}>Tentang</button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-purple-700 border-4 border-purple-400 p-2 shadow-[2px_2px_0_0_#c084fc] active:translate-y-1 active:shadow-none focus:outline-none bg-white">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`md:hidden absolute w-full bg-white border-b-4 border-purple-300 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-screen shadow-xl' : 'max-h-0'}`}>
        <div className="px-4 pt-4 pb-6 space-y-3 flex flex-col">
          <button onClick={() => handleNavClick('home')} className={`text-left px-5 py-4 border-4 font-bold uppercase text-xl ${activeTab === 'home' ? 'bg-pink-100 border-pink-400 text-pink-600' : 'border-slate-200 text-slate-600'}`}>Beranda</button>
          <button onClick={() => handleNavClick('calc')} className={`text-left px-5 py-4 border-4 font-bold uppercase text-xl ${activeTab === 'calc' ? 'bg-pink-100 border-pink-400 text-pink-600' : 'border-slate-200 text-slate-600'}`}>Kalkulator</button>
          <button onClick={() => handleNavClick('about')} className={`text-left px-5 py-4 border-4 font-bold uppercase text-xl ${activeTab === 'about' ? 'bg-pink-100 border-pink-400 text-pink-600' : 'border-slate-200 text-slate-600'}`}>Tentang</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;