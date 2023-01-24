import { apiAddress } from "../controllers/Address";

class AddressService {
  endpoint = '/reverse';

  async getAddress (location) {

    const params = {
      lat: location[0],
      lon: location[1],
      format: 'json',
      'accept-language': 'en',

    }

    const address = await apiAddress.get(this.endpoint, params);

    return address;
  }
}

export const addressService = new AddressService();