import SearchResultInfo from '../components/search-result-info';
import SearchResultGroup from '../components/search-result-group';
import FilmListController from './film-list-controller';
import {Position, render, unrender, debounce, MIN_SEARCH} from '../utils';

class SearchController {
  constructor(container, searchForm, onResetSearch, onDataChange, onCommentsChange) {
    this._container = container;
    this._searchForm = searchForm;
    this._onResetSearch = onResetSearch;
    this._onDataChangeOwn = onDataChange;
    this._onCommentsChangeOwn = onCommentsChange;

    this._filmCards = [];
    this._searchInput = ``;
    this._searchResultInfo = new SearchResultInfo({});
    this._searchResultGroup = new SearchResultGroup();
    this._searchField = this._searchForm.getElement().querySelector(`.search__field`);

    this._onDataChange = this._onDataChange.bind(this);
    this._onCommentsChange = this._onCommentsChange.bind(this);
    this._onResetClick = this._onResetClick.bind(this);
    this._onKeyup = this._onKeyup.bind(this);

    this._filmListController = new FilmListController(
        this._searchResultGroup.getElement().querySelector(`.films-list__container`), this._onDataChange, this._onCommentsChange);
  }

  show(filmCards) {
    this._filmCards = filmCards;
    this._render();
    this._find(this._searchInput);
  }

  hide() {
    this._unrender();
  }

  _render() {
    render(this._container, this._searchResultInfo.getElement(), Position.AFTERBEGIN);
    render(this._container, this._searchResultGroup.getElement(), Position.BEFOREEND);

    this._searchForm
      .getElement()
      .querySelector(`.search__reset`)
      .addEventListener(`click`, this._onResetClick);

    this._searchField.addEventListener(`keyup`, debounce(this._onKeyup, 400));
  }

  _unrender() {
    unrender(this._searchResultInfo.getElement());
    unrender(this._searchResultGroup.getElement());
  }

  _find(query) {
    this._searchInput = query;

    const filmCards = this._filmCards
      .filter((filmCard) =>
        filmCard.title
          .toLowerCase()
          .includes(query.toLowerCase()));

    this._showSearchResult(query, filmCards);
  }

  _showSearchResult(query, films) {
    if (this._searchResultInfo) {
      unrender(this._searchResultInfo.getElement());
      this._searchResultInfo.removeElement();
    }

    this._searchResultInfo = new SearchResultInfo({counter: films.length});

    render(this._container, this._searchResultInfo.getElement(), Position.AFTERBEGIN);

    this._filmListController.set(films);
  }

  _onKeyup(evt) {
    const {value} = evt.target;

    if (!value) {
      return this._onResetClick();
    }

    if (value.length >= MIN_SEARCH) {
      this._find(value);
    }

    return null;
  }

  _onResetClick() {
    this._searchField.value = ``;
    this._searchField.blur();
    this._searchInput = ``;
    this._onResetSearch();
  }

  _onDataChange(filmCard) {
    this._onDataChangeOwn(filmCard, true);
  }

  _onCommentsChange(comment) {
    this._onCommentsChangeOwn(comment, true);
  }
}

export default SearchController;
