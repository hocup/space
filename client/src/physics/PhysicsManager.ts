import { IPhysicsObject } from "./interfaces/IPhysicsObject";

export class PhysicsManager {
    
    activeObjects: IPhysicsObject[];
    inactiveObject: IPhysicsObject[]; // Maybe

    step(dt: number) {
        // Move everything active
        this.activeObjects.map(
            (o) => {
                o.position = o.position.add(o.velocity.scale(dt));
                o.angularPosition = o.angularPosition + dt*o.angularVelocity;
            }
        );

        // Test for collisions
        let allObjects = this.activeObjects.concat(this.inactiveObject);

        
    }
}