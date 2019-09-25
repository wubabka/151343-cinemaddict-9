import AbstractComponent from './abstract-component';

class NavMenu extends AbstractComponent {
  getTemplate() {
    return `
      <nav class="main-navigation"></nav>
    `.trim();
  }
}

export default NavMenu;
