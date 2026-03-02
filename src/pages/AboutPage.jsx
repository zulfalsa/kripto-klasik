import React from 'react';
import { FileText, Cpu, Github } from 'lucide-react';

const AboutPage = () => (
  <div className="max-w-4xl mx-auto pt-36 px-4 pb-20 text-slate-800">
    <div className="bg-white border-4 border-purple-300 shadow-[8px_8px_0_0_#e9d5ff] p-8 md:p-12">
      <h2 className="text-4xl font-bold text-indigo-950 mb-10 flex items-center gap-4 uppercase tracking-wider border-b-4 border-purple-200 pb-6">
        <FileText className="text-pink-500" size={36} /> Informasi Tugas
      </h2>
      <div className="space-y-8 text-slate-700">
        
        <div className="p-8 bg-slate-50 border-4 border-slate-300 shadow-[4px_4px_0_0_#cbd5e1]">
          <h3 className="text-2xl font-bold text-indigo-900 mb-2 uppercase leading-snug">Implementasi Algoritma Kriptografi Klasik</h3>
          <p className="text-xl mb-6 font-bold text-pink-600">SEMESTER GENAP 2025/2026</p>
          <p className="mb-4 text-xl font-semibold">Program kalkulator enkripsi-dekripsi berbasis web ini mengimplementasikan:</p>
          <ul className="list-disc pl-8 space-y-3 mb-4 text-xl font-medium">
            <li>Vigenere Cipher standard (26 huruf alfabet)</li>
            <li>Affine Cipher</li>
            <li>Playfair Cipher (25/26 huruf standar, I=J)</li>
            <li>Hill Cipher (Matriks 2x2)</li>
            <li>Enigma cipher (Simulasi 3 Rotor I, II, III & Reflektor B)</li>
          </ul>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
           <div className="p-6 bg-purple-50 border-4 border-purple-300 shadow-[4px_4px_0_0_#d8b4fe]">
            <h4 className="text-2xl font-bold text-purple-900 flex items-center gap-3 mb-4 uppercase"><Cpu size={28}/> Teknologi</h4>
            <p className="text-xl font-medium">React JS, Tailwind CSS untuk styling (Pixel 8-Bit Pastel Theme), Lucide Icons.</p>
           </div>
           
           <div className="p-6 bg-pink-50 border-4 border-pink-300 shadow-[4px_4px_0_0_#fbcfe8]">
            <h4 className="text-2xl font-bold text-pink-900 flex items-center gap-3 mb-4 uppercase"><Github size={28}/> Struktur</h4>
            <p className="text-xl font-medium">Diarsiteki secara mental mengikuti struktur <span className="bg-pink-200 px-2 border-2 border-pink-400 font-bold tracking-widest uppercase">cooskie</span>.</p>
           </div>
        </div>
        
      </div>
    </div>
  </div>
);

export default AboutPage;
