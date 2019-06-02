const randomString = (len: number = 4, bits: number = 16) => {
  bits = bits || 36;
  let outStr: string = "";
  let newStr: string;
  while (outStr.length < len) {
    newStr = Math.random()
      .toString(bits)
      .slice(2);
    outStr += newStr.slice(0, Math.min(newStr.length, len - outStr.length));
  }
  return outStr.toUpperCase();
};

export default function generateKey() {
  return (
    "AMP-" +
    randomString(4, 16) +
    "-" +
    randomString(4, 16) +
    "-" +
    randomString(4, 16) +
    "-" +
    randomString(4, 16)
  );
}
