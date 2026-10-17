const content = {
  releases: [
    {
      title: 'Todo va a estar bien',
      status: 'DEMO',
      description: 'Escucha la versión demo de esta canción.',
      embedUrl: 'https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F2421056196&show_artwork=true&auto_play=false',
      releaseLink: ''
    },
    {
      title: 'Si vuelves a mi vida',
      status: 'DEMO',
      description: 'Escucha la versión demo de esta canción.',
      embedUrl: 'https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F2421058989&show_artwork=true&auto_play=false',
      releaseLink: ''
    }
  ],
  videos: [
    { title: 'Sesión en vivo', type: 'Espacio reservado', description: 'Añade aquí un enlace de YouTube o Vimeo cuando exista.' },
    { title: 'Video oficial', type: 'Espacio reservado', description: 'Añade aquí un videoclip o una pieza audiovisual.' }
  ],
  musicians: [
    { name: 'José Loreto', role: 'Músico · LoretoS', bio: 'Biografía pendiente de completar.', image: 'Retrato de José' },
    { name: 'Rodolfo Loreto', role: 'Músico · LoretoS', bio: 'Biografía pendiente de completar.', image: 'Retrato de Rodolfo' },
    { name: 'Jhorge Loreto', role: 'Músico · LoretoS', bio: 'Biografía pendiente de completar.', image: 'Retrato de Jhorge' }
  ],
  gallery: ['Ensayo', 'Grabación', 'La casa', 'Momento familiar'],
  news: [{ label: 'Próximamente', title: 'Aquí empieza la historia', text: 'Las novedades de LoretoS aparecerán en este espacio.' }]
};

const $ = (selector) => document.querySelector(selector);
const render = () => {
  $('#releases-grid').innerHTML = content.releases.map((item) => {
    const status = item.status || 'DEMO';
    const releaseLink = status === 'Publicado' && item.releaseLink
      ? `<a class="release-link" href="${item.releaseLink}" target="_blank" rel="noopener noreferrer">Lanzamiento oficial <span aria-hidden="true">↗</span></a>`
      : '';
    return `<article class="release-card">
      <div class="release-art" role="img" aria-label="Portada pendiente para ${item.title}"><span>${status}</span></div>
      <div class="card-meta"><strong class="script-song-title">${item.title}</strong><span>LoretoS</span></div>
      <p class="empty-copy">${item.description}</p>
      <div class="soundcloud-frame">
        <iframe title="SoundCloud: ${item.title} de LoretoS" loading="lazy" scrolling="no" frameborder="no" src="${item.embedUrl}"></iframe>
      </div>
      ${releaseLink}
    </article>`;
  }).join('');
  $('#videos-grid').innerHTML = content.videos.map((item) => `<article class="video-card"><span class="play-icon" aria-hidden="true">○</span><h3>${item.title}</h3><p>${item.type} · ${item.description}</p></article>`).join('');
  $('#musicians-grid').innerHTML = content.musicians.map((item) => `<article class="musician-card"><div class="musician-photo" role="img" aria-label="${item.image}, fotografía pendiente">${item.image}<br><small>reemplazar con foto propia</small></div><h3>${item.name}</h3><p>${item.role}</p><small>${item.bio}</small></article>`).join('');
  $('#gallery-grid').innerHTML = content.gallery.map((item) => `<div class="gallery-item" role="img" aria-label="Fotografía pendiente: ${item}">${item}<br><small>imagen pendiente</small></div>`).join('');
  $('#news-list').innerHTML = content.news.map((item) => `<article class="news-item"><small>${item.label}</small><h3>${item.title}</h3><p>${item.text}</p></article>`).join('');
};
render();
$('#year').textContent = new Date().getFullYear();
const toggle = $('.menu-toggle');
const nav = $('#site-nav');
toggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); });
nav.addEventListener('click', (event) => { if (event.target.matches('a')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); } });
document.querySelectorAll('a[href="#"]').forEach((link) => link.addEventListener('click', (event) => event.preventDefault()));
