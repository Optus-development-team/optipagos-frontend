import type { SVGProps } from "react";
import { ECommerce, Finance, HandGestures, Interfaces } from "doodle-icons";

/**
 * Iconos doodle (https://github.com/svatsa159/react-doodle-icons, paquete `doodle-icons`).
 *
 * El paquete exporta grupos enteros, así que este módulo solo se importa desde Server
 * Components: los iconos viajan al navegador ya dibujados y no se descarga la librería.
 * Los componentes cliente los reciben como props (ver app/w/[token]/page.tsx).
 */
const ICONS = {
  wallet: Finance.Wallet,
  coin: Finance.Coin,
  cash: Finance.Cash,
  piggy: Finance.PiggyBank,
  safe: Finance.Safe,
  trend: Finance.TrendUp,
  send: Interfaces.Send,
  message: Interfaces.Message,
  phone: Interfaces.Phone,
  lock: Interfaces.Lock,
  key: Interfaces.Key,
  shield: Interfaces.Shield,
  tick: Interfaces.Tick,
  cross: Interfaces.Cross,
  caution: Interfaces.Caution,
  clock: Interfaces.Clock,
  info: Interfaces.Info,
  bell: Interfaces.Bell,
  list: Interfaces.Checklist,
  heart: Interfaces.Heart,
  zap: Interfaces.Zap,
  user: Interfaces.User,
  globe: Interfaces.Globe,
  question: Interfaces.Question,
  qr: ECommerce.Qr,
  fingerprint: HandGestures.ScanFingerprint,
  tap: HandGestures.Tap,
  wave: HandGestures.WaveRight,
  thumbs: HandGestures.ThumbsUp,
  ok: HandGestures.Ok,
} as const;

export type DoodleIconName = keyof typeof ICONS;

export function DoodleIcon({
  name,
  ...props
}: { name: DoodleIconName } & Omit<SVGProps<SVGSVGElement>, "name">) {
  const Icon = ICONS[name];
  return <Icon fill="currentColor" aria-hidden="true" focusable="false" {...props} />;
}
