import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from './model.api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getPokemons(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(url);
  }

  getPokemonDetails(pokemonName: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  }
}
