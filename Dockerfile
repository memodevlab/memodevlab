# =========================================
# MemoDevLab Web (Vite SSR + Fastify)
# Imagen Node: compila (client + server + prerender SSG) y corre el servidor Fastify.
# =========================================

# =========================================
# Stage 1: Build
# =========================================
FROM node:22-alpine AS build

WORKDIR /app

# Instalar dependencias (incluye dev: vite, tsx, typescript — necesarias para build y runtime)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copiar el código
COPY . .

# Variables públicas de build: Vite las incrusta en el bundle del cliente
# y el prerender SSG las usa para cargar datos del negocio (apps_business).
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_PLATFORM_NAME
ARG VITE_PUBLIC_ENCRIP_KEY
ARG SITE_URL

ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL \
    VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY \
    VITE_PLATFORM_NAME=$VITE_PLATFORM_NAME \
    VITE_PUBLIC_ENCRIP_KEY=$VITE_PUBLIC_ENCRIP_KEY \
    SITE_URL=$SITE_URL

# build = build:client && build:server && prerender (genera dist/client + dist/server)
RUN yarn build

# =========================================
# Stage 2: Runtime (servidor Fastify SSR)
# =========================================
FROM node:22-alpine AS runtime

WORKDIR /app

# Defaults del servidor (Coolify/entorno pueden sobreescribir PORT/HOST/SITE_URL/etc.)
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000

# Copiar artefactos y dependencias ya resueltas desde el build
#  - node_modules: incluye tsx (el `start` ejecuta server/server.ts con tsx)
#  - dist: bundles compilados (client + server) y HTML pre-renderizado
#  - server + src: el servidor los importa en runtime (tsx los transpila al vuelo)
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/server ./server
COPY --from=build /app/src ./src
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/tsconfig.json ./tsconfig.json
COPY --from=build /app/tsconfig.app.json ./tsconfig.app.json
COPY --from=build /app/tsconfig.node.json ./tsconfig.node.json
COPY --from=build /app/vite.config.ts ./vite.config.ts

EXPOSE 3000

# Arranca el servidor Fastify en modo producción (sirve dist/client + SSR/SSG)
CMD ["yarn", "start"]
