import Films from '../components/films';
import Sorting from '../components/sorting';
import ShowMore from '../components/show-more';
import FilmSection from '../components/film-section';
import FilmListController from './film-list-controller';
import {START_CARDS, Position, render, unrender} from '../utils';

const FILM_FILTERS = [
  {
    title: `All movies. Upcoming`,
    isExtra: false
  },
  {
    title: `Top rated movies`,
    isExtra: true
  },
  {
    title: `Most commented`,
    isExtra: true
  }
];

class FilmsController {
  constructor(container, onDataChange, onCommentsChange) {
    this._container = container;
    this._onDataChangeOwn = onDataChange;
    this._onCommentsChangeOwn = onCommentsChange;

    this._filmCards = [];
    this._films = new Films();
    this._sorting = new Sorting();
    this._showMore = new ShowMore();
    this._showedFilms = null;
    this._currentSorting = `default`;

    this._onDataChange = this._onDataChange.bind(this);
    this._onCommentsChange = this._onCommentsChange.bind(this);
    this._onClickMore = this._onClickMore.bind(this);

    this._init();

    this._filmsContainerList = document.querySelectorAll(`.films-list__container`);

    this._filmListController = new FilmListController(this._filmsContainerList[0], this._onDataChange, this._onCommentsChange);
    this._filmListTopRatedController = new FilmListController(this._filmsContainerList[1], this._onDataChange, this._onCommentsChange);
    this._filmListMostCommentedController = new FilmListController(this._filmsContainerList[2], this._onDataChange, this._onCommentsChange);
  }

  show(filmCards) {
    if (filmCards !== this._filmCards) {
      this._set(filmCards);
    }

    this._sorting.getElement().classList.remove(`visually-hidden`);
    this._films.getElement().classList.remove(`visually-hidden`);
  }

  hide() {
    this._sorting.getElement().classList.add(`visually-hidden`);
    this._films.getElement().classList.add(`visually-hidden`);
  }

  _init() {
    render(this._container, this._sorting.getElement(), Position.BEFOREEND);
    render(this._container, this._films.getElement(), Position.BEFOREEND);

    FILM_FILTERS.forEach((section) =>
      render(this._films.getElement(), new FilmSection(section).getElement(), Position.BEFOREEND));

    this._sorting.getElement()
      .addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }

  _getSortedFilmCards(filmCards, sortType) {
    switch (sortType) {
      case `default`:
        return filmCards;
      case `date`:
        return filmCards.slice().sort((a, b) =>
          new Date(b.releaseDate) - new Date(a.releaseDate));
      case `rating`:
        return filmCards.slice().sort((a, b) =>
          b.rating - a.rating);
    }

    return null;
  }

  _getRandomItem(items = []) {
    return items[Math.floor(Math.random() * Math.floor(items.length))];
  }

  _getRandomItems(items = [], size = 1) {
    const randomItems = new Set();

    for (let i = 0; i <= size; i++) {
      const item = this._getRandomItem(items);
      randomItems.add(item);
    }

    return [...randomItems];
  }

  _getSortingValue(item, sortBy) {
    return sortBy === `rating` ? item.rating : item.comments.length;
  }

  _getMostFilm(array, findBy) {
    const sorted = array.sort((a, b) =>
      this._getSortingValue(b, findBy) - this._getSortingValue(a, findBy));
    const first = this._getSortingValue(sorted[0], findBy);
    const last = this._getSortingValue(sorted[sorted.length - 1], findBy);

    if (first && last !== 0) {
      return first === last ?
        this._getRandomItems(sorted, 2) : sorted.slice(0, 2);
    }

    return null;
  }

  _set(filmCards) {
    this._filmCards = this._getSortedFilmCards(filmCards, this._currentSorting);
    this._showedFilms = this._showedFilms ? this._showedFilms : START_CARDS;

    this._render();
  }

  _render() {
    this._unrenderShowMore();

    if (this._showedFilms < this._filmCards.length) {
      this._renderShowMore();
    }

    this._filmListController.set(this._filmCards.slice(0, this._showedFilms));
    this._filmListTopRatedController.set(this._getMostFilm([...this._filmCards], `rating`));
    this._filmListMostCommentedController.set(this._getMostFilm([...this._filmCards], `comment`));
  }

  _renderShowMore() {
    const filmsListElement = document.querySelector(`.films-list`);
    const showMoreElement = this._showMore.getElement();

    render(filmsListElement, showMoreElement, Position.BEFOREEND);
    showMoreElement.addEventListener(`click`, this._onClickMore);
  }

  _unrenderShowMore() {
    if (this._showedFilms >= this._filmCards.length) {
      unrender(this._showMore.getElement());
      this._showMore.removeElement();
    }
  }

  _onClickMore() {
    this._filmListController.add(this._filmCards.slice(this._showedFilms, this._showedFilms + START_CARDS));
    this._showedFilms += START_CARDS;

    this._unrenderShowMore();
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.className !== `sort__button`) {
      return;
    }

    document.querySelector(`.sort__button--active`).classList.remove(`sort__button--active`);
    evt.target.classList.add(`sort__button--active`);

    this._currentSorting = evt.target.dataset.sortType;
    this._filmListController
      .set(this._getSortedFilmCards(this._filmCards, evt.target.dataset.sortType)
        .slice(0, this._showedFilms));
  }

  _onDataChange(filmCard) {
    this._onDataChangeOwn(filmCard);
  }

  _onCommentsChange(comment) {
    return this._onCommentsChangeOwn(comment);
  }
}

export default FilmsController;
