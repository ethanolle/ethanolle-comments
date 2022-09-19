import { characters } from "../data/characters";
import { type Character } from "../types/Character";
import { type Actor } from "../types/Actor";

import ApiService from "./ApiService";
const apiService = new ApiService();

export default class JediService {

  public getJedisFromLocalSource(): Character[] {
    const jedis: Character[] = [];

    characters.forEach((character) => {
      if (character.affiliations.includes("Jedi Order")) {
        console.log(character.name);
        jedis.push({ name: character.name });
      }
    });

    return jedis;
  }


  public async getAllJedisFromMovies(): Promise<Character[]> {

    if (localStorage.getItem("moviesJedis") !== null) {
      // console.log("already got", JSON.parse(localStorage.getItem("moviesJedis"))) ;
      return JSON.parse(localStorage.getItem("moviesJedis"));
    }
    else {

      const moviesRequest = await apiService.getAllMoviesFromSWAPI();
      if (moviesRequest.success) {
        const charactersId: string[] = [];
        console.log("RESULT", moviesRequest);
        moviesRequest.data.results.forEach((movie: any) => {
          // add all characters ID from movies in charactersId array
          movie.characters.forEach((character: any) => {
            const charId = character.split("/")[5];
            if (!charactersId.includes(charId))
              charactersId.push(charId);
          });
        });

        const jedis: Character[] = [];
        const jediList = this.getJedisFromLocalSource();

        // get all characters from all movies
        for (let i = 0; i < charactersId.length; i++) {
          const characterRequest = await apiService.getCharacterFromSWAPI(parseInt(charactersId[i]));
          if (characterRequest.success) {
            const character = characterRequest.data;
            if (jediList.find((jedi: any) => { return jedi.name.toLowerCase() === character.name.toLowerCase() }) !== undefined) {
              jedis.push({ name: character.name, movieId: character.films[0].split("/")[5], swapiId: character.url.split("/")[5] });
            }
          }
          else {
            // error
            return [];
          }
        }

        console.log("jedis", jedis);

        if (jedis.length) {
          localStorage.setItem("moviesJedis", JSON.stringify(jedis));
        }

        return jedis;
      }
      else {
        // todo : handle error
        return [];
      }
    }

  };

}