import { Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CharacterService } from 'src/app/core/services/character.service';
import { LocationDetailsComponent } from '../location-details/location-details.component';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  @Input() character;
  @ViewChild("viewMore", { read: ViewContainerRef }) viewMoreContainer: ViewContainerRef
  public simpleViewMore: ComponentRef<LocationDetailsComponent> = null;

  constructor(
    private _characterService: CharacterService,
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const LocationDetailsFactory = this.resolver.resolveComponentFactory(LocationDetailsComponent);
    this.simpleViewMore = this.viewMoreContainer.createComponent(LocationDetailsFactory);
  }

  showLocation(url) {
    this._characterService.getCharacterLocation(url).subscribe(async location => {
      this.simpleViewMore.instance.toggleModal();
      this.simpleViewMore.instance.location = await location;
    })
  }

}
