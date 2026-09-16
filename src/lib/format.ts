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
