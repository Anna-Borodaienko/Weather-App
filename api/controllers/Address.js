import axios from 'axios';
import qs from 'qs';

class API_Address {
  API_key_address = 'pk.fc03afa61d4356d78259c7c825649670';
  BASE_URL = 'https://eu1.locationiq.com/v1/';

  async get(url, params) {
    const {data} = await axios.get(`${this.BASE_URL}/${url}?key=${this.API_key_address}&${qs.stringify(params)}`);

    return data;
  }
};

export const apiAddress = new API_Address();
