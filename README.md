# Beth &amp; Ed Cake's — Landing page

Sitio oficial de **Beth &amp; Ed Cake's**, repostería artesanal con calor de hogar.
Es una web informativa: muestra los productos, los horarios y cómo pedir. No tiene carrito de compras ni necesita servidor.

---

## 1. Dónde está el proyecto

- **Repositorio GitHub**: https://github.com/EINHELLDEV/beth-and-ed-cakes (público, rama `main`)
- **Web publicada**: se activa al conectar el repositorio en Vercel (ver la sección 5)

Para trabajar sobre el código: clona el repositorio o descarga el ZIP del repositorio.
Si ya tienes el proyecto en tu computador, abre la carpeta `beth-and-ed-cakes`.

No hay nada que instalar ni compilar para ver la web: es HTML, CSS y JavaScript plano.

**Opción A — con VS Code (lo más fácil)**
1. Abre la carpeta `beth-and-ed-cakes` en VS Code.
2. Clic derecho sobre `index.html` → **Open with Live Server** (o "Abrir con Live Server").
3. Se abre en `http://127.0.0.1:5500/index.html`. Cualquier cambio que guardes se refleja al instante.

**Opción B — con una terminal**
```bash
cd beth-and-ed-cakes
python3 -m http.server 4173
```
Y abre `http://127.0.0.1:4173`.

> Si abres `index.html` haciendo doble clic también funciona, pero algunas funciones del navegador
> (copiar al portapapeles) piden que la página venga de un servidor. Por eso conviene usar una de las dos opciones.

---

## 2. Estructura del proyecto

```
beth-and-ed-cakes/
├── index.html              → toda la página (contenido y textos)
├── main.js                 → menú móvil, filtros, lightbox, carrusel y formulario
├── styles.css              → colores, componentes y animaciones (edítalo sin miedo)
├── tailwind.config.js      → la paleta de la marca y las tipografías
├── favicon.png             → el ícono de la pestaña del navegador
├── package.json            → solo hace falta si vas a recompilar Tailwind
├── src/tailwind.css        → entrada de Tailwind
├── assets/
│   ├── css/tailwind.css    → Tailwind ya compilado (es el que carga la web)
│   ├── img/                → las fotos de los productos
│   ├── CREDITOS.md         → licencias de las fotos de internet
│   └── creditos-imagenes.json
```

---

## 3. Cómo cambiar las fotos por las tuyas

Las fotos que están ahora son **de internet y son solo de muestra**. Cuando tengas las tuyas:

1. Borra o reemplaza los archivos dentro de `assets/img/`. **Conserva los nombres** y todo se actualiza solo:
   - `torta-tres-leches.jpg`, `torta-tres-leches-2.jpg`
   - `torta-chocolate.jpg`, `torta-chocolate-2.jpg`
   - `torta-arequipe.jpg`, `torta-arequipe-2.jpg`
   - `torta-fresas-chantilly.jpg`
   - `torta-fresas-colonia-tovar.jpg`
   - `torta-melocotones.jpg`
   - `yogures.jpg`, `yogures-2.jpg`
   - `postres-en-vasos.jpg`
   - `hero-principal.jpg`, `hero-2.jpg`, `hero-3.jpg`, `hero-4.jpg`
