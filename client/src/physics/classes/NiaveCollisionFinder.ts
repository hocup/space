import { ICollisionFinder } from "../interfaces/ICollisionFinder";
import { ICollidingPair } from "../interfaces/ICollidingPair";
import { IPhysicsObject } from "../interfaces/IPhysicsObject";

export class NaiveCollisionFinder implements ICollisionFinder {
    objects: IPhysicsObject[];

    update() {}

    getCollidingPairs() : ICollidingPair[] {
        let pairs: ICollidingPair[] = [];

        for(let i = 0; i < this.objects.length; i++) {
            for(let j = i+1; j < this.objects.length; j++) {
                // console.log(this.objects[i], this.objects[j]);
                if(this.objects[i].collider.getBoundingBox().intersects(this.objects[j].collider.getBoundingBox())){
                    pairs.push({objectA: this.objects[i], objectB: this.objects[j]});
                }
            }
        }

        return pairs;
    }
}