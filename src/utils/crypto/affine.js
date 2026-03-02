import { mod, modInverse, gcd } from '../mathHelper';

export const affine = (text, a, b, decrypt = false) => {
  text = text.toUpperCase().replace(/[^A-Z]/g, '');
  a = parseInt(a);
  b = parseInt(b);
  
  if (isNaN(a) || isNaN(b)) return { error: "Nilai A dan B harus berupa angka." };
  if (gcd(a, 26) !== 1) return { error: "Nilai A harus koprima dengan 26." };

  let a_inv = modInverse(a, 26);
  if (a_inv === -1) return { error: "Nilai A tidak memiliki invers modulo 26." };

  let result = "";
  for (let i = 0; i < text.length; i++) {
    let p = text.charCodeAt(i) - 65;
    if (decrypt) {
      result += String.fromCharCode(mod(a_inv * (p - b), 26) + 65);
    } else {
      result += String.fromCharCode(mod(a * p + b, 26) + 65);
    }
  }
  return { result };
};
