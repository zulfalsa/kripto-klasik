import React, { useState, useEffect } from 'react';
import { Activity, Settings, X, Key, Lock, Unlock, Info, Eye } from 'lucide-react';
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

// Helper File Encoding: Konversi byte mentah ke karakter A-I & K-Q (Menghindari J untuk Playfair)
const fileToAlpha = (uint8Array) => {
  let res = '';
  for (let i = 0; i < uint8Array.length; i++) {
    const hex = uint8Array[i].toString(16).padStart(2, '0');
    for (let char of hex) {
      let val = parseInt(char, 16);
      res += String.fromCharCode(val < 9 ? val + 65 : val + 66);
    }
  }
  return res;
};

// Helper File Decoding: Mengembalikan karakter A-I & K-Q kembali menjadi byte
const alphaToFile = (alphaStr) => {
  let cleaned = alphaStr.replace(/[^A-IK-Q]/g, ''); // Buang padding X (dari Playfair/Hill)
  let bytes = new Uint8Array(Math.floor(cleaned.length / 2));
  for (let i = 0; i < cleaned.length; i += 2) {
    let hex = '';
    for (let j = 0; j < 2; j++) {
      let code = cleaned.charCodeAt(i + j);
      let val = code <= 73 ? code - 65 : code - 66;
      hex += val.toString(16);
    }
    bytes[i / 2] = parseInt(hex, 16);
  }
  return bytes;
};

