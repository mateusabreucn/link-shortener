export default function generateCode(id: number): string {
  return encodeToBase62(scrambleId(id));
}

function encodeToBase62(id: number) {
  const alphabet =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  let n = id;
  let result: string = "";

  while (n > 0) {
    const remainder = n % 62;
    result = alphabet[remainder] + result;
    n = Math.floor(n / 62);
  }
  return result;
}

function scrambleId(id: number) {
  return id ^ 0x5f3759df;
}
