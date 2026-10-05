"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/** Vuelve a pedir la página cada cierto tiempo (mientras un pago sigue en camino). */
export function AutoRefresh({ everyMs }: { everyMs: number }) {
  const router = useRouter();
  useEffect(() => {
    const timer = window.setInterval(() => router.refresh(), everyMs);
    return () => window.clearInterval(timer);
  }, [router, everyMs]);
  return null;
}
