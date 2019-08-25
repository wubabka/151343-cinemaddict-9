import {AbstractComponent} from "./abstract-component";

export class Navigation extends AbstractComponent {
  getTemplate() {
    return `<nav class="main-navigation">
              <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
              <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
            </nav>`;
  }
}