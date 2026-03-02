export const mod = (n, m) => ((n % m) + m) % m;

export const modInverse = (a, m) => {
  a = mod(a, m);
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  return -1;
};

export const gcd = (a, b) => {
  if (!b) return a;
  return gcd(b, a % b);
};
