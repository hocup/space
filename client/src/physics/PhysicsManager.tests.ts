import * as assert from "assert";
import * as Mocha from "mocha";
import { PhysicsManager } from "./PhysicsManager";
import { GameObject } from "../game/GameObject";
import { CirclePhysicsObject } from "./classes/CirclePhysicsObject";
import { Point2d } from "../../../shared/math2d/Point2d";

describe("PhysicsManager", function () {
    describe("step(dt:number)", function () {
        let testManager = new PhysicsManager();
        testManager.frictionOn = false;
        // testManager.

        it("handles collisions between two moving spheres of equal mass", 
            function() {
                let objectA = new GameObject(null);
                objectA.physicsObject = new CirclePhysicsObject(new Point2d(5, 0), 6, 6);
                objectA.physicsObject.velocity = new Point2d(-10, 0);

                let objectB = new GameObject(null);
                objectB.physicsObject = new CirclePhysicsObject(new Point2d(-5, 0), 6, 6);
                objectB.physicsObject.velocity = new Point2d(10,0);

                console.log(objectA.physicsObject.velocity);
                let originalVelocity = objectA.physicsObject.velocity.clone();

                testManager.activeObjects.push(objectA.physicsObject);
                testManager.activeObjects.push(objectB.physicsObject);
                testManager.step(0.025);

                console.log(objectA.physicsObject.velocity);
                assert.ok(originalVelocity.scale(-1).isEqual(objectA.physicsObject.velocity));
            }
        );
    });
});
