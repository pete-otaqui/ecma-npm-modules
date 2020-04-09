import { leftPad } from "../node_modules/mg-lib-string/src/index.js";

export function getFirstFormattedDate(date = new Date()) {
  const y = date.getFullYear();
  const m = leftPad(date.getMonth() + 1, 2, "0");
  const d = leftPad(date.getDate(), 2, "0");
  return `${y}-${m}-${d}`;
}
