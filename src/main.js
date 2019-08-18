import {createSearchTemplate} from "./components/search.js";
import {createProfileTemplate} from "./components/profile.js";
import {createMenuTemplate} from "./components/menu.js";
import {createSortTemplate} from "./components/sort.js";
import {createCatalogTemplate} from "./components/catalog.js";
import {createFilmCard} from "./components/film-card.js";
import {createShowMoreButtonTemplate} from "./components/show-more-button.js";
import {createTopRatedTemplate} from "./components/top-rated.js";
// import { createMostCommentedTemplate } from "./components/most-commented.js";
import {createFilter} from "./components/filter";
import {createFilmDetail} from "./components/film-details";
import {getFilmCard, getFilter} from "./data";


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector(`.header`);

render(headerElement, createSearchTemplate(), `beforeend`);
render(headerElement, createProfileTemplate(), `beforeend`);

const mainElement = document.querySelector(`.main`);

render(mainElement, createMenuTemplate(), `beforeend`);

const mainNavigationItemActive = document.querySelector(`.main-navigation__item--active`);

const renderFilters = (container, title, count) => {
  container.insertAdjacentHTML(`afterend`, createFilter(title, count));
};

getFilter()
  .forEach((el) => {
    renderFilters(mainNavigationItemActive, el.title, el.count);
  });

render(mainElement, createSortTemplate(), `beforeend`);
render(mainElement, createCatalogTemplate(), `beforeend`);

const filmsElement = document.querySelector(`.films`);
const filmsListElement = filmsElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(
    `.films-list__container`
);

const CARD_COUNT = 6;

const renderCards = (container, count) => {
  container.insertAdjacentHTML(`beforeend`, new Array(count)
    .fill(``)
    .map(getFilmCard)
    .map(createFilmCard)
    .join(``));
};

renderCards(filmsListContainerElement, CARD_COUNT);


// const renderCards = (container, title, poster) => {
//   container.insertAdjacentHTML(`beforeend`, createFilmCard(title, poster));
// };

// getFilmCard()
//   .forEach((el) => {
//     renderCards(filmsListContainerElement, el.title, el.poster);
//   });

render(filmsListElement, createShowMoreButtonTemplate(), `beforeend`);
render(filmsListElement, createTopRatedTemplate(), `beforeend`);

const filmsListExtraElement = filmsElement.querySelector(`.films-list--extra`);
const topRatedElement = filmsListExtraElement.querySelector(`.films-list__title`).textContent;

console.dir(topRatedElement);

console.log(mainNavigationItemActive);


const footerElement = document.querySelector(`.footer`);
// render(footerElement, createFilmDetail(), `afterend`);

const onRenderDetail = () => {
  render(footerElement, createFilmDetail(), `afterend`);
  closeDetail();
};

const renderDetail = () => {
  const filmCardCollection = filmsListElement.querySelectorAll(`.film-card`);
  filmCardCollection.forEach((el) => {
    el.addEventListener(`click`, onRenderDetail);
  });
};

renderDetail();

const onCloseDetail = () => {
  const filmDetails = document.querySelector(`.film-details`);
  filmDetails.remove();
};

const closeDetail = () => {
  const filmDetailsClose = document.querySelector(`.film-details__close`);
  filmDetailsClose.addEventListener(`click`, onCloseDetail);
};
