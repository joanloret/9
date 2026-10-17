# CHECKPOINT FINAL DE CONTINUIDAD

Fecha: 2026-10-17

## Proyecto y repositorio

LoretoS — actualización de marca y reproductores de canciones DEMO.

Repositorio: https://github.com/joanloret/loreto-v  
URL pública prevista: https://joanloret.github.io/LoretoS/
Rama: `main`  
Último commit verificado antes de esta actualización: `2597e82` (`Document demo audio continuity checkpoint`)  
Estado: sincronizado con `origin/main`.

## Estado actual

Implementado:

- Marca visible actualizada a `LoretoS`.
- Encabezado y pie usan el logo real `assets/Logo LoretoS.jpg`.
- Favicon SVG provisional conservado porque las dimensiones del PNG no están verificadas.
- Logo dimensionado con altura fija, anchura automática y `object-fit: contain`.
- Las dos canciones DEMO usan iframes oficiales de SoundCloud.

En `script.js`, `Todo va a estar bien` y `Si vuelves a mi vida` permanecen en estado `DEMO` y apuntan a sus URLs oficiales de SoundCloud. No se han añadido archivos MP3.

## Validación

Pasaron las comprobaciones estructurales de títulos, estado DEMO, iframes, accesibilidad, ausencia de autoplay y estilos responsive. La reproducción efectiva depende de la disponibilidad de los enlaces públicos de SoundCloud.

## INSTRUCCIÓN PARA CONTINUAR

Abrir el sitio en escritorio y móvil, probar ambos reproductores de SoundCloud y comprobar que los enlaces públicos sigan disponibles.
