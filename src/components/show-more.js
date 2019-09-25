import AbstractComponent from './abstract-component';

class ShowMore extends AbstractComponent {
  getTemplate() {
    return `
      <button class="films-list__show-more">Show more</button>
  `.trim();
  }
}

export default ShowMore;
