# Optipagos · frontend

Sitio de **Optipagos**, una marca perteneciente a [Optus](https://optus.lat): la página pública,
las páginas legales, la página de confirmación que se abre desde WhatsApp y los comprobantes.
También produce las imágenes que el bot envía por WhatsApp. El backend
([`optipagos-backend`](https://github.com/Optus-development-team/optipagos-backend)) solo
expone la API.

| Dirección | Qué es |
| --- | --- |
| `https://optipagos.optus.lat` | Este sitio (`NEXT_PUBLIC_SITE_URL`) |
| `https://api.optipagos.optus.lat` | La API, en `optipagos-backend` (`NEXT_PUBLIC_API_URL`) |

## Rutas

| Ruta | Qué es |
| --- | --- |
| `/` | Página principal: qué es, cómo funciona, seguridad, preguntas y quién está detrás. |
| `/privacidad` · `/terminos` | Política de privacidad y términos de servicio. |
| `/w/<token>` | Confirmación que el bot envía por WhatsApp: crear la billetera, confirmar un envío o ver la clave, siempre con la huella o el rostro del teléfono. |
| `/c/<id>` | Comprobante de un movimiento, con botón para compartirlo como imagen. |
| `/c/<id>/imagen` | La imagen del comprobante (PNG 1200 × 630), generada aquí con `next/og`. |
| `/media/whatsapp/<nombre>.png` | Tarjetas de marca para los mensajes del bot (se leen de `assets/whatsapp`). |
| `/tarjetas/<nombre>` | Lienzo de esas tarjetas; solo sirve para capturarlas. |
| `/sitemap.xml` · `/robots.txt` · `/manifest.webmanifest` | SEO. |
| `/api/v1/{actions,auth,webhooks,receipts}/*` | No viven aquí: se reenvían a `optipagos-backend`. |

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # direcciones y número de WhatsApp
npm run dev                  # http://localhost:3000
```

Producción (o para probar con el teléfono): `npm run build && npm start`.

| Script | Uso |
| --- | --- |
| `npm run dev` · `build` · `start` | Desarrollo, compilación y servidor de producción |
| `npm run lint` · `npm run typecheck` | ESLint · `tsc --noEmit` |
| `npm run cards` | Captura las tarjetas de WhatsApp y la vista previa del sitio |

### Variables

| Variable | Para qué |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio: canónicas, sitemap y tarjetas de vista previa. |
| `NEXT_PUBLIC_API_URL` | URL pública de la API. Con valor, el navegador la llama directo (CORS). Vacía, el sitio reenvía `/api/v1` al backend (útil en local o con un solo túnel). |
| `BACKEND_URL` | Dirección del backend vista desde el servidor de Next (comprobantes y reenvíos). Se lee al compilar. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número de Optipagos, solo dígitos. |

La huella o el rostro solo funcionan en un contexto seguro (`https://` o `localhost`), así que
`/w/<token>` debe abrirse por un dominio con https. Las passkeys quedan atadas a ese dominio:
**una billetera creada bajo un dominio no se puede abrir desde otro**.

## Despliegue con los dominios de producción

1. **Sitio** en `optipagos.optus.lat`: `NEXT_PUBLIC_SITE_URL=https://optipagos.optus.lat` y
   `NEXT_PUBLIC_API_URL=https://api.optipagos.optus.lat`.
2. **Backend** en `api.optipagos.optus.lat`: `PUBLIC_BASE_URL=https://optipagos.optus.lat` y
   `API_PUBLIC_URL=https://api.optipagos.optus.lat` (ver su README).
3. En Meta, el webhook pasa a `https://api.optipagos.optus.lat/api/v1/webhooks/whatsapp`.
4. Si se usa Google, la URI de redirección es
   `https://api.optipagos.optus.lat/api/v1/auth/google/callback`.

`assets/whatsapp/*.png` y `assets/fonts/**/*.ttf` se leen del disco al atender peticiones; ya
están declarados en `outputFileTracingIncludes` para los despliegues que empaquetan por ruta.

## Diseño

Las referencias están en `assets/inspo/`:

- **Paleta** (`color_palette.jpg`): Indigo Dye `#00416A` y Eggshell `#F0EAD6`. El resto de
  tonos (tintes del índigo, cremas, miel, ocre, arcilla, musgo) se derivan de esos dos y están
  declarados como tokens en `app/globals.css`.
- **Formas** (`shapes.jpg`): tarjetas con una esquina recortada donde encaja una ficha
  (`components/ui/NotchCard.tsx`), píldoras con contorno y títulos condensados.
- **Componentes** (`components_designs.jpg`): botones, avisos, fichas y tarjetas, reinterpretados
  con trazo de rotulador.
- **Doodle**: los contornos pasan por un filtro SVG (`#doodle`, en `app/layout.tsx`) que los hace
  temblar como un dibujo a mano; los garabatos decorativos están en `components/doodles`.

Tipografías de Google Fonts: **Baumans** para el logo, **Bebas Neue** para títulos, **DM Sans**
para texto y **Patrick Hand** para las notas a mano. La web las carga con `next/font`; sus TTF
están además en `assets/fonts` porque el generador de imágenes los necesita.

Iconos: [`doodle-icons`](https://github.com/svatsa159/react-doodle-icons) para los ilustrados y
las redes (`components/icons.tsx`, solo desde Server Components) y Material Icons
(`react-icons/md`) para los pequeños de interfaz. Sin emojis.

### Movimiento

Todo se mueve poco y despacio, como un dibujo que respira (estilos al final de `globals.css`):

- **Entre páginas**: `components/ui/PageTransition.tsx` usa `<ViewTransition>` de React; la
  hoja que sale se levanta y la nueva entra con un saltito. La cabecera y el pie no se mueven.
- **Al hacer scroll**: `components/ui/Reveal.tsx` (aparecer, saltar, llegar de lado).
- **Siempre**: garabatos que flotan, titilan o se mecen; trazos que se dibujan (`.draw`); la
  cinta deslizante (`Marquee`); burbujas del chat que van llegando; contornos que "hierven"
  (`.boil`, filtro `#doodle-boil`) y un estallido en los momentos buenos (`Celebrate`).

Con "reducir movimiento" activado en el sistema, nada se anima y todo queda visible.

## Imágenes para WhatsApp

**Tarjetas** (bienvenida, billetera lista, confirmar envío, pago enviado, dinero recibido):

- El código está en `assets/whatsapp/cards.tsx` y usa los mismos componentes de la web.
- `npm run cards` abre `/tarjetas/<nombre>` en un navegador sin interfaz y guarda la captura en
  `assets/whatsapp/<nombre>.png`. La tarjeta `og` se copia además como vista previa del sitio
  (`app/opengraph-image.png` y `app/twitter-image.png`).
- El backend las pide por `/media/whatsapp/<nombre>.png`, las sube una vez a WhatsApp y
  reutiliza su media id. La respuesta lleva `ETag`: al volver a capturar, el backend lo nota y
  sube la versión nueva.

```bash
npm run build && npm start          # o npm run dev
npx playwright install chromium     # la primera vez (o define CHROME_PATH)
npm run cards
```

**Comprobantes**: `/c/<id>/imagen` dibuja el comprobante con los datos de
`GET /api/v1/receipts/<id>`. El bot lo envía como imagen del mensaje "Envío completado" o
"Recibiste dinero", y desde la página `/c/<id>` cualquiera puede compartirlo o descargarlo.

## SEO y vista previa de enlaces

- Metadatos completos en `app/layout.tsx` (Open Graph, tarjeta grande de X/Twitter, robots).
- `sitemap.xml`, `robots.txt` y `manifest.webmanifest` generados desde `app/`.
- Datos estructurados (Organization, WebSite y FAQPage) en la página principal.
- Los enlaces personales (`/w/` y `/c/`) llevan `noindex`, pero sí muestran vista previa al
  compartirse: `/w/` una tarjeta genérica (nunca datos de la operación) y `/c/` su comprobante.

## Página de confirmación y seguridad

`/w/<token>` es el único lugar donde la clave de la billetera existe sin cifrar: en la memoria
del navegador y durante lo que dura una firma. Por eso `proxy.ts` la sirve con una CSP estricta
con nonce, sin terceros, sin caché y con `Referrer-Policy: no-referrer`. La lógica está en
`lib/signer/` (passkeys con PRF, sobre cifrado de la clave) y `components/signer/Signer.tsx`.

## Textos legales

`/privacidad` y `/terminos` describen lo que el producto hace hoy. Son un punto de partida
razonable, no un dictamen: conviene que los revise un abogado antes de publicarlos.
