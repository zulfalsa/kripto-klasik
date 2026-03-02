import { mod, modInverse, gcd } from '../mathHelper';

export const hill = (text, keyString, decrypt = false) => {
  keyString = keyString.toUpperCase().replace(/[^A-Z]/g, '');
  if (keyString.length !== 4) return { error: "Kunci harus 4 huruf (Matriks 2x2)." };
  
  let key = [
    [keyString.charCodeAt(0) - 65, keyString.charCodeAt(1) - 65],
    [keyString.charCodeAt(2) - 65, keyString.charCodeAt(3) - 65]
  ];

  let det = mod(key[0][0] * key[1][1] - key[0][1] * key[1][0], 26);
  if (gcd(det, 26) !== 1) return { error: "Kunci tak valid: Determinan tak koprima dg 26." };

  let invDet = modInverse(det, 26);
  if (invDet === -1) return { error: "Kunci tak valid: Matriks tak punya invers modulo 26." };

  let invKey = [
    [mod(key[1][1] * invDet, 26), mod(-key[0][1] * invDet, 26)],
    [mod(-key[1][0] * invDet, 26), mod(key[0][0] * invDet, 26)]
  ];

  let matrix = decrypt ? invKey : key;

  text = text.toUpperCase().replace(/[^A-Z]/g, '');
  if (text.length % 2 !== 0) text += "X";

  let result = "";
  for (let i = 0; i < text.length; i += 2) {
    let v1 = text.charCodeAt(i) - 65;
    let v2 = text.charCodeAt(i + 1) - 65;
    
    let c1 = mod(matrix[0][0] * v1 + matrix[0][1] * v2, 26);
    let c2 = mod(matrix[1][0] * v1 + matrix[1][1] * v2, 26);
    
    result += String.fromCharCode(c1 + 65) + String.fromCharCode(c2 + 65);
  }
  return { result };
};