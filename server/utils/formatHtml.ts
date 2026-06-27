/**
 * @project MemoDevLab Web (Vite SSR)
 * @file server/utils/formatHtml.ts
 * @description Formateador de HTML para legibilidad en desarrollo
 * @author Guillermo Corredor
 * @created 03/04/2026
 *
 * @overview
 * Formatea el HTML con indentación para legibilidad en el "View Source" del browser.
 * Protege bloques que no deben reformatearse: contenido React (hydration) y scripts
 * inline (Vite HMR). Estrategia: extraer → placeholder → formatear → restaurar.
 */

/**
 * @function formatHtml
 * @description Formatea HTML protegiendo contenido React y scripts inline
 * @param {string} html - HTML completo con app renderizada
 * @returns {string} HTML formateado con bloques protegidos intactos
 */
export function formatHtml(html: string): string {
  const protectedBlocks: string[] = [];

  /** Paso 1: Extraer scripts inline */
  let shell = html.replaceAll(/<script([^>]*)>([^]*?)<\/script>/gi, (match, _attrs: string, content: string) => {
    if (!content.trim()) return match;
    const idx = protectedBlocks.length;
    protectedBlocks.push(match);
    return `<!--__PROTECTED_${idx}__-->`;
  });

  /** Paso 2: Extraer bloque React (<div id="root">...</div>) */
  const rootOpenTag = '<div id="root">';
  const rootStart = shell.indexOf(rootOpenTag);
  if (rootStart !== -1) {
    let depth = 1;
    let pos = rootStart + rootOpenTag.length;
    while (depth > 0 && pos < shell.length) {
      const nextOpen = shell.indexOf("<div", pos);
      const nextClose = shell.indexOf("</div>", pos);
      if (nextClose === -1) break;
      if (nextOpen === -1 || nextClose < nextOpen) {
        depth--;
        pos = nextClose + 6;
      } else {
        depth++;
        pos = nextOpen + 4;
      }
    }
    const idx = protectedBlocks.length;
    protectedBlocks.push(shell.substring(rootStart, pos));
    shell = shell.substring(0, rootStart) + `<!--__PROTECTED_${idx}__-->` + shell.substring(pos);
  }

  /** Paso 3: Formatear el shell */
  let indent = 0;
  const tab = "  ";
  const formatted = shell
    .replaceAll(/>\s*</g, ">\n<")
    .split("\n")
    .map((line: string) => {
      const trimmed = line.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("</")) indent = Math.max(0, indent - 1);
      const result = `${tab.repeat(indent)}${trimmed}`;
      if (
        trimmed.startsWith("<") &&
        !trimmed.startsWith("</") &&
        !trimmed.startsWith("<!") &&
        !trimmed.endsWith("/>") &&
        !/^<(meta|link|input|br|hr|img|source|track|wbr|col|embed|area|base)\b/.test(trimmed)
      ) {
        indent++;
      }
      return result;
    })
    .filter(Boolean)
    .join("\n");

  /** Paso 4: Restaurar bloques protegidos */
  let result = formatted;
  for (let i = 0; i < protectedBlocks.length; i++) {
    result = result.replace(`<!--__PROTECTED_${i}__-->`, protectedBlocks[i]);
  }

  return result;
}
