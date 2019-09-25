export const START_CARDS = 5;
export const MAX_FILMCARD_DESCRIPTION = 139;
export const MIN_SEARCH = 3;
export const EMOJIS = [`smile`, `sleeping`, `puke`, `angry`];

export const Position = {
  BEFOREBEGIN: `beforebegin`,
  BEFOREEND: `beforeend`,
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`
};

export const RATINGS = [
  {
    title: `Novice`,
    minRating: 1
  },
  {
    title: `Fan`,
    minRating: 10
  },
  {
    title: `Movie Buff`,
    minRating: 21
  }
];

export const FILM_CONTROLS = [
  {
    title: `Add to watchlist`,
    value: `watchlist`,
    button: `add-to-watchlist`
  },
  {
    title: `Already watched`,
    value: `watched`,
    button: `mark-as-watched`
  },
  {
    title: `Add to favorites`,
    value: `favorite`,
    button: `favorite`
  }
];

export const Api = {
  END_POINT: `https://htmlacademy-es-9.appspot.com/cinemaddict`,
  AUTHORIZATION: `Basic kukareku123`,
};

export const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

export const createElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case Position.BEFOREBEGIN:
      container.before(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.AFTEREND:
      container.after(element);
      break;
  }
};

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

export const getVariable = (variable) => {
  const root = document.querySelector(`:root`);
  const rootStyles = getComputedStyle(root);

  return rootStyles.getPropertyValue(variable);
};

export const debounce = (callback, time = 400, interval) =>
  (...args) => {
    clearTimeout(interval);
    interval = setTimeout(() => {
      callback(...args);
    }, time);
  };

export const getFilteredFilms = (films, filterType) => {
  switch (filterType) {
    case `stats`:
      return null;
    case `watchlist`:
      return films.filter((film) => film.inWatchlist);
    case `history`:
      return films.filter((film) => film.isWatched);
    case `favorites`:
      return films.filter((film) => film.isFavorite);
    case `all`:
      return films;
  }

  return null;
};
