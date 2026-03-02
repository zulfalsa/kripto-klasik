import React from 'react';
import { BookOpen, Cpu, Github } from 'lucide-react';

const AboutPage = () => (
  <div className="max-w-4xl mx-auto pt-36 px-4 pb-20 text-[#1a3617]">
    <div className="bg-white border-4 border-[#A8DF8E] shadow-[8px_8px_0_0_#A8DF8E] p-8 md:p-12 relative">
      <h2 className="text-4xl font-bold mb-10 flex items-center gap-4 uppercase tracking-wider border-b-4 border-[#F0FFDF] pb-6">
        <BookOpen className="text-[#FFAAB8]" size={36} /> Panduan Misi (About)
      </h2>
      <div className="space-y-8 text-[#5c8b48]">
        
        <div className="p-8 bg-[#F0FFDF] border-4 border-[#A8DF8E] shadow-[4px_4px_0_0_#A8DF8E]">
          <h3 className="text-2xl font-bold text-[#1a3617] mb-2 uppercase leading-snug">Spesifikasi Target</h3>
          <p className="text-xl mb-6 font-bold text-[#FFAAB8]">SEMESTER GENAP 2025/2026</p>
          <p className="mb-4 text-xl font-semibold">Tujuan Misi: Menganalisis dan mengimplementasikan algoritma klasik berikut:</p>
          <ul className="list-disc pl-8 space-y-3 mb-4 text-xl font-medium">
            <li>Vigenere Cipher standard (26 huruf alfabet)</li>
            <li>Affine Cipher</li>
            <li>Playfair Cipher (25/26 huruf standar, I=J)</li>
            <li>Hill Cipher (Matriks 2x2)</li>
            <li>Enigma cipher (Simulasi 3 Rotor I, II, III & Reflektor B)</li>
          </ul>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
           <div className="p-6 bg-[#FFD8DF] border-4 border-[#FFAAB8] shadow-[4px_4px_0_0_#FFAAB8]">
            <h4 className="text-2xl font-bold text-[#ff7a93] flex items-center gap-3 mb-4 uppercase"><Cpu size={28}/> Engine</h4>
            <p className="text-xl font-medium text-slate-800">React JS, Tailwind CSS untuk styling (Retro Game Theme).</p>
           </div>
           
           <div className="p-6 bg-white border-4 border-[#A8DF8E] shadow-[4px_4px_0_0_#A8DF8E]">
            <h4 className="text-2xl font-bold text-[#5c8b48] flex items-center gap-3 mb-4 uppercase">
                <Github size={28}/> Repository
            </h4>
            <p className="text-xl font-medium text-slate-800">
                Proyek didokumentasikan pada repository {' '}
                <a 
                href="https://github.com/zulfalsa/kripto-klasik"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F0FFDF] px-2 border-2 border-[#A8DF8E] font-bold hover:bg-[#A8DF8E] transition"
                >
                zulfalsa/kripto-klasik
                </a>
            </p>
            </div>
        </div>
      </div>
    </div>
  </div>
);

export default AboutPage;