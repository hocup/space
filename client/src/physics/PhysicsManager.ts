import { IPhysicsObject } from "./interfaces/IPhysicsObject";
import { NaiveCollisionFinder } from "./classes/NiaveCollisionFinder";
import { ColliderTypes } from "./classes/ColliderTypes";

export class PhysicsManager {
    
    activeObjects: IPhysicsObject[] = [];
    inactiveObject: IPhysicsObject[] = []; // Maybe

    broadPhase: NaiveCollisionFinder = new NaiveCollisionFinder();

    constructor() {
        this.broadPhase.objects = this.activeObjects;
    }

    step(dt: number) {
        // Move everything active
        this.activeObjects.map(
            (o) => {
                o.position = o.position.add(o.velocity.scale(dt));
                o.angularPosition = o.angularPosition + dt*o.angularVelocity;
            }
        );

        this.doGravity();
        this.doFriction();


        // Test for collisions
        //let allObjects = this.activeObjects.concat(this.inactiveObject);
        let broad = this.broadPhase.getCollidingPairs();

        broad.map(
            (pair) => {
                if(
                    pair.objectA.collider.type == ColliderTypes.CIRCLE_COLLIDER
                    && pair.objectB.collider.type == ColliderTypes.CIRCLE_COLLIDER
                ) {
                    // Narrow phase
                    let aToB = pair.objectB.position.add(pair.objectA.position.scale(-1)).getNormalized();
                    // FIXME to be actual elastic collision
                    // pair.objectA.velocity.add(aToB.scale(pair.objectA.mass))
                    // pair.objectB.velocity.add(aToB.scale(-pair.objectB.mass))
                    pair.objectA.applyImpulse(pair.objectA.position, aToB.scale(-pair.objectA.mass*5))
                    pair.objectB.applyImpulse(pair.objectB.position, aToB.scale(pair.objectB.mass*5))
                    
                }
            }
        )
        
    }

    doGravity() {
        this.activeObjects.map(
            (o) => {
                let impulse = o.position.getNormalized().scale(- o.mass);
                // o.velocity = o.velocity.add(impulse.scale(1/o.mass));
                o.applyImpulse(o.position, impulse);
            }
        );
    }

    doFriction() {
        this.activeObjects.map(
            (o) => {
                let impulse = o.velocity.scale(-o.mass).scale(0.02);
                o.applyImpulse(o.position, impulse);
                // o.velocity = o.velocity.add(impulse.scale(1/o.mass));
            }
        )
    }
}