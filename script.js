const content = {
  releases: [
    { title: 'Todo va a estar bien', status: 'DEMO', description: 'Escucha la versión demo de esta canción.', embedUrl: 'https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F2421056196&show_artwork=true&auto_play=false', releaseLink: '' },
    { title: 'Si vuelves a mi vida', status: 'DEMO', description: 'Escucha la versión demo de esta canción.', embedUrl: 'https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F2421058989&show_artwork=true&auto_play=false', releaseLink: '' }
  ],
  videos: [
    { title: 'Sesión en vivo', description: 'Interpretaciones de LoretoS en directo, donde la energía de la música se comparte con el público.' },
    { title: 'Video oficial', description: 'Videos musicales y piezas audiovisuales que dan vida a las canciones de LoretoS.' }
  ],
  musicians: [
    { name: 'Rodolfo Loreto', active: false }, { name: 'Elena Loreto', active: false }, { name: 'José Loreto', active: false },
    { name: 'Julia Loreto', active: false }, { name: 'Jhorge Loreto', active: true }, { name: 'Elizabeth Loreto', active: false },
    { name: 'Angélica Loreto', active: false }, { name: 'Verónica Loreto', active: false }, { name: 'Guadalupe Loreto', active: false }
  ],
  gallery: [
    { title: 'Ensayo', src: 'assets/ensayo-loretos.jpg', alt: 'Los hermanos Loreto durante un ensayo musical', position: '50% center' },
    { title: 'Grabación', src: 'assets/grabacion-loretos.jpg', alt: 'Los hermanos Loreto durante una sesión de grabación', position: '50% center' },
    { title: 'La casa', src: 'assets/la-casa-loretos.jpg', alt: 'La casa que forma parte de la historia familiar de LoretoS', position: '50% center' },
    { title: 'Momento familiar', src: 'assets/momento-familiar-loretos.jpg', alt: 'Los hermanos Loreto compartiendo un momento familiar', position: '50% center' }
  ],
  news: [{ label: 'Próximamente', title: 'Aquí empieza la historia', text: 'Las novedades de LoretoS aparecerán en este espacio.' }]
};
const storyAlbums = [
  { title: 'Proyectos inconclusos', description: 'Canciones e ideas que forman parte de los caminos musicales que quedaron abiertos.', embedUrl: '' },
  { title: 'Nuestra historia', description: 'Un álbum que reúne la memoria, las canciones y el recorrido de LoretoS.', embedUrl: '' }
];
const $ = (selector) => document.querySelector(selector);
const renderBulb = (active) => `<svg class="vintage-bulb${active ? ' is-active' : ''}" viewBox="0 0 32 42" aria-hidden="true" focusable="false"><path class="bulb-glass" d="M16 2C9.4 2 4 7.2 4 13.6c0 4.4 2.3 7.7 5.8 10.1 1.4 1 2.2 2.1 2.4 4.3h7.6c.2-2.2 1-3.3 2.4-4.3 3.5-2.4 5.8-5.7 5.8-10.1C28 7.2 22.6 2 16 2Z"/><path class="bulb-filament" d="M12 13c1.5 2.1 2.2 4.2 2.2 7.7M20 13c-1.5 2.1-2.2 4.2-2.2 7.7M12 13c1.2-1.1 2.7-1.1 4 0 1.3-1.1 2.8-1.1 4 0"/><path class="bulb-base" d="M12 28h8M12.8 31h6.4M13.7 34h4.6"/></svg>`;
const render = () => {
  $('#releases-grid').innerHTML = content.releases.map((item) => `<article class="release-card"><div class="release-art" role="img" aria-label="Portada de ${item.title}"><span>${item.status || 'DEMO'}</span></div><div class="card-meta"><strong class="script-song-title">${item.title}</strong><span>LoretoS</span></div><p class="song-description">${item.description}</p><div class="soundcloud-frame"><iframe title="SoundCloud: ${item.title} de LoretoS" loading="lazy" scrolling="no" frameborder="no" src="${item.embedUrl}"></iframe></div></article>`).join('');
  $('#videos-grid').innerHTML = content.videos.map((item) => `<article class="video-card"><span class="play-icon" aria-hidden="true">◉</span><h3>${item.title}</h3><p>${item.description}</p></article>`).join('');
  $('#story-albums').innerHTML = storyAlbums.map((item) => '<article class="story-album-card"><p class="eyebrow">Archivo musical</p><h3>' + item.title + '</h3><p>' + item.description + '</p>' + (item.embedUrl ? '<div class="soundcloud-frame"><iframe title="SoundCloud: ' + item.title + ' de LoretoS" loading="lazy" scrolling="no" frameborder="no" src="' + item.embedUrl + '"></iframe></div>' : '<p class="album-link-placeholder">El reproductor de este álbum se añadirá aquí cuando incorpores su enlace de SoundCloud.</p>') + '</article>').join('');
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
