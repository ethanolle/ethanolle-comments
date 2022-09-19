import { SWAPI_URL } from "../const";

import axios from "axios";

export default class ApiService {

  public getAllMoviesFromSWAPI(): Promise<any> {
    return axios.get(`${SWAPI_URL}/films/`)
      .then(function (response) {
        console.log(response);
        if (response.data) {
          return { success: true, data: response.data };
        }
        return { success: false, error: null };
      })
      .catch(function (error) {
        console.log(error);
        return { success: true, error };
      })
  }

  public getCharacterFromSWAPI(id: number): Promise<any> {
    return axios.get(`${SWAPI_URL}/people/${id}`)
      .then(function (response) {
        console.log(response);
        if (response.data) {
          return { success: true, data: response.data };
        }
        return { success: false, error: null };
      })
      .catch(function (error) {
        console.log(error);
        return { success: true, error };
      })
  };
}