/**
 * @project MemoDevLab Web (Vite SSR)
 * @file server/utils/sendHtml.ts
 * @description Envío de respuestas HTML con Cache-Control y formato condicional
 * @author Guillermo Corredor
 * @created 03/04/2026
 *
 * @overview
 * Centraliza el envío de HTML al cliente con headers de cache
 * y formato condicional (solo en desarrollo para legibilidad).
 */

import type { FastifyReply } from "fastify";
import { isProduction } from "./constants";
import { formatHtml } from "./formatHtml";

/**
 * @function sendHtml
 * @description Envía respuesta HTML con Cache-Control y formato en desarrollo
 * @param {FastifyReply} reply - Objeto de respuesta Fastify
 * @param {string} html - HTML a enviar
 * @param {string} cacheControl - Valor del header Cache-Control
 */
export function sendHtml(reply: FastifyReply, html: string, cacheControl: string): void {
  reply
    .header("Cache-Control", cacheControl)
    .type("text/html")
    .send(isProduction ? html : formatHtml(html));
}
