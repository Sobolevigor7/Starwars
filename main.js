/* eslint-disable no-restricted-globals */
/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable no-console */

const cssPromises = {};

function loadResource(src) {
  if (src.endsWith('.js')) {
    return import(src);
  }
  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      cssPromises[src] = new Promise((resolve) => {
        link.addEventListener('load', () => resolve());
      });
      document.head.append(link);
    }
    return cssPromises[src];
  }
  return fetch(src).then((res) => res.json());
}

const appContainer = document.getElementById('app');
let seacrhParams = new URLSearchParams(location.search);
let filmId = seacrhParams.get('filmId');

async function renderPage(modulName, apiUrl, css) {
  const [pageModule, data] = await Promise.all([
    modulName,
    apiUrl,
    css,
  ].map((src) => loadResource(src)));
  let planetsData = [];
  let speciesData = [];
  if (filmId) {
    planetsData = await Promise.all(data.planets.map((src) => loadResource(src)));
    speciesData = await Promise.all(data.species.map((src) => loadResource(src)));
  }
  appContainer.innerHTML = '';
  appContainer.append(pageModule.render(data, planetsData, speciesData));
}

window.addEventListener('popstate', () => {
  seacrhParams = new URLSearchParams(location.search);
  filmId = seacrhParams.get('filmId');
  if (filmId) {
    renderPage(
      './js/filmdetails.js',
      `https://swapi.dev/api/films/${filmId}`,
      'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css',
    );
  } else {
    renderPage(
      './js/catalogue.js',
      'https://swapi.dev/api/films/',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css',
    );
  }
});

if (filmId) {
  renderPage(
    './js/filmdetails.js',
    `https://swapi.dev/api/films/${filmId}`,
    'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css',
  );
} else {
  renderPage(
    './js/catalogue.js',
    'https://swapi.dev/api/films/',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css',
  );
}
