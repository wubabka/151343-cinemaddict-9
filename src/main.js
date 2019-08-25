import {Search} from "./components/search.js";
import {Profile} from "./components/profile.js";
import {Navigation} from "./components/navigation";
import {Filter} from "./components/filter";

import {getProfile, getFilmCard, getFilter} from "./data";
import {Position, render} from "./utils";
import {PageController} from "./controllers/page-controller";

const headerElement = document.querySelector(`.header`);

// Search enter
const search = new Search();
render(headerElement, search.getElement(), Position.BEFOREEND);
// Search leave

// Profile enter
const profile = new Profile(getProfile());
render(headerElement, profile.getElement(), Position.BEFOREEND);
// Profile leave

const mainElement = document.querySelector(`.main`);

// Navigation enter
const navigation = new Navigation();
render(mainElement, navigation.getElement(), Position.BEFOREEND);

const mainNavigationItemActive = document.querySelector(`.main-navigation__item--active`);

getFilter().forEach((el) => {
  const filter = new Filter(el.title, el.count);
  render(mainNavigationItemActive, filter.getElement(), Position.AFTEREND);
});
// Navigation leave

// FilmsListContainer enter
const CARD_COUNT = 5;
const filmCardMocks = new Array(CARD_COUNT)
  .fill(``)
  .map(getFilmCard);

const pageController = new PageController(mainElement, filmCardMocks);
pageController.init();
// FilmsListContainer leave
