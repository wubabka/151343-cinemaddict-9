import AbstractComponent from './abstract-component';

class NoResult extends AbstractComponent {
  getTemplate() {
    return `
    <div class="no-result">There are no movies in our database.</div>
  `.trim();
  }
}

export default NoResult;
