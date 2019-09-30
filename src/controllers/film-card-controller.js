import FilmCard from '../components/film-card';
import FilmCardDetails from '../components/film-card-details';
import {Position, render, unrender, Api} from '../utils';
import {API} from '../api';

class FilmCardController {
  constructor(container, data, onChangeView, onDataChange, onCommentsChange) {
    this._container = container;
    this._data = data;
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
    this._onCommentsChange = onCommentsChange;

    this._filmCard = new FilmCard(data);
    this._filmCardElement = this._filmCard.getElement();
    this._filmCardDetails = {};
    this._api = new API({
      endPoint: Api.END_POINT,
      authorization: Api.AUTHORIZATION
    });

    this._onClosePopupClick = this._onClosePopupClick.bind(this);
    this._onOpenPopupClick = this._onOpenPopupClick.bind(this);
    this._onControlClick = this._onControlClick.bind(this);
    this._onChangeUserRating = this._onChangeUserRating.bind(this);
    this._onCommentDelete = this._onCommentDelete.bind(this);
    this._onAddCommentEnterKey = this._onAddCommentEnterKey.bind(this);
    this._onEscKey = this._onEscKey.bind(this);

    this.init();
  }

  init() {
    this._renderFilm();
  }

  setView(view = `default`) {
    if (document.body.contains(this._filmCardDetailsElement)) {
      unrender(this._filmCardDetailsElement);
      this._filmCardDetails.removeElement();
    }

    if (view === `details`) {
      this._initFilmDetails();
    }
  }

  _renderFilm() {
    this._filmCardElement.addEventListener(`click`, this._onOpenPopupClick);
    this._filmCardElement
      .querySelectorAll(`.film-card__controls-item`)
      .forEach((button) => {
        button.addEventListener(`click`, this._onControlClick);
      });

    render(this._container, this._filmCardElement, Position.BEFOREEND);
  }

  _initFilmDetails() {
    this._api.getComments(this._data.id)
      .then((comments) => {
        this._filmCardDetails = new FilmCardDetails(this._data, comments);
        this._renderFilmDetails();
      });
  }

  _renderFilmDetails() {
    this._filmCardDetailsElement = this._filmCardDetails.getElement();

    document.addEventListener(`click`, (evt) => {
      const filmCardDetailsElement = document.querySelector(`.film-details`);

      if (evt.path.some((el) => el === filmCardDetailsElement)) {
        return;
      } else {
        this._onClosePopupClick();
      }
    });

    const filmDetailsCommentInput = this._filmCardDetailsElement.querySelector(`.film-details__comment-input`);

    filmDetailsCommentInput.addEventListener(`focus`, () =>
      document.removeEventListener(`keydown`, this._onEscKey));
    filmDetailsCommentInput.addEventListener(`blur`, () =>
      document.addEventListener(`keydown`, this._onEscKey));
    filmDetailsCommentInput.addEventListener(`keydown`, this._onAddCommentEnterKey);

    this._filmCardDetailsElement
      .querySelectorAll(`.film-details__comment-delete`)
      .forEach((button) => {
        button.addEventListener(`click`, this._onCommentDelete);
      });

    if (this._data.isWatched) {
      this._filmCardDetailsElement
        .querySelectorAll(`.film-details__user-rating-input`)
        .forEach((el) =>
          el.addEventListener(`change`, this._onChangeUserRating));

      this._filmCardDetailsElement
        .querySelector(`.film-details__watched-reset`)
        .addEventListener(`click`, this._onChangeUserRating);
    }

    this._filmCardDetailsElement
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._onClosePopupClick);

    this._filmCardDetailsElement
      .querySelectorAll(`.film-details__controls`)
      .forEach((input) =>
        input.addEventListener(`change`, this._onControlClick));

    this._onChangeView();

    render(document.body, this._filmCardDetailsElement, Position.BEFOREEND);

    document.addEventListener(`keydown`, this._onEscKey);
  }

  _onOpenPopupClick() {
    this.setView(`details`);
  }

  _onClosePopupClick() {
    this.setView(`default`);
  }

  _onChangeUserRating(evt) {
    this._onDataChange(Object.assign(this._data, {userRating: evt.target.value || 0}));

    evt.target.parentElement.style.pointerEvents = `none`;
  }

  _onCommentDelete(evt) {
    this._onCommentsChange({
      action: `delete`,
      filmId: this._data.id,
      commentId: evt.target.dataset.id
    });

    this.setView(`details`);
  }

  _onAddCommentEnterKey(evt) {
    if (!evt.target.value.trim() || !(evt.key === `Enter` && (evt.ctrlKey || evt.metaKey))) {
      return;
    } else {
      evt.target.setAttribute(`disabled`, `disabled`);
    }

    evt.preventDefault();
    evt.stopPropagation();

    const checkedEmoji = [...this._filmCardDetails
      .getElement()
      .querySelectorAll(`input[name=comment-emoji]`)]
      .filter((input) => input.checked)[0].value;

    this._onCommentsChange({
      action: `create`,
      comment: {
        comment: evt.target.value,
        date: new Date(),
        emotion: String(checkedEmoji)
      },
      filmId: this._data.id
    });

    this.setView(`details`);
  }

  _onEscKey(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this._onClosePopupClick();
      document.removeEventListener(`keydown`, this._onEscKey);
    }
  }

  _onControlClick(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    const userRating = !this._data.isWatched ? 0 : this._data._userRating || 0;
    const watchedDate = this._data.isWatched ? null : new Date();

    const getNewPropertiesValue = () => {
      switch (evt.target.name) {
        case `watchlist`:
          return {inWatchlist: !this._data.inWatchlist};
        case `watched`:
          return {isWatched: !this._data.isWatched, userRating, watchedDate};
        case `favorite`:
          return {isFavorite: !this._data.isFavorite};
      }

      return null;
    };

    this._onDataChange(Object.assign(this._data, getNewPropertiesValue()));
  }
}

export default FilmCardController;
