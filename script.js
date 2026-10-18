const siteName = '9 Loretos';
const content = {
  releases: [
    { title: 'Todo va a estar bien', status: 'DEMO', description: 'Escucha la versión demo de esta canción.', embedUrl: 'https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F2421056196&show_artwork=true&auto_play=false', releaseLink: '' },
    { title: 'Si vuelves a mi vida', status: 'DEMO', description: 'Escucha la versión demo de esta canción.', embedUrl: 'https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F2421058989&show_artwork=true&auto_play=false', releaseLink: '' }
  ],
  videos: [
    { title: 'Sesión en vivo', description: 'Interpretaciones de 9 Loretos en directo, donde la energía de la música se comparte con el público.' },
    { title: 'Video oficial', description: 'Videos musicales y piezas audiovisuales que dan vida a las canciones de 9 Loretos.' }
  ],
  musicians: [
    { name: 'Rodolfo Loreto', active: false }, { name: 'Elena Loreto', active: false }, { name: 'José Loreto', active: false },
    { name: 'Julia Loreto', active: false }, { name: 'Jorge Loreto', active: true }, { name: 'Elizabeth Loreto', active: false },
    { name: 'Angélica Loreto', active: false }, { name: 'Verónica Loreto', active: false }, { name: 'Guadalupe Loreto', active: false }
  ],
  gallery: [
    { title: 'Ensayo', src: 'assets/ensayo-loretos.jpg', alt: 'Los hermanos Loreto durante un ensayo musical', position: '50% center' },
    { title: 'Grabación', src: 'assets/grabacion-loretos.jpg', alt: 'Los hermanos Loreto durante una sesión de grabación', position: '50% center' },
    { title: 'La casa', src: 'assets/la-casa-loretos.jpg', alt: 'La casa que forma parte de la historia familiar de 9 Loretos', position: '50% center' },
    { title: 'Momento familiar', src: 'assets/momento-familiar-loretos.jpg', alt: 'Los hermanos Loreto compartiendo un momento familiar', position: '50% center' }
  ],
  news: [{ label: 'Próximamente', title: 'Aquí empieza la historia', text: 'Las novedades de 9 Loretos aparecerán en este espacio.' }]
};
const $ = (selector) => document.querySelector(selector);
const reactionOptions = [
  { id: 'love', emoji: '❤️', label: 'Me encanta' },
  { id: 'needs-work', emoji: '🤔', label: 'Le falta algo' },
  { id: 'dislike', emoji: '😤', label: 'No me gustó' }
];
const voteStorageKey = 'loretos-demo-reactions-v1';
const voterStorageKey = 'loretos-reaction-voter-id-v1';
const reactionStates = {};
const readVoteData = () => {
  try {
    const data = JSON.parse(localStorage.getItem(voteStorageKey) || '{}');
    return data && typeof data === 'object' ? data : {};
  } catch {
    return {};
  }
};
const saveVoteData = (data) => {
  try { localStorage.setItem(voteStorageKey, JSON.stringify(data)); } catch {}
};
const getVoterId = () => {
  try {
    let id = localStorage.getItem(voterStorageKey);
    if (!id) {
      id = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : 'v-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem(voterStorageKey, id);
    }
    return id;
  } catch {
    return 'session-' + Math.random().toString(36).slice(2);
  }
};
const getSongId = (title) => title.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const emptyVoteState = () => ({ counts: {}, selected: null, source: 'local' });
const getReactionState = (songId) => {
  if (reactionStates[songId]) return reactionStates[songId];
  const saved = readVoteData()[songId] || { counts: {}, selected: null };
  reactionStates[songId] = { ...saved, source: 'local' };
  return reactionStates[songId];
};
const renderReactions = (item) => {
  if ((item.status || '').toUpperCase() !== 'DEMO') return '';
  const songId = getSongId(item.title);
  const songVotes = getReactionState(songId);
  const total = reactionOptions.reduce((sum, option) => sum + (Number(songVotes.counts?.[option.id]) || 0), 0);
  const buttons = reactionOptions.map((option) => {
    const count = Number(songVotes.counts?.[option.id]) || 0;
    const percent = total ? Math.round(count / total * 100) : 0;
    const selected = songVotes.selected === option.id;
    return `<button class="reaction-option${selected ? ' is-selected' : ''}" type="button" data-reaction-song="${songId}" data-reaction-id="${option.id}" aria-pressed="${selected}" aria-label="${option.label}: ${count} reacciones"><span class="reaction-emoji" aria-hidden="true">${option.emoji}</span><span class="reaction-label">${option.label}</span><span class="reaction-result"><span class="reaction-count">${count}</span><span class="reaction-percent">${percent}%</span></span></button>`;
  }).join('');
  const note = songVotes.source === 'global'
    ? 'Resultados compartidos de todos los visitantes.'
    : 'Modo local: el contador compartido aún no está conectado.';
  return `<section class="demo-reactions" data-reactions-for="${songId}" aria-label="Encuesta de reacciones para ${item.title}"><div class="reaction-heading"><h3>¿Qué te pareció este demo?</h3><p>Tu opinión nos ayuda a seguir mejorando.</p></div><div class="reaction-options">${buttons}</div><p class="reaction-total" aria-live="polite">${total} ${total === 1 ? 'reacción' : 'reacciones'} · ${note}</p></section>`;
};
const updateReactionPanel = (songId) => {
  const item = content.releases.find((release) => getSongId(release.title) === songId);
  const panel = document.querySelector(`[data-reactions-for="${songId}"]`);
  if (!item || !panel) return;
  panel.outerHTML = renderReactions(item);
};
const loadGlobalReactions = async (item) => {
  if ((item.status || '').toUpperCase() !== 'DEMO') return;
  const songId = getSongId(item.title);
  try {
    const url = new URL('/api/reactions', window.location.origin);
    url.searchParams.set('songId', songId);
    url.searchParams.set('voterId', getVoterId());
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('La API de reacciones no está disponible');
    const result = await response.json();
    if (!result || !result.counts) throw new Error('Respuesta de encuesta inválida');
    reactionStates[songId] = { counts: result.counts, selected: result.selected || null, source: 'global' };
  } catch {
    const local = readVoteData()[songId] || { counts: {}, selected: null };
    reactionStates[songId] = { ...local, source: 'local' };
  }
  updateReactionPanel(songId);
};
const renderBulb = (active) => `<svg class="vintage-bulb${active ? ' is-active' : ''}" viewBox="0 0 32 42" aria-hidden="true" focusable="false"><path class="bulb-glass" d="M16 2C9.4 2 4 7.2 4 13.6c0 4.4 2.3 7.7 5.8 10.1 1.4 1 2.2 2.1 2.4 4.3h7.6c.2-2.2 1-3.3 2.4-4.3 3.5-2.4 5.8-5.7 5.8-10.1C28 7.2 22.6 2 16 2Z"/><path class="bulb-filament" d="M12 13c1.5 2.1 2.2 4.2 2.2 7.7M20 13c-1.5 2.1-2.2 4.2-2.2 7.7M12 13c1.2-1.1 2.7-1.1 4 0 1.3-1.1 2.8-1.1 4 0"/><path class="bulb-base" d="M12 28h8M12.8 31h6.4M13.7 34h4.6"/></svg>`;
const render = () => {
  $('#releases-grid').innerHTML = content.releases.map((item) => `<article class="release-card"><div class="release-art" role="img" aria-label="Portada de ${item.title}"><span>${item.status || 'DEMO'}</span></div><div class="card-meta"><strong class="script-song-title">${item.title}</strong><span>${siteName}</span></div><p class="song-description">${item.description}</p><div class="soundcloud-frame"><iframe title="SoundCloud: ${item.title} de ${siteName}" loading="lazy" scrolling="no" frameborder="no" src="${item.embedUrl}"></iframe></div>${renderReactions(item)}</article>`).join('');
  $('#videos-grid').innerHTML = content.videos.map((item) => `<article class="video-card"><span class="play-icon" aria-hidden="true">◉</span><h3>${item.title}</h3><p>${item.description}</p></article>`).join('');
  $('#musicians-grid').innerHTML = content.musicians.map((item) => `<article class="musician-card${item.active ? ' musician-card-active' : ''}">${renderBulb(item.active)}<span>${item.name}</span></article>`).join('');
  $('#gallery-grid').innerHTML = content.gallery.map((item) => `<figure class="gallery-item"><img src="${item.src}" alt="${item.alt}" loading="lazy" decoding="async" style="object-position: ${item.position}"><figcaption>${item.title}</figcaption></figure>`).join('');
  $('#news-list').innerHTML = content.news.map((item) => `<article class="news-item"><small>${item.label}</small><h3>${item.title}</h3><p>${item.text}</p></article>`).join('');
};
render();
$('#year').textContent = new Date().getFullYear();
const toggle = $('.menu-toggle'); const nav = $('#site-nav');
toggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); });
nav.addEventListener('click', (event) => { if (event.target.matches('a')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); } });
document.querySelectorAll('a[href="#"]').forEach((link) => link.addEventListener('click', (event) => event.preventDefault()));

