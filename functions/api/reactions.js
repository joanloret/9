const REACTION_IDS = ['love', 'needs-work', 'dislike'];
const SONG_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const VOTER_ID_PATTERN = /^[a-zA-Z0-9-]{8,128}$/;

const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  }
});

const validSongId = (value) => typeof value === 'string' && value.length <= 80 && SONG_ID_PATTERN.test(value);
const validVoterId = (value) => typeof value === 'string' && value.length <= 128 && VOTER_ID_PATTERN.test(value);

async function readResults(db, songId, voterId) {
  const [rows, ownVote] = await Promise.all([
    db.prepare('SELECT reaction_id, COUNT(*) AS total FROM demo_reactions WHERE song_id = ? GROUP BY reaction_id')
      .bind(songId).all(),
    db.prepare('SELECT reaction_id FROM demo_reactions WHERE song_id = ? AND voter_id = ?')
      .bind(songId, voterId).first()
  ]);
  const counts = Object.fromEntries(REACTION_IDS.map((id) => [id, 0]));
  for (const row of rows.results || []) {
    if (REACTION_IDS.includes(row.reaction_id)) counts[row.reaction_id] = Number(row.total) || 0;
  }
  return {
    songId,
    counts,
    total: Object.values(counts).reduce((sum, count) => sum + count, 0),
    selected: ownVote?.reaction_id || null,
    scope: 'global'
  };
}

export async function onRequestGet({ request, env }) {
  if (!env.REACTIONS_DB) return json({ error: 'La base de datos de reacciones no está configurada.' }, 503);
  const url = new URL(request.url);
  const songId = url.searchParams.get('songId');
  const voterId = url.searchParams.get('voterId');
  if (!validSongId(songId) || !validVoterId(voterId)) {
    return json({ error: 'songId o voterId no válido.' }, 400);
  }
  try {
    return json(await readResults(env.REACTIONS_DB, songId, voterId));
  } catch {
    return json({ error: 'No se pudieron consultar las reacciones.' }, 500);
  }
}

export async function onRequestPost({ request, env }) {
  if (!env.REACTIONS_DB) return json({ error: 'La base de datos de reacciones no está configurada.' }, 503);
  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) {
    return json({ error: 'Origen no permitido.' }, 403);
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'El cuerpo debe ser JSON válido.' }, 400);
  }
  const { songId, voterId, reactionId } = body || {};
  if (!validSongId(songId) || !validVoterId(voterId) || !REACTION_IDS.includes(reactionId)) {
    return json({ error: 'Canción, visitante o reacción no válidos.' }, 400);
  }
  try {
    await env.REACTIONS_DB.prepare(
      `INSERT INTO demo_reactions (song_id, voter_id, reaction_id, updated_at)
       VALUES (?, ?, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(song_id, voter_id) DO UPDATE SET
         reaction_id = excluded.reaction_id,
         updated_at = CURRENT_TIMESTAMP`
    ).bind(songId, voterId, reactionId).run();
    return json(await readResults(env.REACTIONS_DB, songId, voterId));
  } catch {
    return json({ error: 'No se pudo guardar la reacción.' }, 500);
  }
}
