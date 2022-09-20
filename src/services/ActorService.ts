import type { Actor } from "../types/Actor";
import type { Character } from "../types/Character";
import ApiService from "./ApiService";
const apiService = new ApiService();

export default class ActorService {
  
  public async getActorFromIMDB(jedi: Character) {
    // first test if movie data already set in local storage
    let movies = [];
    if (localStorage.getItem("movies") !== null) {
      movies = JSON.parse(localStorage.getItem("movies"));
      if (movies[jedi.movieId] !== undefined && movies[jedi.movieId] !== null) {
        const imdbActor = movies[jedi.movieId].actors.find((actor: any) => { return actor.asCharacter.toLowerCase().includes(jedi.name.toLowerCase()) }) || { name: "Acteur inconnu" };
        const actor: Actor = {
          name: imdbActor.name,
        };

        const actorDetailsRequest = await apiService.getActorDetailsFromIMDB(imdbActor.id);
        if (actorDetailsRequest.success === true) {
          actor.birthdate = actorDetailsRequest.data.birthDate;
        } else {
          // handle error
        }
        jedi.actor = actor;
        return jedi;
      }
    }

    // movie has not been retrived from remote databases yet
    const movieRequest = await apiService.getMovieCastFromIMDB(jedi.movieId);
    if (movieRequest.success === true) {
      movies[jedi.movieId] = movieRequest.data;

      const imdbActor = movieRequest.data.actors.find((actor: any) => { return actor.asCharacter.toLowerCase().includes(jedi.name.toLowerCase()) }) || { name: "Acteur inconnu" };
      const actor: Actor = {
        name: imdbActor.name,
      };
      if (imdbActor.id) {
        const actorDetailsRequest = await apiService.getActorDetailsFromIMDB(imdbActor.id);
        if (actorDetailsRequest.success === true) {
          actor.birthdate = actorDetailsRequest.data.birthDate;
        } else {
          // handle error
        }
      }
      localStorage.setItem("movies", JSON.stringify(movies));
      jedi.actor = actor;
      return jedi;
    } else {
      //handle error
    }
  }
}
