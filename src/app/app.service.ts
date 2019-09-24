import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  /*BUSCA OS PERSONAGENS NO ARQUIVO JSON*/

  getPersonagensFromJsonArchive(){
    return this.http.get(`${environment.api_base_url}/people.json`);
  }

  /*BUSCA OS FILMES NO ARQUIVO JSON*/

  getFilmesFromJsonArchive(){
    return this.http.get(`${environment.api_base_url}/films.json`);
  }

}
