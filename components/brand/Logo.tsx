import { OptipagosMark } from "./marks";

/** Logo de Optipagos: el pajarito y el nombre en Baumans. */
export function Logo({ className = "", size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const scale = {
    sm: { mark: "h-8 w-8", text: "text-2xl" },
    md: { mark: "h-10 w-10", text: "text-[1.9rem]" },
    lg: { mark: "h-14 w-14", text: "text-5xl" },
  }[size];
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <OptipagosMark className={`${scale.mark} flex-none`} />
      <span className={`wordmark ${scale.text} leading-none`}>optipagos</span>
    </span>
  );
}
