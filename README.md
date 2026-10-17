# LoretoS

Sitio web oficial de LoretoS, proyecto familiar de indie pop latino. Sitio estático, rápido y compatible con GitHub Pages.

El encabezado y el pie de página usan el logotipo oficial `assets/Logo LoretoS.jpg`. La imagen es un JPEG de 1408x768 y se muestra con proporciones conservadas. El favicon sigue siendo el SVG provisional.

## Ejecutar localmente

No requiere dependencias. Desde esta carpeta:

```bash
python3 -m http.server 8000
```

Abre `http://localhost:8000`.

## Actualizar contenido

Edita el objeto `content` al inicio de `script.js` para agregar lanzamientos, videos, músicos, galería y novedades. Reemplaza los espacios de fotografía en `index.html` o `styles.css` con imágenes propias autorizadas. Antes de publicar, sustituye el correo y los enlaces sociales provisionales en `index.html`.

## Publicar en GitHub Pages

En el repositorio: **Settings → Pages → Deploy from a branch → main → /(root)**. La URL esperada es `https://joanloret.github.io/LoretoS/`.

## SoundCloud

La sección **Escucha nuestra música** integra el reproductor oficial de SoundCloud para `Todo va a estar bien` mediante iframe, sin reproducción automática y sin descargar ni alojar el MP3 en este repositorio. La reproducción depende de la disponibilidad pública del enlace de SoundCloud y de la conexión del visitante.

## Reproductores de música

Las canciones `Todo va a estar bien` y `Si vuelves a mi vida` usan los reproductores oficiales de SoundCloud dentro de sus tarjetas, con reproducción iniciada por el visitante. No se alojan archivos MP3 en este repositorio.

El proyecto no incluye reproducción de audio ficticia ni un formulario que simule envíos: los enlaces de plataformas y el correo deben configurarse cuando exista contenido oficial.