document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-reaction-song][data-reaction-id]');
  if (!button || button.disabled) return;
  const { reactionSong: songId, reactionId } = button.dataset;
  if (!reactionOptions.some((option) => option.id === reactionId)) return;
  const item = content.releases.find((release) => getSongId(release.title) === songId);
  if (!item || (item.status || '').toUpperCase() !== 'DEMO') return;
  const panel = document.querySelector(`[data-reactions-for="${songId}"]`);
  if (panel) panel.querySelectorAll('button').forEach((control) => { control.disabled = true; });
  try {
    const response = await fetch('/api/reactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ songId, reactionId, voterId: getVoterId() })
    });
    if (!response.ok) throw new Error('El servidor de reacciones no está configurado');
    const result = await response.json();
    if (!result || !result.counts) throw new Error('Respuesta de encuesta inválida');
    reactionStates[songId] = { counts: result.counts, selected: result.selected || reactionId, source: 'global' };
  } catch {
    const data = readVoteData();
    const songVotes = data[songId] || { counts: {}, selected: null };
    if (songVotes.selected !== reactionId) {
      if (songVotes.selected) songVotes.counts[songVotes.selected] = Math.max(0, (Number(songVotes.counts[songVotes.selected]) || 0) - 1);
      songVotes.counts[reactionId] = (Number(songVotes.counts[reactionId]) || 0) + 1;
      songVotes.selected = reactionId;
    }
    data[songId] = songVotes;
    saveVoteData(data);
    reactionStates[songId] = { ...songVotes, source: 'local' };
  }
  updateReactionPanel(songId);
});
content.releases.forEach(loadGlobalReactions);