// Fungsi Download File
const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const CalculatorPage = ({ activeCipher, setActiveCipher }) => {
  const [inputType, setInputType] = useState('text'); // 'text' | 'file'
  const [fileObj, setFileObj] = useState(null);

  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSelectingAlgorithm, setIsSelectingAlgorithm] = useState(false);
  
  // State untuk Fitur Visualisasi (Hanya relevan di mode Teks)
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisData, setAnalysisData] = useState([]);
  
  const [vigKey, setVigKey] = useState('KEY');
  const [affA, setAffA] = useState('5');
  const [affB, setAffB] = useState('8');
  const [playKey, setPlayKey] = useState('MONARCHY');
  const [hillKey, setHillKey] = useState('DDCF'); 
  const [enigmaPos, setEnigmaPos] = useState('AAA');

  useEffect(() => { setHillKey('DDCF'); }, []);

  const handleProcess = (isDecrypt) => {
    if (inputType === 'text') {
      handleTextProcess(isDecrypt);
    } else {
      handleFileProcess(isDecrypt);
    }
  };

  const handleTextProcess = (isDecrypt) => {
    setErrorMsg('');
    setResult('');
    setAnalysisData([]);
    if (!text) return;

    let resObj = {};
    let rawText = text.toUpperCase().replace(/[^A-Z]/g, '');

    switch (activeCipher) {
      case 'vigenere': resObj = { result: vigenere(text, vigKey, isDecrypt) }; break;
      case 'affine': resObj = affine(text, affA, affB, isDecrypt); break;
      case 'playfair': resObj = playfair(text, playKey, isDecrypt); break;
      case 'hill': resObj = hill(text, hillKey, isDecrypt); break;
      case 'enigma': resObj = enigma(text, enigmaPos); break;
      default: break;
    }

    if (resObj.error) {
      setErrorMsg(resObj.error);
    } else {
      setResult(resObj.result);
      
      let steps = [];
      let rText = resObj.result;
      
      if (activeCipher === 'playfair' || activeCipher === 'hill') {
        let processedInText = rawText;

        if (activeCipher === 'playfair') {
          processedInText = processedInText.replace(/J/g, "I");
          if (!isDecrypt) {
            let formatted = "";
            for (let i = 0; i < processedInText.length; i += 2) {
              formatted += processedInText[i];
              if (i + 1 < processedInText.length) {
                if (processedInText[i] === processedInText[i + 1]) {
                  formatted += "Q"; // Menggunakan karakter Q sebagai pemisah huruf ganda
                  i--; // Re-evaluasi karakter kedua
                } else {
                  formatted += processedInText[i + 1];
                }
              } else {
                formatted += "Q"; // Padding jika ganjil diubah ke Q
              }
            }
            processedInText = formatted;
          } else {
            // Abaikan sisa karakter ganjil pada mode dekripsi agar loop visualisasi tidak gagal
            if (processedInText.length % 2 !== 0) {
              processedInText = processedInText.substring(0, processedInText.length - 1);
            }
          }
        } else if (activeCipher === 'hill') {
          if (!isDecrypt && processedInText.length % 2 !== 0) {
            processedInText += 'Q'; 
          } else if (isDecrypt && processedInText.length % 2 !== 0) {
            processedInText = processedInText.substring(0, processedInText.length - 1);
          }
        }
        
        // Memaksa render log bagaimanapun hasilnya, tidak lagi menampilkan 'N/A'
        for(let i = 0; i < rText.length; i+=2) {
          steps.push({
            in: processedInText.substring(i, i+2) || "??",
            out: rText.substring(i, i+2),
            desc: `Blok ${Math.floor(i/2)+1}`
          });
        }
      } else {
        for(let i=0; i<rText.length; i++) {
           let keyChar = '';
           if(activeCipher === 'vigenere') {
               let cleanKey = vigKey.toUpperCase().replace(/[^A-Z]/g, '');
               keyChar = cleanKey.length > 0 ? ` (+${cleanKey[i % cleanKey.length]})` : '';
           }
           if (rawText[i]) {
               steps.push({
                   in: rawText[i],
                   out: rText[i],
                   desc: `Pos ${i+1}${keyChar}`
               });
           }
        }
      }
      setAnalysisData(steps);
    }
  };

  const handleFileProcess = (isDecrypt) => {
    setErrorMsg('');
    setResult('');
    setShowAnalysis(false);
    setAnalysisData([]);

    if (!fileObj) {
      setErrorMsg("Pilih file terlebih dahulu!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        let resObj = {};
        let newFileName = "output";

        if (!isDecrypt) {
          // ENCRYPT: File -> Byte -> Teks (A-Q) -> Enkripsi -> Unduh sebagai .enc
          const bytes = new Uint8Array(e.target.result);
          const alphaStr = fileToAlpha(bytes);
          
          switch (activeCipher) {
            case 'vigenere': resObj = { result: vigenere(alphaStr, vigKey, false) }; break;
            case 'affine': resObj = affine(alphaStr, affA, affB, false); break;
            case 'playfair': resObj = playfair(alphaStr, playKey, false); break;
            case 'hill': resObj = hill(alphaStr, hillKey, false); break;
            case 'enigma': resObj = enigma(alphaStr, enigmaPos); break;
          }

          if (resObj.error) {
            setErrorMsg(resObj.error);
            return;
          }

          newFileName = `${fileObj.name}.enc`;
          const blob = new Blob([resObj.result], { type: 'text/plain' });
          downloadBlob(blob, newFileName);
          setResult(`[SUKSES] File dienkripsi!\nNama Asli: ${fileObj.name}\nDisimpan Sebagai: ${newFileName}\nUkuran Output: ${blob.size} bytes`);
        } else {
          // DECRYPT: Teks .enc -> Dekripsi -> Teks (A-Q) -> Byte -> Unduh file asli
          const textData = e.target.result; 
          
          switch (activeCipher) {
            case 'vigenere': resObj = { result: vigenere(textData, vigKey, true) }; break;
            case 'affine': resObj = affine(textData, affA, affB, true); break;
            case 'playfair': resObj = playfair(textData, playKey, true); break;
            case 'hill': resObj = hill(textData, hillKey, true); break;
            case 'enigma': resObj = enigma(textData, enigmaPos); break; // Enigma simetris
          }

          if (resObj.error) {
            setErrorMsg(resObj.error);
            return;
          }

          const bytes = alphaToFile(resObj.result);
          newFileName = fileObj.name.endsWith('.enc') ? fileObj.name.slice(0, -4) : `dec_${fileObj.name}`;
          
          const blob = new Blob([bytes], { type: 'application/octet-stream' });
          downloadBlob(blob, newFileName);
          setResult(`[SUKSES] File didekripsi!\nDisimpan Sebagai: ${newFileName}\nUkuran Output: ${blob.size} bytes`);
        }
      } catch (err) {
        setErrorMsg("Kesalahan memproses file: " + err.message);
      }
    };

    if (isDecrypt) {
      reader.readAsText(fileObj); // Jika dekripsi, baca isi string dari file .enc
    } else {
      reader.readAsArrayBuffer(fileObj); // Jika enkripsi, baca byte mentah dari file asli
    }
  };

  return (
    <div className="max-w-5xl mx-auto pt-36 px-4 pb-20 text-[#1a3617]">
      <div className="bg-white border-4 border-[#A8DF8E] shadow-[8px_8px_0_0_#A8DF8E] flex flex-col relative z-10">
        
        <div className="p-6 md:p-8 bg-[#F0FFDF] border-b-4 border-[#A8DF8E] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
           <h2 className="text-3xl font-bold text-[#1a3617] flex items-center gap-4 uppercase tracking-wider">
             <Activity className="text-[#A8DF8E]" size={36} fill="#A8DF8E" />
             {ciphers.find(c => c.id === activeCipher)?.name}
           </h2>
           
           {!isSelectingAlgorithm ? (
             <button
               onClick={() => setIsSelectingAlgorithm(true)}
               className="flex items-center justify-center gap-3 px-6 py-3 bg-white border-4 border-[#A8DF8E] font-bold text-[#5c8b48] text-lg hover:bg-[#F0FFDF] transition-all shadow-[4px_4px_0_0_#A8DF8E] active:translate-y-1 active:shadow-none uppercase tracking-widest"
             >
               <Settings size={22} /> Ganti Module
             </button>
           ) : (
             <button
               onClick={() => setIsSelectingAlgorithm(false)}
               className="flex items-center justify-center gap-3 px-6 py-3 bg-[#FFD8DF] border-4 border-[#FFAAB8] font-bold text-[#ff7a93] text-lg hover:bg-[#FFAAB8] hover:text-white transition-all shadow-[4px_4px_0_0_#FFAAB8] active:translate-y-1 active:shadow-none uppercase tracking-widest"
             >
               <X size={22} /> Batal
             </button>
           )}
        </div>

        {isSelectingAlgorithm ? (
          <div className="p-6 md:p-10 bg-white grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2 mb-4">
              <h3 className="text-3xl font-bold text-[#1a3617] uppercase">Pilih Module Sandi</h3>
            </div>
            
            {ciphers.map(c => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveCipher(c.id);
                  setIsSelectingAlgorithm(false); 
                  setText(''); 
                  setResult('');
                  setShowAnalysis(false);
                  setFileObj(null);
                }}
                className={`text-left p-6 border-4 transition-all flex flex-col gap-3 shadow-[4px_4px_0_0_#A8DF8E] active:translate-y-1 active:shadow-none ${
                  activeCipher === c.id
                  ? 'bg-[#A8DF8E] border-[#5c8b48] text-[#1a3617]'
                  : 'bg-white border-[#A8DF8E] text-[#5c8b48] hover:border-[#FFAAB8] hover:bg-[#F0FFDF]'
                }`}
              >
                <span className="text-2xl font-bold uppercase tracking-wide">{c.name}</span>
                <span className="text-lg opacity-80 leading-snug font-medium text-slate-700">{c.desc}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="p-6 md:p-10 flex-1">
            
            <div className="mb-10 p-8 bg-white border-4 border-[#A8DF8E] shadow-[4px_4px_0_0_#F0FFDF] relative">
              <div className="absolute top-0 right-0 bg-[#A8DF8E] text-[#1a3617] font-bold px-3 py-1 text-sm border-b-4 border-l-4 border-[#5c8b48] uppercase">
                 Setup
              </div>
              <h4 className="text-2xl font-bold text-[#1a3617] mb-6 flex items-center gap-3 uppercase tracking-wider mt-2">
                <Key size={28} className="text-[#FFAAB8]" /> Konfigurasi Kunci
              </h4>
              
              {activeCipher === 'vigenere' && (
                <InputGroup label="Kata Kunci (Teks)" value={vigKey} onChange={(e) => setVigKey(e.target.value)} />
              )}
              {activeCipher === 'affine' && (
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-full sm:w-1/2"><InputGroup label="Pengali (A)" type="number" value={affA} onChange={(e) => setAffA(e.target.value)} /></div>
                  <div className="w-full sm:w-1/2"><InputGroup label="Pergeseran (B)" type="number" value={affB} onChange={(e) => setAffB(e.target.value)} /></div>
                </div>
              )}
              {activeCipher === 'playfair' && (
                <InputGroup label="Kata Kunci Matriks (Teks)" value={playKey} onChange={(e) => setPlayKey(e.target.value)} />
              )}
              {activeCipher === 'hill' && (
                <InputGroup label="Kunci Matriks 2x2 (4 Huruf)" value={hillKey} onChange={(e) => setHillKey(e.target.value.substring(0,4))} />
              )}
              {activeCipher === 'enigma' && (
                <InputGroup label="Posisi Awal Rotor I, II, III" value={enigmaPos} onChange={(e) => setEnigmaPos(e.target.value.substring(0,3))} />
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="flex flex-col gap-4">
                <label className="text-xl font-bold text-[#1a3617] uppercase tracking-widest flex items-center justify-between">
                  <span>Input Data</span>
                </label>

                {/* Toggle Input Teks / File */}
                <div className="flex gap-4">
                  <button 
                    onClick={() => setInputType('text')} 
                    className={`flex-1 py-3 text-lg font-bold uppercase border-4 border-[#A8DF8E] transition-all shadow-[4px_4px_0_0_#A8DF8E] active:translate-y-1 active:shadow-none ${inputType === 'text' ? 'bg-[#A8DF8E] text-[#1a3617]' : 'bg-white text-[#5c8b48]'}`}
                  >
                    Teks
                  </button>
                  <button 
                    onClick={() => setInputType('file')} 
                    className={`flex-1 py-3 text-lg font-bold uppercase border-4 border-[#A8DF8E] transition-all shadow-[4px_4px_0_0_#A8DF8E] active:translate-y-1 active:shadow-none ${inputType === 'file' ? 'bg-[#A8DF8E] text-[#1a3617]' : 'bg-white text-[#5c8b48]'}`}
                  >
                    File/Gambar
                  </button>
                </div>

                {inputType === 'text' ? (
                  <textarea 
                    className="w-full h-48 p-5 border-4 border-[#A8DF8E] focus:border-[#FFAAB8] focus:shadow-[4px_4px_0_0_#FFD8DF] outline-none resize-none transition-all bg-white text-xl font-semibold uppercase text-[#1a3617]"
                    placeholder="MASUKKAN TEKS..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  ></textarea>
                ) : (
                  <div className="w-full h-48 p-5 border-4 border-[#A8DF8E] focus-within:border-[#FFAAB8] focus-within:shadow-[4px_4px_0_0_#FFD8DF] bg-white flex flex-col items-center justify-center relative overflow-hidden transition-all group">
                    <input 
                      type="file" 
                      onChange={(e) => { setFileObj(e.target.files[0]); setResult(''); setErrorMsg(''); }} 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                    />
                    {fileObj ? (
                      <div className="text-center z-0">
                         <div className="text-5xl mb-2">📄</div>
                         <p className="font-bold text-[#1a3617] truncate max-w-[250px]">{fileObj.name}</p>
                         <p className="text-sm text-[#5c8b48] mt-1">{(fileObj.size / 1024).toFixed(2)} KB</p>
                      </div>
                    ) : (
                      <div className="text-center z-0 text-[#5c8b48] group-hover:scale-105 transition-transform">
                         <div className="text-5xl mb-3">📁</div>
                         <p className="font-bold uppercase tracking-wider text-[#1a3617]">Pilih File / Gambar</p>
                         <p className="text-sm mt-1">(.enc untuk dekripsi)</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <Button onClick={() => handleProcess(false)} className="flex-1" icon={Lock}>Enkripsi</Button>
                  {/* Tombol Dekripsi selalu dimunculkan (termasuk untuk Enigma) */}
                  <Button onClick={() => handleProcess(true)} variant="secondary" className="flex-1" icon={Unlock}>Dekripsi</Button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-xl font-bold text-[#1a3617] uppercase tracking-widest flex justify-between items-center h-[52px]">
                  <span>Hasil Output</span>
                  {result && !errorMsg && inputType === 'text' && (
                     <button onClick={() => setShowAnalysis(!showAnalysis)} className="flex items-center gap-2 text-sm bg-[#FFAAB8] text-white px-3 py-2 border-4 border-[#ff7a93] active:translate-y-1 shadow-[4px_4px_0_0_#ff7a93]">
                       <Eye size={18}/> {showAnalysis ? "Tutup Log" : "Lihat Log"}
                     </button>
                  )}
                </label>
                
                {/* Bagian Menampilkan Analisis Visual */}
                {showAnalysis && !errorMsg && analysisData.length > 0 && inputType === 'text' ? (
                  <div className="w-full h-48 p-4 border-4 border-[#FFAAB8] bg-[#FFD8DF] overflow-y-auto font-bold uppercase">
                     <p className="text-center text-[#ff7a93] mb-4 border-b-4 border-[#FFAAB8] pb-2 text-lg">Log Transformasi Karakter</p>
                     <div className="grid grid-cols-2 gap-2 text-center text-lg">
                        <div className="text-[#1a3617] mb-1 border-b-2 border-black/10">Input</div>
                        <div className="text-[#1a3617] mb-1 border-b-2 border-black/10">Output</div>
                        {analysisData.map((step, idx) => (
                           <React.Fragment key={idx}>
                             <div className="bg-white border-4 border-[#A8DF8E] p-2 flex items-center justify-center gap-2 text-[#1a3617]">
                               {step.in} <span className="text-xs text-[#5c8b48]">({step.desc})</span>
                             </div>
                             <div className="bg-white border-4 border-[#FFAAB8] p-2 flex items-center justify-center text-[#ff7a93]">
                               {step.out}
                             </div>
                           </React.Fragment>
                        ))}
                     </div>
                  </div>
                ) : (
                  <textarea 
                    className="w-full h-48 p-5 border-4 border-[#5c8b48] bg-[#F0FFDF] outline-none resize-none text-xl md:text-2xl font-bold text-[#1a3617] shadow-inner uppercase"
                    readOnly
                    placeholder="HASIL AKAN MUNCUL DI SINI..."
                    value={result}
                  ></textarea>
                )}
                
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