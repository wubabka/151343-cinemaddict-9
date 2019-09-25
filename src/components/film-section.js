import AbstractComponent from './abstract-component';

class FilmSection extends AbstractComponent {
  constructor({title, isExtra}) {
    super();
    this._title = title;

    this._isExtra = isExtra;
  }

  getTemplate() {
    return `
      <section class="${this._isExtra ? `films-list--extra` : `films-list`}">
        <h2 class="films-list__title ${!this._isExtra ? `visually-hidden` : ``}">
          ${this._title}
        </h2>
        <div class="films-list__container"></div>
      </section>
    `.trim();
  }
}

export default FilmSection;
