/** Rellena los huecos de una frase: fill("Hola, {name}", { name: "Ana" }). */
export const fill = (template: string, values: Record<string, string>): string =>
  template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
