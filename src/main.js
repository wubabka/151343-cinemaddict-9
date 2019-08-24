import {Search} from "./components/search.js";
import {createProfileTemplate} from "./components/profile.js";
import {createMenuTemplate} from "./components/menu.js";
import {createSortTemplate} from "./components/sort.js";
// import { createCatalogTemplate } from "./components/catalog.js";
// import { createShowMoreButtonTemplate } from "./components/show-more-button.js";
// import { createTopRatedTemplate } from "./components/top-rated.js";
import {createFilter} from "./components/filter";
// import { createFilmDetail } from "./components/film-details";

import {getFilmCard, getFilter} from "./data";
import {Position, renderUtil} from "./utils";
import {PageController} from "./controllers/page-controller";
import {FilmCard} from "./components/film-card.js";
import {Films} from "./components/films";
import {FilmsList} from "./components/films-list";
import {FilmsListContainer} from "./components/films-list-container";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector(`.header`);

const search = new Search();

// render(headerElement, search.getTemplate(), `beforeend`);
renderUtil(headerElement, search.getElement(), Position.BEFOREEND);
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

// cards
const CARD_COUNT = 3;
const filmCardMocks = new Array(CARD_COUNT)
  .fill(``)
  .map(getFilmCard);

const renderCatalog = () => {
  const films = new Films();
  renderUtil(mainElement, films.getElement(), Position.BEFOREEND);
  const filmsElement = document.querySelector(`.films`);

  const filmsList = new FilmsList();
  renderUtil(filmsElement, filmsList.getElement(), Position.BEFOREEND);
  const filmsListElement = filmsElement.querySelector(`.films-list`);


  const filmsListContainer = new FilmsListContainer();
  renderUtil(filmsElement, filmsListContainer.getElement(), Position.BEFOREEND);
  const filmsListContainerElement = filmsElement.querySelector(`.films-list__container`);

  console.log(filmsElement);
  console.log(filmsListElement);
  console.log(filmsListContainerElement);
};

// renderCatalog();

console.log(filmCardMocks);


const pageController = new PageController(mainElement, filmCardMocks);
pageController.init();


// const renderFilmCard = (filmCardMock) => {
//   const filmCard = new FilmCard(filmCardMock);

//   renderUtil(filmsListContainerElement, filmCard.getElement(), Position.BEFOREEND);
// };

// filmCardMocks.forEach((filmCardMock) => renderFilmCard(filmCardMock));


// render(filmsListElement, createShowMoreButtonTemplate(), `beforeend`);
// render(filmsListElement, createTopRatedTemplate(), `beforeend`);

// const footerElement = document.querySelector(`.footer`);
// render(footerElement, createFilmDetail(), `afterend`);

// const onRenderDetail = () => {
//   render(footerElement, createFilmDetail(), `afterend`);
//   closeDetail();
// };

// const renderDetail = () => {
//   const filmCardCollection = filmsListElement.querySelectorAll(`.film-card`);
//   filmCardCollection.forEach((el) => {
//     el.addEventListener(`click`, onRenderDetail);
//   });
// };

// renderDetail();

// const onCloseDetail = () => {
//   const filmDetails = document.querySelector(`.film-details`);
//   filmDetails.remove();
// };

// const closeDetail = () => {
//   const filmDetailsClose = document.querySelector(`.film-details__close`);
//   filmDetailsClose.addEventListener(`click`, onCloseDetail);
// };
