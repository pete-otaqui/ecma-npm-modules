export function getSecondFormattedDate(date = new Date()) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const th = date.getHours();
  const tm = date.getMinutes();
  const ts = date.getSeconds();
  return `${y}-${m}-${d} ${th}:${tm}:${ts}`;
}
