import React from 'react';
import { ShieldAlert, Play, BookOpen } from 'lucide-react';
import Button from '../components/common/Button';

const HomePage = ({ setActiveTab }) => (
  <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-24 text-[#1a3617]">
    
    <div className="bg-white border-4 border-[#FFAAB8] p-8 md:p-16 shadow-[12px_12px_0_0_#FFAAB8] max-w-4xl relative">
      
      {/* Ornamen Sudut Gamified */}
      <div className="absolute top-0 left-0 w-4 h-4 bg-[#FFAAB8] -translate-x-4 -translate-y-4"></div>
      <div className="absolute top-0 right-0 w-4 h-4 bg-[#FFAAB8] translate-x-4 -translate-y-4"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 bg-[#FFAAB8] -translate-x-4 translate-y-4"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#FFAAB8] translate-x-4 translate-y-4"></div>

      <div className="inline-flex items-center gap-3 px-6 py-3 border-4 border-[#A8DF8E] bg-[#F0FFDF] text-[#5c8b48] font-bold uppercase mb-8 shadow-[4px_4px_0_0_#A8DF8E] text-xl">
        <ShieldAlert size={24} /> Level 1: Pengantar Kriptografi
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight uppercase tracking-wider">
        Pecahkan <br />
        <span className="text-white bg-[#FFAAB8] px-4 py-2 border-4 border-[#ff7a93] inline-block mt-4 rotate-2 shadow-[4px_4px_0_0_#ff7a93]">
          Sandi Rahasia
        </span>
      </h1>
      
      <p className="text-2xl text-[#5c8b48] mb-12 font-semibold">
        Sistem enkripsi interaktif bergaya game retro. Dilengkapi visualisasi proses untuk mempelajari algoritma klasik.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8">
        <Button onClick={() => setActiveTab('calc')} icon={Play}>
          Mulai Misi
        </Button>
        <Button variant="secondary" onClick={() => setActiveTab('about')} icon={BookOpen}>
          Baca Panduan
        </Button>
      </div>
    </div>
  </div>
);

export default HomePage;