import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../models/Character.interface';
import { environment } from 'src/environments/environment';
import { SearchCharacterResponse } from '../models/SearchCharacterResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(
    public _http: HttpClient
  ) { }

  searchCharacter(query = '', page = 1) {
    const url = `${environment.baseApiUrl}/?name=${query}&page=${page}`;
    return this._http.get<SearchCharacterResponse>(url)
  }

  getCharacter(id: number) {
    const url = `${environment.baseApiUrl}/${id}`;
    return this._http.get<Character>(url)
  }

  getCharacterLocation(url: string) {
    return this._http.get<any>(url)
  }
 
}
