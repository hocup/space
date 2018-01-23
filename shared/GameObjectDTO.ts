import { ObjectType } from "./ObjectType";


// An class that defines the format that game objects will take on over the network
export class GameObjectDTO {
    id: string;
    type: ObjectType;
    position: {x: number, y: number};
    velocity: {x: number, y: number};
    angularPosition: number;
    angularVelocity: number;
    mass: number;
}