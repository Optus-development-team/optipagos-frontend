import { notFound } from "next/navigation";

/** Cualquier dirección desconocida muestra el 404 del idioma (app/[lang]/not-found.tsx). */
export default function Unknown() {
  notFound();
}
