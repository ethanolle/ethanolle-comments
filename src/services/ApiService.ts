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

  public getMovieCastFromIMDB(movieId: number): Promise<any> {
    console.log("movieID", movieId);
    const movie = MOVIES_IDS.find((movie: any) => { return movie.id == movieId });
    console.log("movie", movie);

    return axios.get(`${IMDB_API}/FullCast/${IMDB_KEY}/${movie.IMDB_ID}`)
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

  public getActorDetailsFromIMDB(actorId: string): Promise<any> {
    return axios.get(`${IMDB_API}/Name/${IMDB_KEY}/${actorId}`)
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