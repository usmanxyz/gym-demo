/** Formats a rupee amount the way prices are written in Pakistan: Rs 6,500. */
export function formatPKR(amount: number): string {
  return `Rs ${new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(amount)}`;
}

/** Turns 24h "19:30" into "7:30 pm" for display. */
export function formatTime(time24: string): string {
  const [h, m] = time24.split(":").map(Number);
  const suffix = h < 12 ? "am" : "pm";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour} ${suffix}` : `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}

/** "13:30"–"15:00" becomes "1 hr 30 min"; "06:00"–"06:45" becomes "45 min". */
export function formatDuration(start24: string, end24: string): string {
  const minutes = toMinutes(end24) - toMinutes(start24);
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) return `${rest} min`;
  const hourPart = `${hours} hr`;
  return rest === 0 ? hourPart : `${hourPart} ${rest} min`;
}

/** Minutes since midnight, for sorting and arithmetic on "HH:MM" strings. */
export function toMinutes(time24: string): number {
  const [h, m] = time24.split(":").map(Number);
  return h * 60 + m;
}
