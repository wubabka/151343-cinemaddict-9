import {Position, renderUtil} from "../utils";
import {Films} from "../components/films";
import {FilmsList} from "../components/films-list";
import {FilmsListContainer} from "../components/films-list-container";
import {FilmCard} from "../components/film-card";

export class PageController {
  constructor(container, filmCards) {
    this._container = container;
    this._filmCards = filmCards;
    this._films = new Films();
    this._filmsList = new FilmsList();
    this._filmsListContainer = new FilmsListContainer();
  }

  init() {
    renderUtil(this._container, this._films.getElement(), Position.BEFOREEND);
    renderUtil(this._films.getElement(), this._filmsList.getElement(), Position.BEFOREEND);
    renderUtil(this._filmsList.getElement(), this._filmsListContainer.getElement(), Position.BEFOREEND);

    const filmsListContainerElement = document.querySelector(`.films-list__container`);

    this._filmsListContainer = filmsListContainerElement;

    this._filmCards.forEach((filmCardMock) => this._renderFilmCard(filmCardMock));
  }

  _renderFilmCard(filmCard) {
    const filmCardComponent = new FilmCard(filmCard);

    renderUtil(this._filmsListContainer, filmCardComponent.getElement(), Position.BEFOREEND);
  }
}
