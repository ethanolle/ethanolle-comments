import { SWAPI_URL, IMDB_API, IMDB_KEY, MOVIES_IDS } from "../const";

import axios from "axios";

export default class ApiService {
  public getAllMoviesFromSWAPI(): Promise<any> {
    return axios.get(`${SWAPI_URL}/films/`)
      .then(function (response) {
        if (response.data) {
          return { success: true, data: response.data };
        }
        return { success: false, error: null };
      })
      .catch(function (error) {
        console.log(error);
        return { success: false, error };
      })
  }

  public getAllCharactersFromSWAPI(): Promise<any[]> {
    let dataToRetrieveLeft = true;
    let page = 1;
    let characters: any[] = [];
    return new Promise(async (resolve, reject) => {
      while (dataToRetrieveLeft) {
        await axios.get(`${SWAPI_URL}/people/?page=${page}`)
          .then(function (response) {
            // increment page and/or stop loop
            if (response.data.next !== null) {
              page++;
            } else {
              dataToRetrieveLeft = false;
            }
            if (response.data) {
              characters = [...characters, ...response.data.results];
            }
          })
          .catch(function (error) {
            dataToRetrieveLeft = false;
            console.log(error);
          });
      }
      resolve(characters);
    });
  }


  public getCharacterFromSWAPI(id: number): Promise<any> {
    return axios.get(`${SWAPI_URL}/people/${id}`)
      .then(function (response) {
        if (response.data) {
          return { success: true, data: response.data };
        }
        return { success: false, error: null };
      })
      .catch(function (error) {
        console.log(error);
        return { success: false, error };
      })
  }

  public getMovieCastFromIMDB(movieId: number): Promise<any> {
    const movie = MOVIES_IDS.find((movie: any) => { return movie.id == movieId });

    return axios.get(`${IMDB_API}/FullCast/${IMDB_KEY}/${movie.IMDB_ID}`)
      .then(function (response) {
        if (response.data) {
          return { success: true, data: response.data };
        }
        return { success: false, error: null };
      })
      .catch(function (error) {
        console.log(error);
        return { success: false, error };
      });
  }

  public getActorDetailsFromIMDB(actorId: string): Promise<any> {
    return axios.get(`${IMDB_API}/Name/${IMDB_KEY}/${actorId}`)
      .then(function (response) {
        if (response.data) {
          return { success: true, data: response.data };
        }
        return { success: false, error: null };
      })
      .catch(function (error) {
        console.log(error);
        return { success: false, error };
      });
  }
}
