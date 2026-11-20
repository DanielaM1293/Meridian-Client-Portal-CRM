# Meridian — Client Portal CRM

Panel CRM para gestionar clientes y tareas, con un **portal de cliente** compartible.
Proyecto de portafolio de **Estefany Daniela Martínez Niño** · estefanydanielamartineznino@gmail.com

## Características

- **Dashboard**: KPIs animados (count-up), gráfica de ingresos SVG interactiva, dona de tareas, próximos vencimientos y actividad reciente.
- **Clientes**: vista de tarjetas o tabla, búsqueda, filtros por estado, panel lateral con detalle, alta de nuevos clientes.
- **Tareas**: tablero Kanban con **arrastrar y soltar**, vista de lista con check animado, filtros por cliente/prioridad, crear/editar/eliminar.
- **Portal del cliente**: vista previa "como cliente" con progreso, hitos, aprobación de entregables, facturas y chat.
- **Paleta de comandos** (`Ctrl/⌘ + K`) para navegar y ejecutar acciones.
- **4 idiomas**: English · Español · Français · Português (fechas, moneda y tiempos relativos localizados con `Intl`).
- **Modo claro / oscuro** con transición suave (respeta la preferencia del sistema).
- **Responsive**: sidebar en escritorio, barra inferior en móvil, tablero con scroll horizontal.
- **Accesible**: foco visible, `aria-*`, navegación por teclado, `prefers-reduced-motion`.
- Datos demo guardados en `localStorage` (botón de restablecer en Ajustes).

## Stack

React 18 · Vite · Framer Motion · React Router (HashRouter) · Lucide · CSS con variables (sin librería de UI).
Tipografía: **Fraunces** (display) + **Instrument Sans** (UI) + **JetBrains Mono** (cifras).

## Empezar

```bash
npm install
npm run dev       # desarrollo
npm run build     # producción en /dist
npm run preview   # probar el build
```

## Desplegar gratis

El proyecto usa `HashRouter` y `base: './'`, así que funciona en cualquier hosting estático:

- **Netlify / Vercel**: importa el repo (build `npm run build`, carpeta `dist`).
- **GitHub Pages**: sube el contenido de `dist/` a la rama `gh-pages`.

## Estructura

```
src/
  i18n.js          diccionarios EN/ES/FR/PT
  data.js          datos demo
  store.jsx        estado global (tema, idioma, clientes, tareas…)
  components/      ui, charts, Shell, modales, drawer, command palette
  views/           Login, Dashboard, Clients, Tasks, Portal, Settings
  styles.css       sistema de diseño
```
