export function leftPad(str, len, pad = " ") {
  let out = `${str}`;
  while (out.length < len) {
    out = `${pad}${out}`;
  }
  return out;
}
