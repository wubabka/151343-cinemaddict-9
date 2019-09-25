import AbstractComponent from "./abstract-component";
import moment from 'moment';
import 'moment-duration-format';

import {MAX_FILMCARD_DESCRIPTION, FILM_CONTROLS} from '../utils';

class FilmCard extends AbstractComponent {
  constructor({title, picture, description, rating, releaseDate, duration, genre, comments, userRating, inWatchlist, isWatched, isFavorite}) {
    super();
    this._title = title;
    this._picture = picture;
    this._description = description;
    this._rating = rating;
    this._releaseDate = releaseDate;
    this._duration = duration;
    this._genre = genre;
    this._commentsQuantity = comments.length;
    this._userRating = userRating;

    this._inWatchlist = inWatchlist;
    this._isWatched = isWatched;
    this._isFavorite = isFavorite;
  }

  _getDataByControlType(type) {
    switch (type) {
      case `watchlist`:
        return this._inWatchlist;
      case `watched`:
        return this._isWatched;
      case `favorite`:
        return this._isFavorite;
    }
    return null;
  }

  getTemplate() {
    return `
    <article class="film-card">
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${moment(this._releaseDate).format(`YYYY`)}</span>
        <span class="film-card__duration">${moment.duration(this._duration, `minutes`).format(`h[h] m[m]`)}</span>
        <span class="film-details__genre">${this._genre.values().next().value || ``}</span>
      </p>
      <img src="${this._picture}" alt="${this._title}" class="film-card__poster">
      <p class="film-card__description">${this._description.length > MAX_FILMCARD_DESCRIPTION ? this._description.substring(0, MAX_FILMCARD_DESCRIPTION) + `...` : this._description}</p>
      <a class="film-card__comments">${this._commentsQuantity} comments</a>
      <form class="film-card__controls">
      ${FILM_CONTROLS.map(({title, value, button}) => `
       <button
          class="film-card__controls-item button film-card__controls-item--${button} ${this._getDataByControlType(value) ? `film-card__controls-item--active` : ``}"
          name="${value}">${title}</button>
      `.trim()).join(``)}
      </form>
    </article>
    `.trim();
  }
}

export default FilmCard;
