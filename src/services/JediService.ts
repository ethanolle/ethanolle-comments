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
    const moviesRequest = await apiService.getAllMoviesFromSWAPI();
    if (moviesRequest.success) {
      const charactersId: string[] = [];
      console.log("RESULT", moviesRequest);
      moviesRequest.data.results.forEach((movie: any) => {
        // add all characters ID from movies in charactersId array
        movie.characters.forEach((character: any) => {
          // console.log('split', character.split("/")[5]);
          const charId = character.split("/")[5];
          if (!charactersId.includes(charId))
            charactersId.push(charId);
        });
      });
      console.log("charactersId", charactersId);

      // get all characters from all movies
      const moviesCharacters: Character[] = [];
      for (let i = 0; i < charactersId.length; i++) {
        const characterRequest = await apiService.getCharacterFromSWAPI(parseInt(charactersId[i]));
        if (characterRequest.success) {
          const character = characterRequest.data;
          moviesCharacters.push({ name: character.name });
        }
        else {
          // error
          return [];
        }
      }
      console.log("moviesCharacters", moviesCharacters);

      // sort characters to retrieve only jedis
      const jedis: Character[] = [];
      const jediList = this.getJedisFromLocalSource();

      moviesCharacters.forEach((character) => {
        if (jediList.find((jedi: any) => { jedi.name.toLowerCase() === character.name.toLowerCase() }) !== undefined) {
          jedis.push(character);
        }
      });

      return jedis;
    }
    else {
      // todo : handle error
      return [];
    }
  };

}