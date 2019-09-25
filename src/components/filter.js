import AbstractComponent from './abstract-component';

class Filter extends AbstractComponent {
  constructor({id, title, count, isActive, isCountable, isAdditional}) {
    super();
    this._id = id;
    this._title = title;
    this._count = count;

    this._isActive = isActive;
    this._isAdditional = isAdditional;
    this._isCountable = isCountable;
  }

  getTemplate() {
    return `
       <a
         href="#${this._id}"
         class="main-navigation__item ${this._isActive ? `main-navigation__item--active` : ``} ${this._isAdditional ? `main-navigation__item--additional` : ``}">
          ${this._title}
          ${this._isCountable ? `<span class="main-navigation__item-count">${this._count}</span>` : ``}
      </a>
    `.trim();
  }
}

export default Filter;
