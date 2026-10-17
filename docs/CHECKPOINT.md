# CHECKPOINT FINAL DE CONTINUIDAD

Fecha: 2026-10-17

## Proyecto y repositorio

LoretoS — sitio oficial del proyecto musical familiar de nueve hermanos.

Repositorio: https://github.com/joanloret/loreto-v
URL pública prevista: https://joanloret.github.io/LoretoS/
Rama de trabajo: `main`

## Estado actual

Implementado:

- Se eliminaron los prefijos numéricos visibles de todos los títulos de sección.
- La sección Músicos muestra nueve nombres en el orden solicitado:
  Rodolfo Loreto, Elena Loreto, José Loreto, Julia Loreto, Jorge Loreto,
  Elizabeth Loreto, Angélica Loreto, Verónica Loreto y Guadalupe Loreto.
- Cada músico tiene un foco SVG vintage con estado `active` independiente en `script.js`.
- El foco activo está configurado actualmente en el registro visible `Jorge Loreto`.
- Los focos inactivos muestran vidrio y filamento sin resplandor; el activo usa brillo ámbar.
- Se conservaron el logo, la fotografía hero, la tipografía cursiva, los colores y los reproductores oficiales de SoundCloud.

## Archivos modificados

- `index.html`: eliminación de la numeración visible de los eyebrows de sección.
- `script.js`: configuración de los nueve músicos y renderizado accesible de focos SVG.
- `styles.css`: estilos, transición y brillo de los focos vintage.

## Validación

- No quedan prefijos `01 ·` a `07 ·` en `index.html`.
- Se conservan los identificadores SoundCloud `2421056196` y `2421058989`.
- No se reintrodujeron reproductores HTML5, rutas MP3 ni autoplay.
- `git diff --check` pasa sin errores.

## INSTRUCCIÓN PARA CONTINUAR

Para destacar a otro hermano, cambia únicamente `active: false` a `active: true` en su entrada de `content.musicians` dentro de `script.js` y deja todos los demás registros en `false`.
