export interface dataPokemos {
  name: string;
  url: string;
}

export interface Pokemon {
  count: number;
  next?: string;
  previous?: string;
  results: dataPokemos[];
}

export interface PokemonComplete {
  name: string;
  id: number;
  image: string;
  types: string[];
  stats: { name: string; value: number }[];
}

export interface PokemonSprites {
  front_default?: string;
  back_default?: string;
  front_shiny?: string;
}

export interface PokemonType {
  name: string;
}

export interface PokemonTypeSlot {
  type: PokemonType;
}

export interface PokemonMove {
  name: string;
}

export interface PokemonMoveSlot {
  move: PokemonMove;
}

export interface PokemonDetails {
  id: number;
  name: string;
  weight: number;
  height: number;
  sprites: PokemonSprites;
  types: PokemonTypeSlot[];
  moves: PokemonMoveSlot[];
}
