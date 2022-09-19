/**
 * IMBD doc :
 * https://developer.imdb.com/documentation/api-documentation/key-concepts/?ref_=side_nav
 * https://developer.imdb.com/documentation/api-documentation/calling-the-api/?ref_=up_next
 */

import { Character } from "../types/Character";
import ApiService from "./ApiService";
const apiService = new ApiService();

export default class ActorService {

  public async getActorFromJedi(jedi: Character) {
  }

  // get Star Wars characters from IMDB
  public async getActorFromIMDB(jedi: Character) {
    // first test if movie data already set in local storage
    if (localStorage.getItem("movies") !== null) {
      const movies = JSON.parse(localStorage.getItem("movies"));
      if (movies[jedi.movieId] !== undefined) {
        const movieActors = movies[jedi.movieId];
        const actor = movieActors.find((actor: any) => { return actor.name.toLowerCase() === jedi.name.toLowerCase() });
        return actor || {};
      }
    }
    else {
      const movies = [];
    }

    const movieRequest = await apiService.getMovieCastFromIMDB(jedi.movieId);
    if (movieRequest.success) {
      movies[jedi.movieId] = movieRequest.data;
      localStorage.setItem("movies", JSON.stringify(movies));
      const actor = movieRequest.data.find((actor: any) => { return actor.name.toLowerCase() === jedi.name.toLowerCase() });
      return actor || {};
    }

  }
}