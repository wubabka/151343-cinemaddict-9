export const createFilter = (title, count) => {
  return `<a href="#${title.toLowerCase()}" class="main-navigation__item">${title} <span class="main-navigation__item-count">${count}</span></a>`;
};
