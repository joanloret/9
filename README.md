# LoretoS

Sitio web oficial de LoretoS, proyecto familiar de indie pop latino. Sitio estático, rápido y compatible con GitHub Pages.

El encabezado y el pie de página esperan el logotipo oficial en `assets/loretos-logo.png`. El archivo debe añadirse al repositorio para que pueda cargarse en GitHub Pages; mientras no exista, la referencia de imagen quedará sin recurso visible. El favicon sigue siendo el SVG provisional porque no se han verificado las dimensiones del PNG.

## Ejecutar localmente

No requiere dependencias. Desde esta carpeta:

```bash
python3 -m http.server 8000
```

Abre `http://localhost:8000`.

## Actualizar contenido

Edita el objeto `content` al inicio de `script.js` para agregar lanzamientos, videos, músicos, galería y novedades. Reemplaza los espacios de fotografía en `index.html` o `styles.css` con imágenes propias autorizadas. Antes de publicar, sustituye el correo y los enlaces sociales provisionales en `index.html`.

## Publicar en GitHub Pages

En el repositorio: **Settings → Pages → Deploy from a branch → main → /(root)**. La URL esperada es `https://joanloret.github.io/loreto-v/`. Actualiza `sitemap.xml`, `robots.txt` y `og:url` si cambia el dominio.

## Reproductores DEMO

La sección Música está preparada para las demos:

- `assets/audio/todo-va-a-estar-bien.mp3`
- `assets/audio/si-vuelves-a-mi-vida.mp3`

Actualmente esos archivos no están incluidos en el repositorio, por lo que los reproductores todavía no se han probado con audio real. Para activarlos, crea la carpeta `assets/audio/` y sube exactamente esos dos archivos MP3; después verifica la reproducción, pausa, búsqueda y volumen en escritorio y móvil antes de publicar. No se muestran enlaces de descarga y cada reproductor usa `controlsList="nodownload"` cuando el navegador lo admite. Esto no impide la copia completa: los archivos publicados en GitHub Pages pueden ser accesibles mediante su URL directa.

Las canciones nuevas usan `status: 'DEMO'` por defecto en `script.js`. Para un lanzamiento oficial, cambia explícitamente el estado a `Publicado` y añade su URL en `releaseLink`; el reproductor DEMO puede mantenerse activo.

El proyecto no incluye reproducción de audio ficticia ni un formulario que simule envíos: los enlaces de plataformas y el correo deben configurarse cuando exista contenido oficial.
