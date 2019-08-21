import {createElement} from "../utils";

export class FilmCard {
  constructor({title, poster, description, rating, year, duration, genres, commentCount}) {
    this._title = title;
    this._poster = poster;
    this._description = description;
    this._rating = rating;
    this._year = year;
    this._duration = duration;
    this._genres = genres;
    this._commentCount = commentCount;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `<article class="film-card">
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${this._year}</span>
        <span class="film-card__duration">${this._duration}</span>
        <span class="film-card__genre">${this._genres}</span>
      </p>
      <img src="./images/posters/${this._poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${this._description.sort(() => {
    return Math.random() - 0.5;
  }).slice(1, 3).join(``)}</p>
      <a class="film-card__comments">${this._commentCount} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`;
  }
}
