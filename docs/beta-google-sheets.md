# Registro de la beta cerrada en Google Sheets

El formulario de `#beta` guarda cada registro como una fila de una hoja de Google, sin pasar por el backend. La acción del servidor (`app/actions/beta.ts`) llama a un Apps Script publicado como aplicación web; la dirección y la clave solo viven en variables de entorno del servidor.

## Pasos

1. **Crea la hoja.** En Google Sheets, una hoja nueva llamada «Beta Optipagos». La primera pestaña recibirá los registros (el script escribe los encabezados solo).
2. **Abre el script.** Extensiones → Apps Script. Borra el código de ejemplo y pega `docs/beta-google-sheets.gs`.
3. **Cambia la clave.** En la línea `const SECRET`, pon una clave larga y aleatoria (por ejemplo la salida de `openssl rand -hex 24`). Guárdala: es `BETA_SHEET_SECRET`.
4. **Publica.** Implementar → Nueva implementación → tipo «Aplicación web». Ejecutar como: **Yo**. Quién tiene acceso: **Cualquier persona**. Implementar y autoriza los permisos cuando Google los pida. Copia la URL que termina en `/exec`: es `BETA_SHEET_URL`.
5. **Configura Vercel** (proyecto optipagos-frontend, Production y Preview):
   ```
   vercel env add BETA_SHEET_URL production
   vercel env add BETA_SHEET_SECRET production
   ```
   O en el panel: Settings → Environment Variables. Para probar en local, ponlas en `.env.local`.
6. **Redespliega.** Las variables se leen en el servidor al ejecutar la acción, pero un deploy nuevo asegura que queden aplicadas: `vercel --prod` o un push a `main`.
7. **Prueba.** Envía el formulario en el sitio: debe aparecer «¡Ya estás en la lista!» y una fila nueva en la hoja.

## Notas

- Si cambias el código del script, usa Implementar → Administrar implementaciones → editar → «Nueva versión»; la URL no cambia.
- «Cualquier persona» solo significa que la URL responde sin iniciar sesión; sin la clave el script rechaza el envío.
- Los datos son personales (nombre, correo, WhatsApp): comparte la hoja solo con quien la necesite.
- Si prefieres Google Forms: no se recomienda, porque exigiría enviar desde el navegador a campos `entry.XXXX` no documentados y sin validación de la clave. Apps Script + Sheets es más estable.
