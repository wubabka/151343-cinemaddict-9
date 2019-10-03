import SearchForm from '../components/search-form';
import NoResult from '../components/no-result';
import Loading from '../components/loading';
import NavController from '../controllers/nav-controller';
import StatisticController from '../controllers/statistic-controller';
import FilmsController from '../controllers/films-controller';
import SearchController from '../controllers/search-controller';
import ProfileController from '../controllers/profile-controller';
import {ApiClass} from '../api';
import {Position, render, unrender, Api} from '../utils';

class PageController {
  constructor(headerContainer, mainContainer) {
    this._headerContainer = headerContainer;
    this._mainContainer = mainContainer;

    this._searchForm = new SearchForm();
    this._noResult = new NoResult();
    this._api = new ApiClass({
      endPoint: Api.END_POINT,
      authorization: Api.AUTHORIZATION
    });
    this._filmCards = [];
    this._loading = new Loading();

    this._onDataChange = this._onDataChange.bind(this);
    this._onCommentsChange = this._onCommentsChange.bind(this);
    this._onInputClick = this._onInputClick.bind(this);
    this._showStatistic = this._showStatistic.bind(this);
    this._showFilteredFilmCards = this._showFilteredFilmCards.bind(this);
    this._onReset = this._onReset.bind(this);

    this._profileController = new ProfileController(this._headerContainer);
    this._navController = new NavController(this._mainContainer, this._showStatistic, this._showFilteredFilmCards);
    this._filmsController = new FilmsController(this._mainContainer, this._onDataChange, this._onCommentsChange);
    this._statisticController = new StatisticController(this._mainContainer);
    this._searchController = new SearchController(
        this._mainContainer, this._searchForm, this._onReset, this._onDataChange, this._onCommentsChange);
  }

  init() {
    render(this._mainContainer, this._loading.getElement(), Position.AFTERBEGIN);

    this._api.getFilms()
      .then((filmCards) => {
        this._filmCards = filmCards;

        this._renderHeader();
        this._renderMain();

        unrender(this._loading.getElement());

        document.querySelector(`.footer__statistics`)
          .firstElementChild
          .innerText = `${this._filmCards.length} movies inside`;
      });
  }

  _renderHeader() {
    render(this._headerContainer, this._searchForm.getElement(), Position.BEFOREEND);
    this._profileController.show(this._filmCards);
  }

  _renderMain() {
    this._navController.show(this._filmCards);

    if (!this._filmCards.length) {
      this._filmsController.hide();

      render(this._mainContainer, this._noResult.getElement(), Position.BEFOREEND);
    }

    this._filmsController.show(this._filmCards);
    this._searchForm
      .getElement()
      .querySelector(`.search__field`)
      .addEventListener(`click`, this._onInputClick);

    return null;
  }

  _showSearchForm() {
    this._navController.hide();
    this._statisticController.hide();
    this._filmsController.hide();

    this._searchController.show(this._filmCards);
  }

  _showStatistic() {
    this._filmsController.hide();

    this._statisticController.show(this._filmCards);
  }

  _showFilteredFilmCards(filmCards) {
    this._statisticController.hide();

    this._filmsController.show(filmCards);
  }

  _onDataChange(filmCard, isSearchOpen = false) {
    const userRating = document.querySelector(`.film-details__user-rating-score`);

    this._api.updateFilm({
      id: filmCard.id,
      data: filmCard.toRAW(),
    })
      .then(() => this._api.getFilms())
      .then((filmCards) => {
        if (isSearchOpen) {
          this._showSearchForm();
        }

        this._filmCards = filmCards;

        this._profileController.show(this._filmCards);
        this._navController.show(this._filmCards);
        this._filmsController.show(this._filmCards);

        userRating.style.pointerEvents = `auto`;
      })
      .catch(() => {
        if (userRating) {
          userRating.classList.remove(`shake`);
          userRating.classList.add(`shake`);
          userRating.style.pointerEvents = `auto`;
        }

        const userRatingList = document.querySelectorAll(`.film-details__user-rating-input`);

        userRatingList.forEach((el) => {
          el.checked = false;
          el.removeAttribute(`checked`);
        });
      });
  }

  _onCommentsChange({action, comment = null, filmId = null, commentId = null}) {
    switch (action) {
      case `get`:
        return this._api.getComments({filmId});
      case `create`:
        const commentInput = document.querySelector(`.film-details__comment-input`);

        this._api.createComment({
          comment,
          filmId,
        })
          .then(() => this._api.getFilms())
          .then((filmCards) => {
            this._filmCards = filmCards;
            this._filmsController.show(this._filmCards);
            commentInput.removeAttribute(`disabled`);
            commentInput.value = ``;
          })
          .catch(() => {
            commentInput.classList.add(`shake`);
            commentInput.removeAttribute(`disabled`);
          });
        break;
      case `delete`:
        this._api.deleteComment({
          filmId,
          commentId
        })
          .then(() => this._api.getFilms())
          .then((filmCards) => {
            this._filmCards = filmCards;
            this._filmsController.show(this._filmCards);
          });
    }

    return null;
  }

  _onInputClick(evt) {
    if (evt.key === `Enter`) {
      evt.preventDefault();

      return;
    }

    this._showSearchForm();
  }

  _onReset() {
    this._statisticController.hide();
    this._searchController.hide();

    this._navController.show(this._filmCards);
    this._filmsController.show(this._filmCards);
  }
}

export default PageController;
