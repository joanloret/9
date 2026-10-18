# 9 Loretos

Sitio web oficial de 9 Loretos, proyecto familiar de indie pop latino. Sitio estático, rápido y compatible con GitHub Pages.

El encabezado y el pie de página usan el logotipo tipográfico vintage `assets/logo-9-loretos.svg`. El nombre visible actual del proyecto es **9 Loretos**. Si se cambia de nombre en el futuro, actualizar también el logotipo SVG para que coincida.

## Ejecutar localmente

No requiere dependencias. Desde esta carpeta:

```bash
python3 -m http.server 8000
```

Abre `http://localhost:8000`.

## Actualizar contenido

Edita `const siteName = '9 Loretos'` al inicio de `script.js` para actualizar el nombre usado en las tarjetas y reproductores. Para un cambio futuro de marca, actualiza también el título, encabezados y metadatos en `index.html`, además del archivo `assets/logo-9-loretos.svg`. Edita el objeto `content` al inicio de `script.js` para agregar lanzamientos, videos, músicos, galería y novedades. Reemplaza los espacios de fotografía en `index.html` o `styles.css` con imágenes propias autorizadas. Antes de publicar, sustituye el correo y los enlaces sociales provisionales en `index.html`.

## Publicar en GitHub Pages

En el repositorio: **Settings → Pages → Deploy from a branch → main → /(root)**. La URL esperada es `https://9.loretos.workers.dev`.

## SoundCloud

La sección **Escucha nuestra música** integra el reproductor oficial de SoundCloud para `Todo va a estar bien` mediante iframe, sin reproducción automática y sin descargar ni alojar el MP3 en este repositorio. La reproducción depende de la disponibilidad pública del enlace de SoundCloud y de la conexión del visitante.

## Reproductores de música

Las canciones `Todo va a estar bien` y `Si vuelves a mi vida` usan los reproductores oficiales de SoundCloud dentro de sus tarjetas, con reproducción iniciada por el visitante. No se alojan archivos MP3 en este repositorio.

El proyecto no incluye reproducción de audio ficticia ni un formulario que simule envíos: los enlaces de plataformas y el correo deben configurarse cuando exista contenido oficial.
