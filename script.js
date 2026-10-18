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
const readVoteData = () => {
  try {
    const data = JSON.parse(localStorage.getItem(voteStorageKey) || '{}');
    return data && typeof data === 'object' ? data : {};
  } catch {
    return {};
  }
};
const saveVoteData = (data) => {
  try {
    localStorage.setItem(voteStorageKey, JSON.stringify(data));
  } catch {
    // La encuesta sigue funcionando durante la visita aunque el navegador bloquee el almacenamiento.
  }
};
const getSongId = (title) => title.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const renderReactions = (item) => {
  if ((item.status || '').toUpperCase() !== 'DEMO') return '';
  const songId = getSongId(item.title);
  const data = readVoteData();
  const songVotes = data[songId] || { counts: {}, selected: null };
  const total = reactionOptions.reduce((sum, option) => sum + (Number(songVotes.counts?.[option.id]) || 0), 0);
  const buttons = reactionOptions.map((option) => {
    const count = Number(songVotes.counts?.[option.id]) || 0;
    const percent = total ? Math.round(count / total * 100) : 0;
    const selected = songVotes.selected === option.id;
    return `<button class="reaction-option${selected ? ' is-selected' : ''}" type="button" data-reaction-song="${songId}" data-reaction-id="${option.id}" aria-pressed="${selected}" aria-label="${option.label}: ${count} reacciones"><span class="reaction-emoji" aria-hidden="true">${option.emoji}</span><span class="reaction-label">${option.label}</span><span class="reaction-result"><span class="reaction-count">${count}</span><span class="reaction-percent">${percent}%</span></span></button>`;
  }).join('');
  return `<section class="demo-reactions" data-reactions-for="${songId}" aria-label="Encuesta de reacciones para ${item.title}"><div class="reaction-heading"><h3>¿Qué te pareció este demo?</h3><p>Tu opinión nos ayuda a seguir mejorando.</p></div><div class="reaction-options">${buttons}</div><p class="reaction-total" aria-live="polite"> ${total} ${total === 1 ? 'reacción' : 'reacciones'} en este navegador</p></section>`;
};
const updateReactionPanel = (songId) => {
  const item = content.releases.find((release) => getSongId(release.title) === songId);
  const panel = document.querySelector(`[data-reactions-for="${songId}"]`);
  if (!item || !panel) return;
  panel.outerHTML = renderReactions(item);
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

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-reaction-song][data-reaction-id]');
  if (!button) return;
  const { reactionSong: songId, reactionId } = button.dataset;
  if (!reactionOptions.some((option) => option.id === reactionId)) return;
  const data = readVoteData();
  const songVotes = data[songId] || { counts: {}, selected: null };
  if (songVotes.selected === reactionId) return;
  if (songVotes.selected) {
    songVotes.counts[songVotes.selected] = Math.max(0, (Number(songVotes.counts[songVotes.selected]) || 0) - 1);
  }
  songVotes.counts[reactionId] = (Number(songVotes.counts[reactionId]) || 0) + 1;
  songVotes.selected = reactionId;
  data[songId] = songVotes;
  saveVoteData(data);
  updateReactionPanel(songId);
});
