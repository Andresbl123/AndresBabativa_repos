import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonStateServiceService {
  private pokemonListData = new BehaviorSubject<any[]>([]);
  currentPokemonList = this.pokemonListData.asObservable();

  constructor() {}

  updatePokemonList(data: any[]) {
    this.pokemonListData.next(data);
  }

  getPokemonByName(name: string) {
    const currentValue = this.pokemonListData.value;
    return currentValue.find((pokemon) => pokemon.name === name);
  }
}
