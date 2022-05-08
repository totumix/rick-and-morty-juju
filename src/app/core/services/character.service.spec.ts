import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { SearchCharacterResponse } from '../models/SearchCharacterResponse.interface';

import { CharacterService } from './character.service';

const searchCharacterResponse: SearchCharacterResponse = {
  "info": { "count": 826, "pages": 42, "next": "https://rickandmortyapi.com/api/character/?page=2", "prev": null },
  "results": [{ "id": 1, "name": "Rick Sanchez", "status": "Alive", "species": "Human", "type": "marciano", "gender": "Male", "origin": { "name": "Earth (C-137)", "url": "https://rickandmortyapi.com/api/location/1" }, "location": { "name": "Citadel of Ricks", "url": "https://rickandmortyapi.com/api/location/3" }, "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg", "episode": ["https://rickandmortyapi.com/api/episode/48"], "url": "https://rickandmortyapi.com/api/character/1", "created": "2017-11-04T18:48:46.250Z" }]
}

describe('CharacterService', () => {
  let service: CharacterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CharacterService]
    });
    service = TestBed.inject(CharacterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  //que no hayan peticiones pendientes
  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('searchCharacter return a list of Characters and does a get method ', () => {
    const query = '';
    const page = 1;
    service.searchCharacter(query, page).subscribe((resp: SearchCharacterResponse) => {
      expect(resp).toEqual(searchCharacterResponse)
    })

    const req = httpMock.expectOne(`${environment.baseApiUrl}/?name=${query}&page=${page}`)
    expect(req.request.method).toBe('GET');
  })
});
