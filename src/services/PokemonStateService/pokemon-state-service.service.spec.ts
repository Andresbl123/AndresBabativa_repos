import { TestBed } from '@angular/core/testing';

import { PokemonStateServiceService } from './pokemon-state-service.service';

describe('PokemonStateServiceService', () => {
  let service: PokemonStateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonStateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('Pokemon list state management', () => {
  let service: PokemonStateServiceService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonStateServiceService);
  });

  it('should initialize with empty array', () => {
    service.currentPokemonList.subscribe((list) => {
      expect(list).toEqual([]);
    });
  });

  it('should update pokemon list and emit new value', () => {
    const testData = [
      { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    ];

    service.updatePokemonList(testData);

    service.currentPokemonList.subscribe((list) => {
      expect(list).toEqual(testData);
      expect(list.length).toBe(2);
    });
  });
});
