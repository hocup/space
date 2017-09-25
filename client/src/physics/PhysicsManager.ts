import { IPhysicsObject } from "./interfaces/IPhysicsObject";
import { NaiveCollisionFinder } from "./classes/NiaveCollisionFinder";
import { ColliderTypes } from "./classes/ColliderTypes";
import { CircleCollider } from "./classes/CircleCollider";
import { ICollidingPair } from "./interfaces/ICollidingPair";
import { CircleObject } from "./classes/CircleObject";
import { Point2d } from "../math2d/Point2d";
import { CompoundCircleCollider } from "./classes/CompoundCircleCollider";

export class PhysicsManager {
    
    paused: boolean = false;

    activeObjects: IPhysicsObject[] = [];
    inactiveObject: IPhysicsObject[] = []; // Maybe

    broadPhase: NaiveCollisionFinder = new NaiveCollisionFinder();

    constructor() {
        this.broadPhase.objects = this.activeObjects;
    }

    step(dt: number) {
        if(this.paused){
            return;
        }

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
        let broad: ICollidingPair[] = this.broadPhase.getCollidingPairs();

        broad.map(
            (pair) => {
                let collision: {position: Point2d, impulse: Point2d} = null;

                if(
                    pair.objectA.collider.type == ColliderTypes.CIRCLE_COLLIDER
                    && pair.objectB.collider.type == ColliderTypes.CIRCLE_COLLIDER
                ) {
                    // Narrow phase
                    collision = this.circleToCircleTest(<CircleObject>pair.objectA, <CircleObject>pair.objectB);
                }  
                
                if(
                    pair.objectA.collider.type == ColliderTypes.COMPOUND_CIRCLE_COLLIDER 
                    && pair.objectB.collider.type == ColliderTypes.COMPOUND_CIRCLE_COLLIDER
                ){
                    // test circle vs circle
                    let col1: CompoundCircleCollider = <CompoundCircleCollider>pair.objectA.collider;
                    let col2: CompoundCircleCollider = <CompoundCircleCollider>pair.objectB.collider;

                    let collisions: {position: Point2d, impulse: Point2d}[] = [];
                    for(let i = 0; i < col1.circles.length; i++) {
                        for(let j = 0; j < col2.circles.length; j++) {

                            let circle1 = new CircleObject(col1.circles[i].center, col1.circles[i].radius);
                            circle1.mass = pair.objectA.mass;
                            
                            let fromRotation1 = col1.circleInitialOffsets[i].rotate(col1.currentRotation).scale(pair.objectA.angularVelocity);
                            circle1.velocity = pair.objectA.velocity.add(fromRotation1);

                            let circle2 = new CircleObject(col2.circles[j].center, col2.circles[j].radius);
                            circle2.mass = pair.objectB.mass;
                            
                            let fromRotation2 = col2.circleInitialOffsets[j].rotate(col2.currentRotation).scale(pair.objectB.angularVelocity);
                            circle2.velocity = pair.objectB.velocity.add(fromRotation2);

                            
                            let newCollision = this.circleToCircleTest(circle1, circle2);
                            collisions.push
                            if(newCollision) {
                                collisions.push(newCollision);
                            } 
                        }
                    }

                    if(collisions.length > 0) {
                        collision = collisions[0];
                        for(let i = 1; i < collisions.length; i++) {
                            collision.position = collision.position.add(collisions[i].position);
                            collision.impulse = collision.impulse.add(collisions[i].impulse);
                        }

                        collision.position = collision.position.scale(1/collisions.length);
                        collision.impulse = collision.impulse.scale(1/collisions.length);
                    }
                }

                if(
                    pair.objectA.collider.type == ColliderTypes.COMPOUND_CIRCLE_COLLIDER &&
                    pair.objectB.collider.type == ColliderTypes.CIRCLE_COLLIDER 
                ) {
                    let newPair: ICollidingPair = { objectA: pair.objectB, objectB: pair.objectA};
                    pair = newPair;
                }

                if(
                    pair.objectA.collider.type == ColliderTypes.CIRCLE_COLLIDER && 
                    pair.objectB.collider.type == ColliderTypes.COMPOUND_CIRCLE_COLLIDER
                ) {
                    let colliderB = (<CompoundCircleCollider>pair.objectB.collider);
                    let collisions: {position: Point2d, impulse: Point2d}[] = [];
                    for (let j = 0; j < colliderB.circles.length; j ++) {
                        let circle1 = (<CircleObject>pair.objectA);

                        let circle2 = new CircleObject(colliderB.circles[j].center, colliderB.circles[j].radius);
                        circle2.mass = pair.objectB.mass;
                        
                        let fromRotation2 = colliderB.circleInitialOffsets[j].rotate(colliderB.currentRotation).rotate(Math.PI/2).scale(pair.objectB.angularVelocity);
                        circle2.velocity = pair.objectB.velocity.add(fromRotation2);

                        let newCollision = this.circleToCircleTest(circle1, circle2);
                        collisions.push
                        if(newCollision) {
                            collisions.push(newCollision);
                        } 
                        
                    }

                    if(collisions.length > 0) {
                        collision = collisions[0];
                        for(let i = 1; i < collisions.length; i++) {
                            collision.position = collision.position.add(collisions[i].position);
                            collision.impulse = collision.impulse.add(collisions[i].impulse);
                        }

                        collision.position = collision.position.scale(1/collisions.length);
                        collision.impulse = collision.impulse.scale(1/collisions.length);
                    }
                }

                if(collision) {
                    // console.log(pair.objectA.angularVelocity);
                    // console.log(collision, pair.objectA.velocity, pair.objectB.velocity);
                    let impulse = collision.impulse;
                    let collisionPos = collision.position;
                    pair.objectA.applyImpulse(collisionPos, impulse);
                    pair.objectB.applyImpulse(collisionPos, impulse.scale(-1));

                    // console.log(pair.objectA.angularVelocity);

                    // this.paused = true;
                }
                
            }
        )
        
    }

    circleToCircleTest(c1: CircleObject, c2: CircleObject): {position: Point2d, impulse: Point2d} {
        
        let aToB = c2.position.add(c1.position.scale(-1));
        // console.log(aToB.getLength(), c1.collider.radius, c2.collider.radius);
        if(aToB.getLength() < (<CircleCollider>c1.collider).radius + (<CircleCollider>c2.collider).radius) {
            aToB = aToB.getNormalized();
            let va = aToB.dotProduct(c1.velocity);
            let vb = aToB.dotProduct(c2.velocity);

            // console.log(va, vb);

            if(va - vb > 0) {
                // console.log("Should have a collision")
                let ma = c1.mass;
                let mb = c2.mass;

                let impulse = ma*(va - vb)*(1 + (ma - mb)/(ma + mb));

                let col1 = c1.position.add(aToB.scale(c1.collider.radius));
                let col2 = c2.position.add(aToB.scale(-c2.collider.radius));

                // console.log(c1.mass, c1.velocity, va, c2.mass, c2.velocity, vb);
                return {position: col1.add(col2).scale(0.5), impulse: aToB.scale(-impulse)};
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    doGravity() {
        this.activeObjects.map(
            (o) => {
                let impulse = o.position.getNormalized().scale(- o.mass);
                o.applyImpulse(o.position, impulse);
            }
        );
    }

    doFriction() {
        this.activeObjects.map(
            (o) => {
                let impulse = o.velocity.scale(-o.mass).scale(0.008);
                o.applyImpulse(o.position, impulse);

                o.angularVelocity = o.angularVelocity*0.9;
            }
        );
    }
}