import axios from 'axios';
import qs from 'qs';

class API_Weather {
  API_key_weather = 'fdedab4cf64f09bcf6cf202c5ad2426a';
  BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';

  async get(params) {
    const { data } = await axios.get(`${this.BASE_URL}?appid=${this.API_key_weather}&${qs.stringify(params)}`);

    return data;
  }
};

export const apiWeather = new API_Weather();
