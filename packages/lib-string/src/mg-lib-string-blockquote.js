export function blockQuote(str) {
  return str
    .split("\n")
    .map((s) => `> ${s}`)
    .join("\n");
}
