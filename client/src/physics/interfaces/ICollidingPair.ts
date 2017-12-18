import { IPhysicsObject } from "./IPhysicsObject";

export interface ICollidingPair {
    objectA: IPhysicsObject;
    objectB: IPhysicsObject;
}