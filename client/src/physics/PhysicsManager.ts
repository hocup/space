import { IPhysicsObject } from "./interfaces/IPhysicsObject";

export class PhysicsManager {
    
    activeObjects: IPhysicsObject[] = [];
    inactiveObject: IPhysicsObject[] = []; // Maybe

    step(dt: number) {
        // Move everything active
        this.activeObjects.map(
            (o) => {
                o.position = o.position.add(o.velocity.scale(dt));
                o.angularPosition = o.angularPosition + dt*o.angularVelocity;
            }
        );

        this.doGravity();

        // Test for collisions
        let allObjects = this.activeObjects.concat(this.inactiveObject);

        
    }

    doGravity() {
        this.activeObjects.map(
            (o) => {
                let impulse = o.position.getNormalized().scale(- o.mass);
                o.velocity = o.velocity.add(impulse.scale(1/o.mass));
            }
        )
    }
}