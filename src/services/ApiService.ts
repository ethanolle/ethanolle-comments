import { SWAPI_URL, IMDB_API, IMDB_KEY, MOVIES_IDS } from "../const";

import axios from "axios";

export default class ApiService {

  /**
   * 
   * @returns 
   */
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

  /**
   * 
   * @param id 
   * @returns 
   */
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

  public getMovieCastFromIMDB(filmId: number): Promise<any> {
    const id = MOVIES_IDS.find((movie: any) => { return movie.id === filmId });

    return axios.get(`${IMDB_API}/Title/${IMDB_KEY}/${id}/FullCast`)
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
}