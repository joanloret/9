# LORETO V

Sitio web oficial de LORETO V, proyecto familiar de indie pop latino. Sitio estático, rápido y compatible con GitHub Pages.

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

El proyecto no incluye reproducción de audio ficticia ni un formulario que simule envíos: los enlaces de plataformas y el correo deben configurarse cuando exista contenido oficial.
