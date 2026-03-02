import React, { useState, useEffect } from 'react';
import { Activity, Settings, X, Key, Lock, Unlock, Info } from 'lucide-react';
import Button from '../components/common/Button';
import InputGroup from '../components/common/InputGroup';

import { vigenere } from '../utils/crypto/vigenere';
import { affine } from '../utils/crypto/affine';
import { playfair } from '../utils/crypto/playfair';
import { hill } from '../utils/crypto/hill';
import { enigma } from '../utils/crypto/enigma';

const ciphers = [
  { id: 'vigenere', name: 'Vigenere Cipher', desc: 'Substitusi dengan kata kunci berulang.' },
  { id: 'affine', name: 'Affine Cipher', desc: 'Substitusi matematis E(x) = (ax + b) mod 26.' },
  { id: 'playfair', name: 'Playfair Cipher', desc: 'Enkripsi digram menggunakan matriks 5x5.' },
  { id: 'hill', name: 'Hill Cipher', desc: 'Enkripsi matriks linear 2x2.' },
  { id: 'enigma', name: 'Mesin Enigma', desc: 'Simulasi rotor mekanik Perang Dunia II.' },
];

const CalculatorPage = ({ activeCipher, setActiveCipher }) => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSelectingAlgorithm, setIsSelectingAlgorithm] = useState(false);
  
  const [vigKey, setVigKey] = useState('KEY');
  const [affA, setAffA] = useState('5');
  const [affB, setAffB] = useState('8');
  const [playKey, setPlayKey] = useState('MONARCHY');
  const [hillKey, setHillKey] = useState('DDCF'); 
  const [enigmaPos, setEnigmaPos] = useState('AAA');

  useEffect(() => { setHillKey('DDCF'); }, []);

  const handleProcess = (isDecrypt) => {
    setErrorMsg('');
    setResult('');
    if (!text) return;

    let resObj = {};
    switch (activeCipher) {
      case 'vigenere':
        resObj = { result: vigenere(text, vigKey, isDecrypt) };
        break;
      case 'affine':
        resObj = affine(text, affA, affB, isDecrypt);
        break;
      case 'playfair':
        resObj = playfair(text, playKey, isDecrypt);
        break;
      case 'hill':
        resObj = hill(text, hillKey, isDecrypt);
        break;
      case 'enigma':
        resObj = enigma(text, enigmaPos);
        break;
      default:
        break;
    }

    if (resObj.error) {
      setErrorMsg(resObj.error);
    } else {
      setResult(resObj.result);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pt-36 px-4 pb-20 text-slate-800">
      <div className="bg-white border-4 border-purple-300 shadow-[8px_8px_0_0_#e9d5ff] flex flex-col relative z-10">
        
        <div className="p-6 md:p-8 bg-purple-50 border-b-4 border-purple-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
           <h2 className="text-3xl font-bold text-indigo-950 flex items-center gap-4 uppercase tracking-wider">
             <Activity className="text-purple-600" size={36} />
             {ciphers.find(c => c.id === activeCipher)?.name}
           </h2>
           
           {!isSelectingAlgorithm ? (
             <button
               onClick={() => setIsSelectingAlgorithm(true)}
               className="flex items-center justify-center gap-3 px-6 py-3 bg-white border-4 border-purple-500 font-bold text-purple-700 text-lg hover:bg-purple-100 transition-all shadow-[4px_4px_0_0_#c084fc] active:translate-y-1 active:shadow-none uppercase tracking-widest"
             >
               <Settings size={22} /> Pilih Algoritma
             </button>
           ) : (
             <button
               onClick={() => setIsSelectingAlgorithm(false)}
               className="flex items-center justify-center gap-3 px-6 py-3 bg-pink-100 border-4 border-pink-500 font-bold text-pink-700 text-lg hover:bg-pink-200 transition-all shadow-[4px_4px_0_0_#f472b6] active:translate-y-1 active:shadow-none uppercase tracking-widest"
             >
               <X size={22} /> Batal Ganti
             </button>
           )}
        </div>

        {isSelectingAlgorithm ? (
          <div className="p-6 md:p-10 bg-white grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2 mb-4">
              <h3 className="text-3xl font-bold text-indigo-900 uppercase">Daftar Algoritma</h3>
              <p className="text-xl text-slate-500 font-semibold mt-2">Pilih salah satu algoritma di bawah ini untuk mengganti fungsi kalkulator:</p>
            </div>
            
            {ciphers.map(c => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveCipher(c.id);
                  setIsSelectingAlgorithm(false); 
                  setText(''); 
                  setResult('');
                }}
                className={`text-left p-6 border-4 transition-all flex flex-col gap-3 shadow-[4px_4px_0_0_#cbd5e1] active:translate-y-1 active:shadow-none ${
                  activeCipher === c.id
                  ? 'bg-purple-100 border-purple-500 text-purple-900 shadow-[4px_4px_0_0_#a855f7]'
                  : 'bg-white border-slate-300 text-slate-700 hover:border-pink-400 hover:bg-pink-50 hover:shadow-[4px_4px_0_0_#f472b6]'
                }`}
              >
                <span className="text-2xl font-bold uppercase tracking-wide">{c.name}</span>
                <span className="text-lg opacity-80 leading-snug font-medium">{c.desc}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="p-6 md:p-10 flex-1">
            
            <div className="mb-10 p-8 bg-slate-50 border-4 border-slate-300 shadow-[4px_4px_0_0_#e2e8f0]">
              <h4 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center gap-3 uppercase tracking-wider">
                <Key size={28} className="text-purple-600" /> Konfigurasi Kunci
              </h4>
              
              {activeCipher === 'vigenere' && (
                <InputGroup 
                  label="Kata Kunci (Teks)" 
                  value={vigKey} onChange={(e) => setVigKey(e.target.value)}
                  desc="Kunci akan diulang menyesuaikan panjang teks. Hanya huruf alfabet yang diproses."
                />
              )}
              
              {activeCipher === 'affine' && (
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-full sm:w-1/2">
                    <InputGroup label="Pengali (A)" type="number" value={affA} onChange={(e) => setAffA(e.target.value)} desc="Harus koprima dg 26" />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <InputGroup label="Pergeseran (B)" type="number" value={affB} onChange={(e) => setAffB(e.target.value)} />
                  </div>
                </div>
              )}

              {activeCipher === 'playfair' && (
                <InputGroup 
                  label="Kata Kunci Matriks (Teks)" 
                  value={playKey} onChange={(e) => setPlayKey(e.target.value)}
                  desc="Akan menghasilkan matriks 5x5 (huruf J digabung ke I)."
                />
              )}

              {activeCipher === 'hill' && (
                <InputGroup 
                  label="Kunci Matriks 2x2 (4 Huruf)" 
                  value={hillKey} onChange={(e) => setHillKey(e.target.value.substring(0,4))}
                  desc="Contoh valid: DDCF. Membutuhkan determinan matriks yang memiliki invers modulo 26."
                />
              )}

              {activeCipher === 'enigma' && (
                <InputGroup 
                  label="Posisi Awal Rotor I, II, III (3 Huruf)" 
                  value={enigmaPos} onChange={(e) => setEnigmaPos(e.target.value.substring(0,3))}
                  desc="Default: AAA. Rotor akan berputar otomatis setiap karakter."
                />
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="flex flex-col gap-4">
                <label className="text-xl font-bold text-indigo-900 uppercase tracking-widest">Input Pesan</label>
                <textarea 
                  className="w-full h-56 p-5 border-4 border-purple-300 focus:border-pink-500 focus:shadow-[4px_4px_0_0_#ec4899] outline-none resize-none transition-all bg-white text-xl font-semibold uppercase"
                  placeholder="KETIK PESAN DI SINI..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <Button onClick={() => handleProcess(false)} className="flex-1" icon={Lock}>Enkripsi</Button>
                  {activeCipher !== 'enigma' && (
                    <Button onClick={() => handleProcess(true)} variant="secondary" className="flex-1" icon={Unlock}>Dekripsi</Button>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-xl font-bold text-indigo-900 uppercase tracking-widest">Hasil Output</label>
                <textarea 
                  className="w-full h-56 p-5 border-4 border-slate-400 bg-slate-200 outline-none resize-none text-2xl font-bold text-indigo-950 shadow-inner uppercase"
                  readOnly
                  placeholder="HASIL AKAN MUNCUL DI SINI..."
                  value={result}
                ></textarea>
                
                {errorMsg && (
                  <div className="mt-2 p-4 bg-red-100 text-red-700 text-lg font-bold border-4 border-red-400 flex items-start gap-3 shadow-[4px_4px_0_0_#f87171]">
                    <Info size={28} className="mt-0.5 shrink-0" /> {errorMsg}
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default CalculatorPage;