/** Datos estructurados (schema.org) para buscadores. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <>
      {(Array.isArray(data) ? data : [data]).map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          // El contenido lo arma el sitio, no el visitante; se escapa "<" por si acaso.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
