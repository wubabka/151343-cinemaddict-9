import FilmCardController from './film-card-controller';

class FilmListController {
  constructor(container, onDataChange, onCommentsChange) {
    this._container = container;
    this._onDataChangeOwn = onDataChange;
    this._onCommentsChangeOwn = onCommentsChange;

    this._filmCards = [];
    this._subscriptions = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onCommentsChange = this._onCommentsChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
  }

  set(filmCards) {
    this._filmCards = filmCards;
    this._subscriptions = [];

    this._container.innerHTML = ``;
    this._filmCards.forEach((filmCard) => this._render(filmCard));
  }

  add(filmCards) {
    filmCards.forEach((filmCard) => this._render(filmCard));
    this._filmCards = [...this._filmCards, ...filmCards];
  }

  _render(filmCard) {
    const filmCardController = new FilmCardController(this._container, filmCard, this._onChangeView, this._onDataChange, this._onCommentsChange);

    this._subscriptions.push(filmCardController.setView.bind(filmCardController));
  }

  _onDataChange(filmCard) {
    this._onDataChangeOwn(filmCard);
  }

  _onCommentsChange(comment) {
    return this._onCommentsChangeOwn(comment);
  }

  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }
}

export default FilmListController;
