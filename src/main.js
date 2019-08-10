import { createSearchTemplate } from "./components/search.js";
import { createProfileTemplate } from "./components/profile.js";
import { createMenuTemplate } from "./components/menu.js";
import { createSortTemplate } from "./components/sort.js";
import { createCatalogTemplate } from "./components/catalog.js";
import { createFilmCardTemplate } from "./components/film-card.js";
import { createShowMoreButtonTemplate } from "./components/show-more-button.js";
import { createTopRatedTemplate } from "./components/top-rated.js";
// import { createMostCommentedTemplate } from "./components/most-commented.js";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector(`.header`);

render(headerElement, createSearchTemplate(), `beforeend`);
render(headerElement, createProfileTemplate(), `beforeend`);

const mainElement = document.querySelector(`.main`);

render(mainElement, createMenuTemplate(), `beforeend`);
render(mainElement, createSortTemplate(), `beforeend`);
render(mainElement, createCatalogTemplate(), `beforeend`);

const filmsElement = document.querySelector(`.films`);
const filmsListElement = filmsElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(
  `.films-list__container`
);

new Array(5)
  .fill(``)
  .forEach(() =>
    render(filmsListContainerElement, createFilmCardTemplate(), `beforeend`)
  );

render(filmsListElement, createShowMoreButtonTemplate(), `beforeend`);
render(filmsListElement, createTopRatedTemplate(), `beforeend`);

const filmsListExtraElement = filmsElement.querySelector(`.films-list--extra`);
const topRatedElement = filmsListExtraElement.querySelector(`.films-list__title`).textContent;


console.dir(topRatedElement);
