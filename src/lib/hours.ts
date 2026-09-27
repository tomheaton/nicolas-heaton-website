/** Formats a decimal hour (9.5) as 12-hour clock text ("9:30am"). */
export const formatTime12 = (h: number): string => {
  const hr = Math.floor(h);
  const mn = Math.round((h - hr) * 60);
  const ap = hr < 12 ? "am" : "pm";
  const h12 = hr % 12 === 0 ? 12 : hr % 12;
  return `${h12}${mn ? `:${mn < 10 ? "0" : ""}${mn}` : ""}${ap}`;
};

/** Formats a decimal hour (9.5) as 24-hour clock text ("09:30") for schema.org. */
export const formatTime24 = (h: number): string => {
  const hr = Math.floor(h);
  const mn = Math.round((h - hr) * 60);
  return `${String(hr).padStart(2, "0")}:${String(mn).padStart(2, "0")}`;
};
