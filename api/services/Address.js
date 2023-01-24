import { apiAddress } from "../controllers/Address";

class AddressService {
  endpointForCoordinates = '/reverse';
  endpointForNames = '/search';

  async getAddressByCoords (location) {
    const params = {
      lat: location[0],
      lon: location[1],
      format: 'json',
      'accept-language': 'en',
    }

    const address = await apiAddress.get(this.endpointForCoordinates, params);

    return address;
  }

  async getAddressByName (text) {
    const params = {
      city: text,
      format: 'json',
      'accept-language': 'en',
    }

    const address = await apiAddress.get(this.endpointForNames, params);

    return address;
  }

}

export const addressService = new AddressService();