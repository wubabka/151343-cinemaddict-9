import AbstractComponent from './abstract-component';

class Loading extends AbstractComponent {
  getTemplate() {
    return `
    <div class="loading">Loading...</div>
  `.trim();
  }
}

export default Loading;
