import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, HostListener, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Character } from 'src/app/core/models/Character.interface';
import { SearchCharacterResponse } from 'src/app/core/models/SearchCharacterResponse.interface';
import { CharacterService } from 'src/app/core/services/character.service';
import { LocationDetailsComponent } from '../../components/location-details/location-details.component';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  public characters: Character[] = []
  public page = 1;
  public query: string;
  public error: boolean = false;
  public info;
  pageYoffset = 0;
  @HostListener('window:scroll', ['$event']) onScroll(event) {
    this.pageYoffset = window.pageYOffset;
  }
  charactersSubscription: Subscription;

  constructor(
    private _characterService: CharacterService,
    private route: ActivatedRoute,
    private router: Router,
    private scroll: ViewportScroller,
  ) { }

  ngOnInit() {
    this.onSearch();
    this.getCharacters();
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }

  private getCharactersSearch(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params: ParamMap) => {
      this.query = params['q'];
      this.getCharacters();
    });
  }

  private onSearch(): void {
    this.charactersSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.characters = [];
        this.page = 1;
        this.getCharactersSearch();
      });
  }

  getCharacters() {
    this._characterService.searchCharacter(this.query, this.page)
      .pipe(take(1)).subscribe((res: SearchCharacterResponse) => {
        console.log(res)
        let { info, results } = res;
        this.info = info;
        this.characters = results;
        this.error = false;
      }, error => this.error = true)
  }

  nextPage() {
    if (this.info.next) {
      this.page++
      this.getCharacters();
    }
  }

  prevPage() {
    if (this.info.prev) {
      this.page--
      this.getCharacters();
    }
  }

  ngOnDestroy() {
    this.charactersSubscription.unsubscribe();
  }
}
