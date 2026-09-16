/**
 * Pakistani mobile numbers, taken the way people actually write them.
 *
 * A mobile here is ten digits starting 3XX — written locally as 0322 400 7617
 * and internationally as +92 322 400 7617. Network codes run 030x–034x for the
 * four big operators and 035x for SCO in Azad Kashmir and Gilgit-Baltistan.
 * Landlines (042 for Lahore) are rejected on purpose: the confirmation goes
 * back over WhatsApp, so the number has to be a mobile.
 */

const PK_MOBILE = /^3[0-5]\d{8}$/;

/**
 * The ten-digit national number, or null when it isn't a Pakistani mobile.
 * Accepts every shape a visitor might type: 0322 400 7617, 03224007617,
 * +92 322 400 7617, 0092-322-4007617, 923224007617.
 */
export function parsePkMobile(raw: string): string | null {
  // Keep a leading +, drop the spaces, dashes and brackets people pad with.
  const typed = raw.trim().replace(/[\s().-]/g, "");
  let national = typed.startsWith("+") ? typed.slice(1) : typed;

  if (national.startsWith("0092")) national = national.slice(4);
  else if (national.startsWith("92")) national = national.slice(2);
  else if (national.startsWith("0")) national = national.slice(1);

  return PK_MOBILE.test(national) ? national : null;
}

/** 3224007617 becomes "0322 400 7617", the way it's written on a signboard. */
export function formatPkMobile(national: string): string {
  return `0${national.slice(0, 3)} ${national.slice(3, 6)} ${national.slice(6)}`;
}
