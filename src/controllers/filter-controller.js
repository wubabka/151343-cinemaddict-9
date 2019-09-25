import Filter from '../components/filter';
import {Position, render, getFilteredFilms} from '../utils';

class FilterController {
  constructor(container, filter) {
    this._container = container;
    this._filter = filter;

    this._id = this._filter.id;
    this._title = this._filter.title;
    this._count = null;

    this._isCountable = this._filter.isCountable;
    this._isActive = this._id === `all`;
    this._isAdditional = this._id === `stats`;
  }

  set(films) {
    this._count = (getFilteredFilms(films, this._id) || []).length;
    this._render();
  }

  _render() {
    this._filter = new Filter({
      id: this._id,
      title: this._title,
      count: this._count,
      isActive: this._isActive,
      isAdditional: this._isAdditional,
      isCountable: this._isCountable,
    });

    render(this._container, this._filter.getElement(), Position.BEFOREEND);
  }
}

export default FilterController;
