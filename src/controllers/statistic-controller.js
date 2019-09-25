import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';

import Statistics from '../components/statistic';
import {Position, getFilteredFilms, unrender, render, getVariable} from '../utils';

class StatisticController {
  constructor(container) {
    this._container = container;

    this._statistic = null;
    this._currentFilter = `all-time`;
    this._watchedFilms = [];
    this._filteredFilms = [];
    this._watchedQuantity = null;
    this._watchedDuration = null;
    this._allGenres = [];
    this._topGenre = null;
    this._chart = null;

    this._onFilterClick = this._onFilterClick.bind(this);
  }

  show(films, condition) {
    this._set(films, condition);
    this._render();
  }

  hide() {
    this._unrender();
  }

  _render() {
    this._unrender();

    this._statistic = new Statistics({
      rank: this._watchedFilms.length,
      watchedQuantity: this._watchedQuantity,
      watchedDuration: this._watchedDuration,
      topGenre: this._topGenre,
      currentFilter: this._currentFilter,
    });

    render(this._container, this._statistic.getElement(), Position.BEFOREEND);
    this._initChart();

    this._statistic.getElement().querySelectorAll(`.statistic__filters-input`)
      .forEach((input) =>
        input.addEventListener(`click`, this._onFilterClick));
  }

  _unrender() {
    if (this._statistic) {
      unrender(this._statistic.getElement());
      this._statistic.removeElement();
    }
  }

  _set(films, condition = `new`) {
    if (condition === `new`) {
      this._watchedFilms = getFilteredFilms(films, `history`);
      this._filteredFilms = this._getWatchedFilms(this._watchedFilms, this._currentFilter);
    } else {
      this._filteredFilms = films;
    }

    this._watchedQuantity = this._filteredFilms.length;
    this._watchedDuration = this._filteredFilms.reduce((sum, film) =>
      sum + film.duration, 0);

    this._allGenres = this._filteredFilms
      .map((film) => [...film.genre])
      .reduce((items, genre) =>
        items.concat(genre));

    this._topGenre = this._getMostFrequents(this._allGenres)[0];
  }

  _getWatchedFilms(watchedFilms, period) {
    switch (period) {
      case `all-time`:
        return watchedFilms;
      case `today`:
        return watchedFilms.filter((film) =>
          moment().isSame(moment(film.watchedDate), `day`));
      case `week`:
        return watchedFilms.filter((film) =>
          moment(film.watchedDate) > moment().subtract(1, `w`));
      case `month`:
        return watchedFilms.filter((film) =>
          moment(film.watchedDate) > moment().subtract(1, `months`));
      case `year`:
        return watchedFilms.filter((film) =>
          moment(film.watchedDate) > moment().subtract(1, `y`));
    }

    return null;
  }

  _getCounts(items) {
    const counts = items.reduce((accum, current) => {
      accum[current] = (accum[current] || 0) + 1;

      return accum;
    }, {});

    return Object.keys(counts)
      .sort((a, b) => counts[b] - counts[a])
      .reduce((obj, key) =>
        (Object.assign({}, obj, {[key]: counts[key]})), {});
  }

  _getMostFrequents(items) {
    const counts = this._getCounts(items);
    const maxCount = Math.max(...Object.values(counts));

    return Object
      .keys(counts)
      .filter((k) =>
        counts[k] === maxCount);
  }

  _getChart() {
    const labels = Object.keys(this._getCounts(this._allGenres));
    const data = Object.values(this._getCounts(this._allGenres));

    const barData = {
      labels,
      datasets: [
        {
          data,
          backgroundColor: getVariable(`--text-color-active`),
          hoverBackgroundColor: getVariable(`--text-color-average`),
          anchor: `start`,
        },
      ],
    };

    const barOptions = {
      scales: {
        yAxes: [{
          barThickness: 24,
          ticks: {
            fontColor: getVariable(`--text-color`),
            padding: 80,
            fontSize: 24,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
        }],
      },
      plugins: {
        datalabels: {
          font: {size: 24},
          color: getVariable(`--text-color`),
          anchor: `start`,
          align: `start`,
          offset: 40,
        },
      },
      legend: {display: false},
      tooltips: {enabled: false},
    };

    return {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: barData,
      options: barOptions,
    };
  }

  _initChart() {
    const chart = this._statistic.getElement().querySelector(`.statistic__chart`);
    this._chart = new Chart(chart, this._getChart());
  }

  _onFilterClick(evt) {
    this._currentFilter = evt.target.value;
    this.show(this._getWatchedFilms(this._watchedFilms, evt.target.value), `update`);
  }
}

export default StatisticController;
