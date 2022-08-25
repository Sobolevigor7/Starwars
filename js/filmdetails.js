/* eslint-disable no-await-in-loop */
/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
export function render(data, planetsData, species) {
  const container = document.createElement('div');
  container.classList.add('container', 'py-4');
  const header = document.createElement('h1');
  const btnBack = document.createElement('a');
  const crawl = document.createElement('p');
  const personsAndPlanets = document.createElement('div');
  const planetsHeader = document.createElement('h2');
  const speciesHeader = document.createElement('h2');
  const planets = document.createElement('or');
  const speciesList = document.createElement('or');
  personsAndPlanets.style.display = 'flex';
  personsAndPlanets.style.justifyContent = 'space-around';
  btnBack.classList.add('btn', 'btn-primary');
  btnBack.textContent = 'Back to episodes';
  btnBack.href = 'index.html';
  header.textContent = `Название ${data.title}, Эпизод ${data.episode_id}`;
  crawl.textContent = `${data.opening_crawl}`;
  planetsHeader.textContent = 'Planets';
  speciesHeader.textContent = 'Species';
  planetsData.forEach((element) => {
    const planet = document.createElement('li');
    planet.textContent = element.name;
    planet.style.fontSize = '18px';
    planets.append(planet);
  });
  species.forEach((element) => {
    const specie = document.createElement('li');
    specie.textContent = element.name;
    specie.style.fontSize = '18px';
    speciesList.append(specie);
  });
  planetsHeader.append(planets);
  speciesHeader.append(speciesList);
  personsAndPlanets.append(planetsHeader);
  personsAndPlanets.append(speciesHeader);
  container.append(header);
  container.append(btnBack);
  container.append(crawl);
  container.append(personsAndPlanets);
  return container;
}
