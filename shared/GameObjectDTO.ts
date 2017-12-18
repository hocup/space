import { ObjectType } from "./ObjectType";


// An class that defines the format that game objects will take on over the network
export class GameObjectDTO {
    id: string;
    type: ObjectType;
}