import type { Direction } from "./types";

const bn = (n: number, opts?: Intl.NumberFormatOptions) =>
  n.toLocaleString("bn-BD", opts);

export const formatPrice = (n: number) => `${bn(n)} টাকা`;
export const formatPct = (n: number) =>
  `${bn(Math.abs(n), { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
export const formatCount = (n: number) => bn(n);

const UNITS: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};
export const formatUnit = (u: string) => UNITS[u] ?? `প্রতি ${u}`;

export const arrow: Record<Direction, string> = { up: "▲", down: "▼", flat: "—" };

export const badgeClass: Record<Direction, string> = {
  up: "badge-error",
  down: "badge-success",
  flat: "badge-ghost",
};