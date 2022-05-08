import { Location } from "./Location.interface";
import { Origin } from "./Origin.interface";

export interface Character {
    id: number;
    name: string;
    image: string;
    species: string;
    gender: string;
    created: string;
    status: string;
    type : string;
    origin : Origin;
    location : Location;
    episode : String[];
    url : string;
}