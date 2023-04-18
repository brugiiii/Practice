import axios from 'axios';

export default class Api {
  constructor() {
    this.page = 1;
    this._query = '';
    this.BASE_URL = 'https://api.themoviedb.org/';
    this.KEY = '83584156b00a2d23d72a1dbc78073946';
  }

  async fetchPopular() {
    const res = await axios.get(
      `${this.BASE_URL}3/trending/movie/day?api_key=${this.KEY}`
    );

    return res.data.results;
  }

  async fetchGenresList() {
    const res = await axios.get(
      `${this.BASE_URL}3/genre/movie/list?api_key=${this.KEY}`
    );

    return res.data.genres;
  }

  async fetchById(id) {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${this.KEY}&language=en-US`
    );

    return res.data;
  }
}
