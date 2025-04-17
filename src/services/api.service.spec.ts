import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Pokemon, PokemonComplete } from './model.api';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService, provideHttpClientTesting()],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch pokemons from provided URL', () => {
    const mockPokemon: PokemonComplete = {
      id: 25,
      name: 'pikachu',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png',
      types: ['ground'],
      stats: [
        {
          name: 'hp',
          value: 50,
        },
        {
          name: 'attack',
          value: 75,
        },
        {
          name: 'defense',
          value: 85,
        },
        {
          name: 'special-attack',
          value: 20,
        },
        {
          name: 'special-defense',
          value: 30,
        },
        {
          name: 'speed',
          value: 40,
        },
      ],
    };

    const mockData: Pokemon = {
      count: 1302,
      previous: '',
      next: 'https://pokeapi.co/api/v2/pokemon?offset=4&limit=4',
      results: [
        {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
        },
        {
          name: 'ivysaur',
          url: 'https://pokeapi.co/api/v2/pokemon/2/',
        },
        {
          name: 'venusaur',
          url: 'https://pokeapi.co/api/v2/pokemon/3/',
        },
        {
          name: 'charmander',
          url: 'https://pokeapi.co/api/v2/pokemon/4/',
        },
      ],
    };
    const url = 'https://pokeapi.co/api/v2/pokemon/pikachu';

    service.getPokemons(url).subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);
  });

  it('should fetch pokemon details by name', () => {
    const pokemonName = 'bulbasaur';
    const mockDetails = {
      name: 'bulbasaur',
      id: 1,
    };

    service.getPokemonDetails(pokemonName).subscribe((data) => {
      expect(data).toEqual(mockDetails);
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockDetails);
  });
});
