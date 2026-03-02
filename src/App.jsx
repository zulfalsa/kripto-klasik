import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CalculatorPage from './pages/CalculatorPage';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [activeCipher, setActiveCipher] = useState('vigenere');

  return (
    <div className="min-h-screen text-slate-800 selection:bg-pink-300">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="transition-opacity duration-300">
        {activeTab === 'home' && <HomePage setActiveTab={setActiveTab} />}
        {activeTab === 'calc' && <CalculatorPage activeCipher={activeCipher} setActiveCipher={setActiveCipher} />}
        {activeTab === 'about' && <AboutPage />}
      </main>

      <footer className="text-center py-12 text-lg font-bold text-slate-500 uppercase tracking-widest">
        &copy; {new Date().getFullYear()} Kriptografi B • Zulfa Salsabila (21120123130057)
      </footer>
    </div>
  );
};

export default App;
