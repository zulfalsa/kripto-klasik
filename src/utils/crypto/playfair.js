import { mod } from '../mathHelper';

const generatePlayfairGrid = (key) => {
  let alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"; // Tanpa J
  let k = key.toUpperCase().replace(/[^A-Z]/g, "").replace(/J/g, "I");
  let grid = [];
  let used = new Set();
  
  for (let char of k) {
    if (!used.has(char)) { grid.push(char); used.add(char); }
  }
  for (let char of alphabet) {
    if (!used.has(char)) { grid.push(char); used.add(char); }
  }
  return grid;
};

export const playfair = (text, key, decrypt = false) => {
  if (!key) return { error: "Kunci tidak boleh kosong." };
  let grid = generatePlayfairGrid(key);
  
  text = text.toUpperCase().replace(/[^A-Z]/g, "").replace(/J/g, "I");
  if (!decrypt) {
    let formatted = "";
    for (let i = 0; i < text.length; i += 2) {
      formatted += text[i];
      if (i + 1 < text.length) {
        if (text[i] === text[i + 1]) {
          formatted += "Q";
          i--;
        } else {
          formatted += text[i + 1];
        }
      } else {
        formatted += "Q";
      }
    }
    text = formatted;
  }

  const getPos = (char) => {
    let index = grid.indexOf(char);
    return { r: Math.floor(index / 5), c: index % 5 };
  };

  let result = "";
  for (let i = 0; i < text.length; i += 2) {
    let p1 = getPos(text[i]);
    let p2 = getPos(text[i + 1]);

    if (p1.r === p2.r) {
      let dir = decrypt ? -1 : 1;
      result += grid[p1.r * 5 + mod(p1.c + dir, 5)];
      result += grid[p2.r * 5 + mod(p2.c + dir, 5)];
    } else if (p1.c === p2.c) {
      let dir = decrypt ? -1 : 1;
      result += grid[mod(p1.r + dir, 5) * 5 + p1.c];
      result += grid[mod(p2.r + dir, 5) * 5 + p2.c];
    } else {
      result += grid[p1.r * 5 + p2.c];
      result += grid[p2.r * 5 + p1.c];
    }
  }
  return { result };
};
