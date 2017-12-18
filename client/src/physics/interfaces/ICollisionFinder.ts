import { ICollidingPair } from "./ICollidingPair";

export interface ICollisionFinder {

    update(): void;
    getCollidingPairs() : ICollidingPair[];
}