export interface ICollisionFinder {

    update(): void;
    getCollidingPairs() : ICollidingPairs;
}