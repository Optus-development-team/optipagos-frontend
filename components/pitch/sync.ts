/** Mensajes entre el pitch y su ventana de notas (/pitch/notas), por BroadcastChannel. */
export const CHANNEL = "optipagos-pitch";

export type DeckMessage =
  | { type: "state"; index: number; startedAt: number; slideAt: number; auto: boolean }
  | { type: "hello" }
  | { type: "next" }
  | { type: "prev" }
  | { type: "go"; index: number }
  | { type: "timer" }
  | { type: "auto" };

/** 83 000 ms → "1:23". */
export function clock(ms: number): string {
  const seconds = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}
