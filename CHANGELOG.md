# Cambios

## 0.3.1 · 8 de octubre de 2026

- **Vista previa del enlace**: la portada y las páginas legales vuelven a mostrar su imagen al
  compartir el enlace en WhatsApp y otras apps. Desde 0.3.0 salían sin `og:image`: los
  metadatos se definen en `app/[lang]/` y `app/(app)/`, un nivel por debajo de
  `app/opengraph-image.png`, y Next descartaba la imagen del archivo. Ahora se declara en
  `lib/metadata.ts`, con su texto alternativo en cada idioma.

## 0.3.0 · 6 de octubre de 2026

- **Idiomas**: el sitio está en español e inglés. La portada y las páginas legales tienen su
  versión en `/en` (`/en/privacy`, `/en/terms`), con selector de idioma, `hreflang` y sitemap
  por idioma. La primera visita respeta el idioma del navegador y la elección se recuerda.
- Las páginas de los enlaces personales (`/w/<token>` y `/c/<id>`) se muestran en el idioma de
  la persona sin cambiar de dirección: los enlaces que envía el bot siguen siendo los mismos.
- Los textos pasan a `i18n/dictionaries/` y los legales a `content/legal/`. La política de
  privacidad menciona la cookie `lang`, que recuerda el idioma.
- Estructura: `app/[lang]/` (sitio, estático por idioma) y `app/(app)/` (enlaces personales y
  tarjetas). `proxy.ts` suma el enrutado de idiomas a las cabeceras de la página de firma, que
  no cambian.

## 0.2.1 · 5 de octubre de 2026

- Documentación: las imágenes de los mensajes con botón de enlace las toma WhatsApp de la URL
  pública del sitio (`/media/whatsapp/…` y `/c/<id>/imagen`), que deben ser accesibles desde
  internet.

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
