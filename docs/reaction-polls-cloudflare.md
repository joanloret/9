# Encuestas compartidas de demos en Cloudflare

El frontend llama a `/api/reactions`. La función de Cloudflare Pages guarda un voto por identificador de navegador y canción en D1; si la misma persona cambia de reacción en ese navegador, se actualiza su voto anterior.

## Configuración requerida una sola vez

1. En Cloudflare, abre **Workers & Pages → D1 SQL Database** y crea una base de datos llamada `loretos-demo-reactions`.
2. Abre la consola SQL de esa base de datos y ejecuta el contenido de `migrations/0001_create_demo_reactions.sql`.
3. Abre el proyecto de Pages que publica este sitio. En **Settings → Functions → D1 database bindings**, añade un binding con variable **`REACTIONS_DB`** y selecciona `loretos-demo-reactions`.
4. Vuelve a desplegar el sitio y prueba las reacciones desde dos navegadores distintos: los conteos deben coincidir.

## Importante sobre el despliegue

Esta API usa el formato de **Cloudflare Pages Functions**. Debe desplegarse como proyecto de Cloudflare Pages para que `functions/api/reactions.js` se ejecute. Si el sitio se publica actualmente como un Worker de estáticos en `*.workers.dev`, Pages Functions no se activan automáticamente; en ese caso hay que integrar la misma lógica en el Worker existente y enlazar la base D1 a ese Worker antes de que los votos compartidos estén activos.

El identificador `voterId` se guarda en el navegador. Esto evita votos repetidos accidentales por canción en el mismo navegador, pero no equivale a una identidad verificada: borrar datos o usar otro navegador puede crear otro identificador.
