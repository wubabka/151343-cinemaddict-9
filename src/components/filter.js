import {AbstractComponent} from "./abstract-component";

export class Filter extends AbstractComponent {
  constructor(title, count) {
    super();
    this._title = title;
    this._count = count;
  }

  getTemplate() {
    return `<a href="#${this._title.toLowerCase()}" class="main-navigation__item">${this._title} <span class="main-navigation__item-count">${this._count}</span></a>`;
  }
}
