import { characters } from "../data/characters";
import type { Character } from "../types/Character";

import ApiService from "./ApiService";
const apiService = new ApiService();

export default class JediService {

  public getJedisFromLocalSource(): Character[] {
    const jedis: Character[] = [];
    return characters.filter(character => {
      return character.affiliations.includes("Jedi Order") || character.formerAffiliations.includes("Jedi Order")
    });
  }

  public async getAllJedisFromMovies(): Promise<Character[]> {
    if (localStorage.getItem("moviesJedis") !== null) {
      return JSON.parse(localStorage.getItem("moviesJedis"));
    } else {
      const moviesRequest = await apiService.getAllMoviesFromSWAPI();
      if (moviesRequest.success) {
        const charactersId: string[] = [];
        moviesRequest.data.results.forEach((movie: any) => {
          // add all characters ID from movies in charactersId array
          movie.characters.forEach((character: any) => {
            const charId = character.split("/")[5];
            if (!charactersId.includes(charId)) {
              charactersId.push(charId);
            }
          });
        });

        const jedis: Character[] = [];
        const jediList = this.getJedisFromLocalSource();

        // ger all characters from API
        const allRemoteCharacters = await apiService.getAllCharactersFromSWAPI();

        // return only characters that are in at least a movie
        allRemoteCharacters.forEach(remoteCharacter => {
          if (charactersId.includes(remoteCharacter.url.split("/")[5]) &&
            jediList.find(jedi => jedi.name.toLowerCase() === remoteCharacter.name.toLowerCase())
          ) {
            jedis.push
              ({
                name: remoteCharacter.name,
                movieId: remoteCharacter.films[0].split("/")[5],
                swapiId: remoteCharacter.url.split("/")[5]
              });
          }

        });

        if (jedis.length) {
          localStorage.setItem("moviesJedis", JSON.stringify(jedis));
        }
        return jedis;
      } else {
        // todo : handle error
        return [];
      }
    }
  }
}
