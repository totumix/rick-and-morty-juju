import { Character } from "./Character.interface";
import { Info } from "./Info.interface";

export interface SearchCharacterResponse {
    info: Info;
    results: Character[];
}