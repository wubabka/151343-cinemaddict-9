import Profile from '../components/profile';
import {Position, render, unrender} from '../utils';

class ProfileController {
  constructor(container) {
    this._container = container;

    this._profile = null;
    this._userRating = 0;
  }

  show(films) {
    this._userRating = this._getWatchedFilmsCount(films);
    this._render();
  }

  _render() {
    this._unrender();
    this._profile = new Profile({userRating: this._userRating});
    render(this._container, this._profile.getElement(), Position.BEFOREEND);
  }

  _unrender() {
    if (this._profile) {
      unrender(this._profile.getElement());
      this._profile.removeElement();
    }
  }

  _getWatchedFilmsCount(films) {
    return films.filter((film) => film.isWatched).length;
  }
}

export default ProfileController;
