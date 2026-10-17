# CHECKPOINT FINAL DE CONTINUIDAD

Fecha: 2026-10-17

## Proyecto y repositorio

LORETO V — reproductores de canciones DEMO.

Repositorio: https://github.com/joanloret/loreto-v  
Rama: `main`  
Último commit verificado: `c13abff` (`Add LORETO V demo song players`)  
Estado: sincronizado con `origin/main`.

## Estado actual

Implementado en `script.js`:

- `Todo va a estar bien` en estado `DEMO`.
- `Si vuelves a mi vida` en estado `DEMO`.
- Reproductores HTML5 sin autoplay y con `controlsList="nodownload"`.
- El enlace oficial solo aparece cuando el estado es `Publicado` y se configura `releaseLink`.

Archivos de audio pendientes:

- `assets/audio/todo-va-a-estar-bien.mp3`
- `assets/audio/si-vuelves-a-mi-vida.mp3`

No se han añadido archivos de audio ni se ha declarado reproducción real probada.

## Validación

Pasaron las comprobaciones estructurales de títulos, estado DEMO, controles, ausencia de autoplay, rutas documentadas y estilos responsive. No fue posible probar reproducción, pausa, búsqueda o volumen porque los MP3 todavía no existen.

## INSTRUCCIÓN PARA CONTINUAR

Crear `assets/audio/`, colocar allí exactamente los dos archivos MP3 indicados, abrir el sitio en escritorio y móvil, probar ambos reproductores y publicar el cambio verificando que los archivos existan en GitHub Pages.
