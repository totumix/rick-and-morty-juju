import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CharacterService } from 'src/app/core/services/character.service';

import { CharacterComponent } from './character.component';

describe('CharacterComponent', () => {
  let component: CharacterComponent;
  let fixture: ComponentFixture<CharacterComponent>;
  let _characterService: CharacterService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterComponent],
      imports: [HttpClientTestingModule],
      providers: [CharacterService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterComponent);
    _characterService = fixture.debugElement.injector.get(CharacterService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Show location', () => {
    const url = 'https://rickandmortyapi.com/api/location/1';
    const location = {};
    const spy = spyOn(_characterService , 'getCharacterLocation').and.returnValue(of(location));
    component.showLocation(url);
    expect(spy).toHaveBeenCalled();
  });
});
