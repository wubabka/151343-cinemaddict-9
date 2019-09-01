import {Position, render, unrender} from "../utils";
import {Films} from "../components/films";
import {FilmsList} from "../components/films-list";
import {FilmsListContainer} from "../components/films-list-container";
import {FilmCard} from "../components/film-card";
import {Sort} from "../components/sort";
import {ShowMoreButton} from "../components/show-more-button";
import {TopRated} from "../components/top-rated";
import {MostCommented} from "../components/most-commented";
import {FilmDetails} from "../components/film-details";
import {MovieController} from "../controllers/movie-controller";

export class PageController {
  constructor(container, filmCards) {
    this._container = container;
    this._filmCards = filmCards;
    this._sort = new Sort();
    this._films = new Films();
    this._filmsList = new FilmsList();
    this._filmsListContainer = new FilmsListContainer();
    this._showMoreButton = new ShowMoreButton();
    this._topRated = new TopRated();
    this._mostCommented = new MostCommented();

    this._subscriptions = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
  }

  init() {
    render(this._container, this._sort.getElement(), Position.BEFOREEND);
    render(this._container, this._films.getElement(), Position.BEFOREEND);
    render(this._films.getElement(), this._filmsList.getElement(), Position.BEFOREEND);
    render(this._filmsList.getElement(), this._filmsListContainer.getElement(), Position.BEFOREEND);
    render(this._filmsList.getElement(), this._showMoreButton.getElement(), Position.BEFOREEND);
    render(this._filmsList.getElement(), this._showMoreButton.getElement(), Position.BEFOREEND);
    render(this._films.getElement(), this._topRated.getElement(), Position.BEFOREEND);
    render(this._films.getElement(), this._mostCommented.getElement(), Position.BEFOREEND);

    this._filmCards.forEach((filmCardMock) => this._renderFilmCard(filmCardMock));

    this._filmCards.slice(0, 2).forEach((filmCardMock) => this._renderTopRatedFilmCard(filmCardMock));

    this._filmCards.slice(0, 2).forEach((filmCardMock) => this._renderMostCommentedFilmCard(filmCardMock));

    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }

  _renderFilmCard(filmCard) {
    const filmCardComponent = new FilmCard(filmCard);
    const filmDetailsComponent = new FilmDetails(filmCard);

    filmCardComponent.getElement()
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();

        const footerElement = document.querySelector(`.footer`);
        render(footerElement, filmDetailsComponent.getElement(), Position.AFTEREND);

        const filmDetailsCloseBtn = document.querySelector(`.film-details__close-btn`);
        filmDetailsCloseBtn.addEventListener(`click`, this._onHideFilmDetails);
      });

    const filmsListContainerElement = document.querySelector(`.films-list__container`);

    render(filmsListContainerElement, filmCardComponent.getElement(), Position.BEFOREEND);
  }

  _onDataChange(newData, oldData) {
    this._filmCards[this._filmCards.findIndex((it) => it === oldData)] = newData;
    this._renderBoard(this._filmCards);
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _renderTopRatedFilmCard(filmCard) {
    const filmCardComponent = new FilmCard(filmCard);
    const filmsListContainerTopRatedElement = document.querySelector(`.films-list__container--top-rated`);

    render(filmsListContainerTopRatedElement, filmCardComponent.getElement(), Position.BEFOREEND);
  }

  _renderMostCommentedFilmCard(filmCard) {
    const filmCardComponent = new FilmCard(filmCard);
    const filmsListContainerTopRatedElement = document.querySelector(`.films-list__container--most-commented`);

    render(filmsListContainerTopRatedElement, filmCardComponent.getElement(), Position.BEFOREEND);
  }

  _onHideFilmDetails(evt) {
    evt.preventDefault();

    const filmDetails = document.querySelector(`.film-details`);
    unrender(filmDetails);
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._filmsListContainer.getElement().innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `date`:
        const sortedByDateFilmCards = this._filmCards.slice().sort((a, b) => a.year - b.year);
        sortedByDateFilmCards.forEach((filmCardMock) => this._renderFilmCard(filmCardMock));
        break;
      case `rating`:
        const sortedByRatingFilmCards = this._filmCards.slice().sort((a, b) => b.rating - a.rating);
        sortedByRatingFilmCards.forEach((filmCardMock) => this._renderFilmCard(filmCardMock));
        break;
      case `default`:
        this._filmCards.forEach((filmCardMock) => this._renderFilmCard(filmCardMock));
        break;
    }
  }
}
