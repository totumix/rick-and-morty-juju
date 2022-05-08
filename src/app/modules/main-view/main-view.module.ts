import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from './main-view.component';
import { RouterModule, Routes } from '@angular/router';
import { CharacterService } from 'src/app/core/services/character.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { FooterComponent } from './components/footer/footer.component';
import { CharacterListComponent } from './pages/character-list/character-list.component';
import { CharacterDetailsComponent } from './pages/character-details/character-details.component';
import { LocationDetailsComponent } from './components/location-details/location-details.component';
import { CharacterComponent } from './components/character/character.component';
import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [
  {
    path: "", component: MainViewComponent, children: [
      { path: "", component: CharacterListComponent },
      { path: "character-details/:id", component: CharacterDetailsComponent },
      { path: "location-details", component: LocationDetailsComponent },
    ]
  },
];

@NgModule({
  declarations: [
    MainViewComponent,
    SearchInputComponent,
    FooterComponent,
    CharacterListComponent,
    CharacterDetailsComponent,
    LocationDetailsComponent,
    CharacterComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [CharacterService]
})
export class MainViewModule { }