2. **Recomendado**: recorta tus fotos en cuadrado (o 4:3) y comprímelas antes de guardarlas.
   Usa [tinypng.com](https://tinypng.com) o squoosh.app; con fotos de menos de 200 KB la web carga volando.
3. Si tu foto es vertical, ajústala así en el `index.html`:
   ```html
   <img src="assets/img/torta-tres-leches.jpg" alt="Torta tres leches con crema y caramelo"
        width="1200" height="900" loading="lazy" decoding="async" />
   ```
   `width` y `height` son los pixeles reales de tu foto: hacen que la página no salte mientras carga.
4. El texto que aparece bajo cada foto se edita en `index.html`, en las líneas `<span class="mt-1 block text-sm ...">`.

---

## 4. Cómo cambiar los textos

Todo el texto de la web está en `index.html`. Los datos de contacto aparecen en varios lugares
(puedes buscarlos con Ctrl+F):

| Qué | Dónde | Valor actual |
|---|---|---|
| Número de WhatsApp (botones) | `wa.me/584123650270` | 0412 365 0270 |
| Número visible | `index.html` → sección Contacto | 0412 365 0270 |
| Correo | `index.html` → sección Contacto | bethandedcakes@gmail.com |
| Horarios | `index.html` → tarjeta "Horario" | Lun–Vie 9–6, Sáb 10–4, Dom cerrado |
| Teléfono / correo en `main.js` | constantes `WHATSAPP` y `CORREO` | deben coincidir con los de arriba |

> Cuando cambies el número, actualiza **las dos cosas**: el `href` de los botones y la constante `WHATSAPP` en `main.js`.
> El formato de WhatsApp es sin `+` ni espacios: `584123650270` (58 = Venezuela).

### Los testimonios
Los 6 comentarios del carrusel son **de muestra, inventados**. Cuando tengas reseñas reales, reemplaza
el contenido de cada `<li class="tarjeta-testimonio">` en `index.html` (nombre, ciudad y comentario) y
borra la línea que dice *"Reseñas de muestra…"* para que no se note que eran de ejemplo.

---

## 5. Publicar en internet (GitHub + Vercel, gratis)

Son dos pasos y no necesitas pagar nada.

### Paso 1 — GitHub (ya está hecho ✅)

El proyecto ya está en https://github.com/EINHELLDEV/beth-and-ed-cakes, con el primer commit listo.
Desde ahora, cada cambio se sube así, desde la carpeta del proyecto:

```bash
git add .
git commit -m "Descripción de lo que cambiaste"
git push
```

> Si es la primera vez en tu computador, configura tu identidad una sola vez:
> `git config --global user.name "TU USUARIO"` y `git config --global user.email "TU CORREO"`.
> La forma más cómoda sin terminal es **GitHub Desktop** (gratis): abres la carpeta,
> escribes el mensaje del commit y le das a *Push to origin*.

### Paso 2 — Conecta Vercel (lo haces tú, son 4 clics)

1. Entra en [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de **GitHub**.
2. Click en **Add New… → Project**.
3. Busca el repositorio `beth-and-ed-cakes` y dale **Import**.
   (Si no aparece, primero entra en *Account Settings → GitHub Apps* y dale acceso al repositorio.)
4. En *Configure Project* **no cambies nada**: el proyecto ya trae un `vercel.json` con
   la configuración correcta (sitio estático, sin build). Solo dale **Deploy**.

En menos de un minuto Vercel te da una URL pública tipo
`https://beth-and-ed-cakes.vercel.app`, y a partir de ahí **cada `git push` publica los
cambios solo**. También puedes cambiar esa URL desde *Project Settings → Domains*.

### Dominio propio (opcional)
En Vercel: *Settings → Domains → Add* y escribe tu dominio. Vercel te dice qué registros DNS
configurar en tu proveedor de nombre. Cuesta aparte (salvo que uses un dominio que ya tengas).

---

## 6. Recompilar Tailwind (solo si cambias el HTML)

Tailwind ya está compilado en `assets/css/tailwind.css`, así que **no necesitas tocar nada de esto**
para cambiar textos o fotos. Solo hace falta si añades clases nuevas de Tailwind en `index.html`:

```bash
npm install      # solo la primera vez
npm run build    # regenera assets/css/tailwind.css
```

`npm run dev` deja Tailwind recompilando solo mientras editas.

---

## 7. Detalles técnicos

- **Tailwind CSS 3** compilado a un solo archivo CSS (11 KB). Sin CDN, sin dependencias en producción.
- **Tipografías**: DM Serif Display (títulos), Outfit (texto) y Caveat (detalles manuscritos), desde Google Fonts.
- **Paleta**: rosa pastel `#FDF4F7` de fondo, fuchsia `#D02A5C` para acentos y botones, marrón cálido `#4A3733` para el texto.
  Se cambia todo en `tailwind.config.js` (colores) y en `styles.css` (las variables `--rosa-*`).
- **Accesibilidad**: navegación por teclado, `skip to content`, foco visible, `aria-label` en los controles,
  contraste del botón fuchsia 5.04:1 (cumple AA) y respeto a `prefers-reduced-motion`.
- **Sin dependencias externas** en tiempo de ejecución: no hay frameworks, ni cookies, ni analítica.
- El logo original se recortó y se transparentó para `assets/img/logo-beth-ed.png` y `favicon.png`.

### Verificación hecha
- Probado en Chromium a 1440×900 (escritorio) y 390×844 (móvil): sin desbordes horizontales ni errores de consola.
- Probados: menú móvil, filtros de la pasarela, lightbox (abrir/cerrar con Escape), carrusel de testimonios,
  validación del formulario y generación del mensaje de WhatsApp.
- Las 19 imágenes cargan correctamente en ambos tamaños.
- Código publicado en GitHub y listo para conectar con Vercel.

---

## 8. Pendiente de tu lado

- [ ] Reemplazar las fotos de internet por las fotos reales de los productos.
- [ ] Cambiar los testimonios de muestra por reseñas reales y quitar la nota de "Reseñas de muestra".
- [ ] Actualizar el enlace de Instagram cuando esté listo (busca `Instagram` en `index.html`).
- [ ] Publicar en Vercel cuando quieras que la web esté en internet.
