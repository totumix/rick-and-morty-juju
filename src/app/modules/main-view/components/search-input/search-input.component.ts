import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {

  constructor(private router: Router) { }

  onSearch(value: string) {
    this.router.navigate(['/main-view'], {
      queryParams: { q: value },
    });
  }

}
