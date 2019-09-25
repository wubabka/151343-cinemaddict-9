import NavMenu from '../components/nav-menu';
import FilterController from '../controllers/filter-controller';
import {Position, getFilteredFilms, render, unrender} from '../utils';

const FILTERS = [
  {
    title: `All movies`,
    id: `all`,
    isCountable: false
  },
  {
    title: `Watchlist`,
    id: `watchlist`,
    isCountable: true
  },
  {
    title: `History`,
    id: `history`,
    isCountable: true
  },
  {
    title: `Favorites`,
    id: `favorites`,
    isCountable: true
  },
  {
    title: `Stats`,
    id: `stats`,
    isCountable: false
  }
];

class NavController {
  constructor(container, showStatistic, showFilteredFilms) {
    this._container = container;
    this._showStatistic = showStatistic;
    this._showFilteredFilms = showFilteredFilms;

    this._navMenu = new NavMenu();
    this._filmCards = [];
    this._currentFilter = `all`;
    this._filters = null;

    this._onNavLinkClick = this._onNavLinkClick.bind(this);
  }

  show(filmCards) {
    this._filmCards = filmCards;
    this._render();
  }

  hide() {
    this._unrender();
  }

  _render() {
    this._unrender();

    render(this._container, this._navMenu.getElement(), Position.AFTERBEGIN);

    this._filters = FILTERS.map((filter) =>
      new FilterController(this._navMenu.getElement(), filter));

    this._filters.forEach((filter) =>
      filter.set(this._filmCards));

    this._navMenu
      .getElement()
      .querySelectorAll(`.main-navigation__item`)
      .forEach((link) =>
        link.addEventListener(`click`, this._onNavLinkClick));
  }

  _unrender() {
    if (this._navMenu) {
      unrender(this._navMenu.getElement());
      this._navMenu.removeElement();
    }
  }

  _onNavLinkClick(evt) {
    const mainNavigationItemActive = this._navMenu
      .getElement()
      .querySelector(`.main-navigation__item--active`);

    if (evt.target === mainNavigationItemActive) {
      return;
    }

    this._currentFilter = evt.target.hash.replace(`#`, ``);

    mainNavigationItemActive.classList.remove(`main-navigation__item--active`);
    evt.target.classList.add(`main-navigation__item--active`);

    if (evt.target.classList.contains(`main-navigation__item--additional`)) {
      this._showStatistic();
    } else {
      this._showFilteredFilms(getFilteredFilms(this._filmCards, this._currentFilter));
    }
  }
}

export default NavController;
