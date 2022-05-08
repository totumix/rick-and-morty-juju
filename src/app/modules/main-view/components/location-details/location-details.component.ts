import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent {

  public visible;
  @Output() closeDialog: EventEmitter<any> = new EventEmitter<any>()
  @Input() location;
  constructor() { }

  public toggleModal() {
    this.visible = !this.visible;
  }

  public onNoClick() {
    this.visible = false;
    this.closeDialog.emit()
  }

}
