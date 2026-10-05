# Cambios

## 0.2.0 · 5 de octubre de 2026

- **Dominios**: preparado para `optipagos.optus.lat` (sitio) y `api.optipagos.optus.lat` (API).
  El navegador llama a la API directamente cuando hay `NEXT_PUBLIC_API_URL`; sin ella, el
  sitio reenvía `/api/v1` al backend.
- **Comprobantes**: página `/c/<id>` y su imagen `/c/<id>/imagen`, generada aquí. Botón para
  compartir el comprobante como imagen.
- **Imágenes para WhatsApp**: tarjetas dibujadas con los componentes de la web
  (`assets/whatsapp/cards.tsx`), capturadas con `npm run cards` y servidas en
  `/media/whatsapp/<nombre>.png`.
- **Páginas nuevas**: política de privacidad y términos de servicio; pie ampliado con redes
  sociales, contacto y enlace a optus.lat; sección sobre Optus en la portada.
- **Movimiento**: transiciones entre páginas, apariciones al hacer scroll, cinta deslizante,
  trazos que se dibujan y celebración en los momentos buenos. Respeta "reducir movimiento".
- **SEO**: metadatos completos, tarjeta de vista previa, sitemap, robots, manifest y datos
  estructurados (incluidas las preguntas frecuentes).

## 0.1.0 · 4 de octubre de 2026

- Sitio de Optipagos con estética doodle (paleta Indigo Dye / Eggshell, tarjetas con esquina
  recortada, tipografías de Google Fonts, iconos doodle y Material).
- Página de confirmación `/w/<token>`, traída desde el backend y rediseñada.
