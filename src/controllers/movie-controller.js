import {FilmCard} from "../components/film-card";
import {FilmDetails} from "../components/film-details";

export class MovieController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._filmCard = new FilmCard(data);
    this._filmDetails = new FilmDetails(data);

    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
  }
}
