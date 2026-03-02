import { mod } from '../mathHelper';

const ROTORS = [
  { wiring: "EKMFLGDQVZNTOWYHXUSPAIBRCJ", notch: "Q" }, // Rotor I
  { wiring: "AJDKSIRUXBLHWTMCQGZNPYFVOE", notch: "E" }, // Rotor II
  { wiring: "BDFHJLCPRTXVZNYEIWGAKMUSQO", notch: "V" }  // Rotor III
];
const REFLECTOR_B = "YRUHQSLDPXNGOKMIEBFZCWVJAT";

export const enigma = (text, positionsStr) => {
  text = text.toUpperCase().replace(/[^A-Z]/g, '');
  let pos = positionsStr.toUpperCase().replace(/[^A-Z]/g, '');
  if (pos.length !== 3) pos = "AAA";
  
  let p1 = pos.charCodeAt(0) - 65; 
  let p2 = pos.charCodeAt(1) - 65; 
  let p3 = pos.charCodeAt(2) - 65; 

  const charToInt = (c) => c.charCodeAt(0) - 65;
  const intToChar = (i) => String.fromCharCode(mod(i, 26) + 65);
  
  const forward = (c, rotorIdx, offset) => {
    let r = ROTORS[rotorIdx];
    let idx = mod(c + offset, 26);
    let mapped = charToInt(r.wiring[idx]);
    return mod(mapped - offset, 26);
  };

  const backward = (c, rotorIdx, offset) => {
    let r = ROTORS[rotorIdx];
    let target = intToChar(mod(c + offset, 26));
    let idx = r.wiring.indexOf(target);
    return mod(idx - offset, 26);
  };

  let result = "";
  for (let i = 0; i < text.length; i++) {
    let step2 = false;
    let step1 = false;
    
    if (intToChar(p3) === ROTORS[2].notch) step2 = true;
    if (intToChar(p2) === ROTORS[1].notch) { step1 = true; step2 = true; } 

    p3 = mod(p3 + 1, 26);
    if (step2) p2 = mod(p2 + 1, 26);
    if (step1) p1 = mod(p1 + 1, 26);

    let c = charToInt(text[i]);
    
    c = forward(c, 2, p3);
    c = forward(c, 1, p2);
    c = forward(c, 0, p1);
    
    c = charToInt(REFLECTOR_B[c]);
    
    c = backward(c, 0, p1);
    c = backward(c, 1, p2);
    c = backward(c, 2, p3);
    
    result += intToChar(c);
  }
  return { result };
};