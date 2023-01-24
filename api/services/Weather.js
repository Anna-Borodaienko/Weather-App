import { apiWeather } from '../controllers/Weather';

class WeatherService {

  async getWeather (location) {

    const params = {
      lat: location[0],
      lon: location[1],
      units: 'metric',
      exclude: 'minutely,alerts',
    }

   const weather = await apiWeather.get(params);

   return weather;
  }
}

export const weatherService = new WeatherService();
