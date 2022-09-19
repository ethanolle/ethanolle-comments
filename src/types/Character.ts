import type { Actor } from "./Actor"

export interface Character {
  swapiId?: number;
  name: string;
  movieId?: number;
  actor?: Actor;
} 