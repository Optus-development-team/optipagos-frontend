# Optipagos · frontend

Sitio de **Optipagos** (una marca de Optus): la página pública y la página de confirmación que
se abre desde WhatsApp. Es la puerta de entrada de todo el producto; el backend
(`optipagos-backend`) solo expone la API.

| Ruta | Qué es |
| --- | --- |
| `/` | Página principal: qué es Optipagos, cómo funciona y preguntas frecuentes. |
| `/w/<token>` | Página de confirmación que el bot envía por WhatsApp: crear la billetera, confirmar un envío o mostrar la clave, siempre con la huella o el rostro del teléfono. |
| `/api/v1/{actions,auth,webhooks}/*` | No vive aquí: se reenvía tal cual a `optipagos-backend` (API de la página de confirmación, vínculo con Google y webhook de WhatsApp). El resto de la API del backend no se publica. |

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # número de WhatsApp y URL del backend
npm run dev                  # http://localhost:3000
```

Para producción (o para probar con el teléfono): `npm run build && npm start`.

`BACKEND_URL` se lee al compilar. El backend debe tener `PUBLIC_BASE_URL` apuntando a la URL
pública de este sitio: de ahí salen los enlaces `/w/<token>` y el origen que aceptan las
passkeys. La huella/rostro solo funciona en un contexto seguro (`https://` o `localhost`), así
que desde otro dispositivo hay que entrar por un dominio con https (por ejemplo, un túnel).

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

Tipografías (Google Fonts, vía `next/font`): **Baumans** para el logo, **Bebas Neue** para
títulos, **DM Sans** para texto y **Patrick Hand** para las notas a mano.

Iconos: [`doodle-icons`](https://github.com/svatsa159/react-doodle-icons) para los ilustrados
(`components/icons.tsx`, solo desde Server Components) y Material Icons (`react-icons/md`) para
los pequeños de interfaz. Sin emojis.

## Página de confirmación y seguridad

`/w/<token>` es el único lugar donde la clave de la billetera existe sin cifrar: en la memoria
del navegador y durante lo que dura una firma. Por eso `proxy.ts` la sirve con una CSP estricta
con nonce, sin terceros, sin caché y con `Referrer-Policy: no-referrer`. La lógica está en
`lib/signer/` (passkeys con PRF, sobre cifrado de la clave) y `components/signer/Signer.tsx`.
