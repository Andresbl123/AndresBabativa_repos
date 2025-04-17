import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@services/api.service';
import { PokemonStateServiceService } from '@services/PokemonStateService/pokemon-state-service.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { PokemonDetails } from '@services/model.api';

@Component({
  standalone: true,
  selector: 'app-card-details',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.sass',
})
export class CardDetailsComponent {
  pokemonName: string = '';
  pokemonDetails: PokemonDetails | null = null;
  loading: boolean = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private pokemonStateService: PokemonStateServiceService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.pokemonName = params['name'];
      this.getPokemonData();
    });
  }

  getPokemonData() {
    const cachedPokemon = this.pokemonStateService.getPokemonByName(
      this.pokemonName
    );

    if (cachedPokemon) {
      this.pokemonDetails = cachedPokemon.fullDetails;
      console.log('Usando datos en caché:', this.pokemonDetails);
    } else {
      this.loading = true;
      this.apiService.getPokemonDetails(this.pokemonName).subscribe({
        next: (details) => {
          this.pokemonDetails = details as PokemonDetails;
          console.log('Detalles del pokemon (de API):', details);
        },
        error: (error) => {
          this.error = 'Error cargando los detalles del pokemon';
          console.error('Error:', error);
        },
        complete: () => {
          this.loading = false;
        },
      });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
