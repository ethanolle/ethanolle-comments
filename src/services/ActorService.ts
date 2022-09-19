import { type Actor } from "../types/Actor";
import { type Character } from "../types/Character";
import ApiService from "./ApiService";
const apiService = new ApiService();

export default class ActorService {

  public async getActorFromJedi(jedi: Character) {
  }

  // get Star Wars characters from IMDB
  public async getActorFromIMDB(jedi: Character) {
    console.log("JEDI", jedi);
    // first test if movie data already set in local storage

    let movies = [];
    if (localStorage.getItem("movies") !== null) {
      movies = JSON.parse(localStorage.getItem("movies"));
      if (movies[jedi.movieId] !== undefined && movies[jedi.movieId] !== null) {
        const movie = movies[jedi.movieId];
        console.log("MOVIE", movie);
        movie.actors.forEach((actor: Actor) => {
          console.log("ACTOR", actor);
        });
        const imdbActor = movie.actors.find((actor: any) => { return actor.asCharacter.toLowerCase().includes(jedi.name.toLowerCase()) }) || { name: "Acteur inconnu" };
        console.log("HEY", imdbActor);
        const actor: Actor = {
          name: imdbActor.name,
        }
        jedi.actor = actor;
        return jedi;
      }
    }

    const movieRequest = await apiService.getMovieCastFromIMDB(jedi.movieId);
    console.log("movieRequest", movieRequest);
    if (movieRequest.success === true) {
      movies[jedi.movieId] = movieRequest.data;
      localStorage.setItem("movies", JSON.stringify(movies));

      movieRequest.data.actors.forEach(actor => {
        console.log("ACTOR BIATCH", actor);
      });
      const imdbActor = movieRequest.data.actors.find((actor: any) => { return actor.asCharacter.toLowerCase().includes(jedi.name.toLowerCase()) }) || { name: "Acteur inconnu" };
      console.log("imdbActor", imdbActor);
      const actor: Actor = {
        name: imdbActor.name,
      }
      if(imdbActor.id){
        const actorDetailsRequest = await apiService.getActorDetailsFromIMDB(imdbActor.id);
        if (actorDetailsRequest.success === true) {
          actor.birthdate = actorDetailsRequest.data.birthDate;
        }
        else {
          // handle error
        }
      }
      jedi.actor = actor;
      return jedi;
    }
    else {

      //handle error
    }

  }
}