import { mod } from '../mathHelper';

export const vigenere = (text, key, decrypt = false) => {
  if (!key) return text;
  text = text.toUpperCase().replace(/[^A-Z]/g, '');
  key = key.toUpperCase().replace(/[^A-Z]/g, '');
  if (key.length === 0) return text;

  let result = "";
  let j = 0;
  for (let i = 0; i < text.length; i++) {
    let c = text.charCodeAt(i) - 65;
    let k = key.charCodeAt(j % key.length) - 65;
    if (decrypt) {
      result += String.fromCharCode(mod(c - k, 26) + 65);
    } else {
      result += String.fromCharCode(mod(c + k, 26) + 65);
    }
    j++;
  }
  return result;
};
