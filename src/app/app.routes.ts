import { Routes } from '@angular/router';
import { CardDetailsComponent } from './pages/card-details/card-details.component';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';

export const routes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'pokemon/:name', component: CardDetailsComponent },
  { path: '**', redirectTo: '' },
];
