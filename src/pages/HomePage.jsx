import React from 'react';
import { Shield, ArrowRight, FileText } from 'lucide-react';
import Button from '../components/common/Button';

const HomePage = ({ setActiveTab }) => (
  <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-24 text-slate-800">
    <div className="inline-flex items-center gap-3 px-6 py-3 border-4 border-purple-400 bg-purple-100 text-purple-700 font-bold uppercase mb-10 shadow-[4px_4px_0_0_#c084fc] text-xl">
      <Shield size={24} /> Proyek Kriptografi Klasik
    </div>
    
    <h1 className="text-5xl md:text-7xl font-bold text-indigo-950 mb-8 leading-tight uppercase tracking-wider drop-shadow-sm">
      Keamanan di Era <br />
      <span className="text-pink-500 underline decoration-pink-300 decoration-8 underline-offset-8">
        Klasik & Modern
      </span>
    </h1>
    
    <p className="text-2xl text-slate-600 max-w-3xl mb-12 font-semibold">
      Implementasi antarmuka kalkulator web interaktif untuk Vigenere, Affine, Playfair, Hill, dan Mesin Enigma. Desain bergaya 8-bit PIKSEL yang fungsional.
    </p>
    
    <div className="flex flex-col sm:flex-row gap-6">
      <Button onClick={() => setActiveTab('calc')} icon={ArrowRight}>
        Mulai Enkripsi
      </Button>
      <Button variant="secondary" onClick={() => setActiveTab('about')} icon={FileText}>
        Lihat Laporan
      </Button>
    </div>
  </div>
);

export default HomePage;