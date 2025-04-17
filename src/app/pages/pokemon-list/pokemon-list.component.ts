import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { CardComponent } from '@shared/components/card/card.component';
import { ApiService } from '@services/api.service';
import { PokemonStateServiceService } from '@services/PokemonStateService/pokemon-state-service.service';
import { dataPokemos, PokemonComplete } from '@services/model.api';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CardComponent, ButtonComponent, SearchBarComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.sass',
})
export class PokemonListComponent implements OnInit {
  datos: dataPokemos[] = [];
  pokemonData: PokemonComplete[] = [];
  filteredPokemonData: PokemonComplete[] = [];
  error = '';
  loading = false;
  previusPage = '';
  nextPage = '';

  constructor(
    private apiService: ApiService,
    private pokemonStateService: PokemonStateServiceService
  ) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons(url: string = 'https://pokeapi.co/api/v2/pokemon?limit=4') {
    this.loading = true;
    this.apiService.getPokemons(url).subscribe({
      next: (data) => {
        this.previusPage = data?.previous ?? '';
        this.nextPage = data?.next ?? '';
        this.datos = data.results;
        console.log('Pokemons básicos:', data);
        this.loadPokemonDetails();
      },
      error: (error) => {
        this.error = 'Error cargando la lista de pokemons';
        console.error('Error:', error);
        this.loading = false;
      },
    });
  }

  loadPokemonDetails() {
    const detailObservables = this.datos.map((pokemon) =>
      this.apiService.getPokemonDetails(pokemon.name)
    );

    forkJoin(detailObservables).subscribe({
      next: (detailsArray: any[]) => {
        this.pokemonData = detailsArray.map((details) => {
          return {
            name: details.name,
            id: details.id,
            image: details.sprites.front_default,
            types: details.types.map((type: any) => type.type.name),
            stats: details.stats.map((stat: any) => ({
              name: stat.stat.name,
              value: stat.base_stat,
            })),

            fullDetails: details,
          };
        });

        this.filteredPokemonData = [...this.pokemonData];

        this.pokemonStateService.updatePokemonList(this.pokemonData);

        console.log('Datos completos de Pokemon:', this.pokemonData);
      },
      error: (error) => {
        this.error = 'Error cargando los detalles de los pokemon';
        console.error('Error:', error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  onSearch(searchTerm: string) {
    if (!searchTerm || searchTerm === '') {
      this.filteredPokemonData = [...this.pokemonData];
    } else {
      this.filteredPokemonData = this.pokemonData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  loadNext() {
    if (this.nextPage) {
      this.loadPokemons(this.nextPage);
    }
  }

  loadPrevious() {
    if (this.previusPage) {
      this.loadPokemons(this.previusPage);
    }
  }
}
