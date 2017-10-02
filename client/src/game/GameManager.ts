// GameManager manages the game state, takes care of the view manager and the physics manager
import { GameObject } from "./GameObject";
import { CircleObject } from "../physics/classes/CircleObject";
import { PhysicsManager } from "../physics/PhysicsManager";
import { ViewManager } from "../display/ViewManager";
import { Point2d } from "../math2d/Point2d";
import { TriangleObject } from "./TriangleObject";
import { SeedObject } from "./SeedObject";
import { LongStickObject } from "./LongStickObject";

export class GameManager {

    objects: GameObject[] = [];

    physicsManager: PhysicsManager;
    viewManager: ViewManager;

    physicsTimeStep: number = 0.025; // In seconds
    lastTimeStamp: number;
    
    entry() {
        this.physicsManager = new PhysicsManager();
        this.viewManager = new ViewManager("viewContainer");

        // // for(let i = 0; i < 1; i++){
        for(let i = 0; i < 600; i++) {
            let newObject = new GameObject(null);
            newObject.physicsObject = new CircleObject();
            newObject.physicsObject.position = new Point2d( (i%20) * 30 + 40, 50 + 30 * (Math.floor(i/20)));
            newObject.physicsObject.velocity = new Point2d(50*Math.random(), 20*Math.random());
            newObject.physicsObject.mass = 40;
            this.objects.push(newObject);
        }

        // let objectA = new GameObject(null);
        // objectA.physicsObject = new CircleObject(new Point2d(0,0));
        // objectA.physicsObject.velocity = new Point2d(30,0);
        // let objectB = new GameObject(null);
        // objectB.physicsObject = new CircleObject(new Point2d(200,0));

        // this.objects.push(objectA);
        // this.objects.push(objectB);

        // for(let i = 0; i < 10; i++) {

        //     let newSeed = new SeedObject();
        //     newSeed.physicsObject.position = new Point2d((i%20) * 42 , Math.floor(i/20)* 40);
        //     newSeed.physicsObject.velocity = new Point2d(0,0);
            
        //     this.objects.push(newSeed);
        // }

        for(let i = 0; i < 10; i++) {
            let newStick = new LongStickObject();
            newStick.physicsObject.position = new Point2d(- (i%3) * 42, Math.floor(i/3) * 50);
            newStick.physicsObject.angularVelocity = 1;

            this.objects.push(newStick);
        }
        
        // let triangleObject = new TriangleObject();
        // let triangleObjectB = new TriangleObject();
        // triangleObjectB.physicsObject.position = new Point2d(100,0);
        // triangleObject.physicsObject.velocity = new Point2d(20,100);
        // this.objects.push(triangleObject);
        // this.objects.push(triangleObjectB);

        // let testBallA = new GameObject(null);
        // testBallA.physicsObject = new CircleObject();
        // testBallA.physicsObject.position = new Point2d(0, 0);
        // testBallA.physicsObject.velocity = new Point2d(20, 0);
        // testBallA.physicsObject.mass = 200;
        // this.objects.push(testBallA);

        let testBall = new GameObject(null);
        testBall.physicsObject = new CircleObject();
        testBall.physicsObject.position = new Point2d(6*3, 9);
        testBall.physicsObject.mass = 5;
        this.objects.push(testBall);

        // let testStickA = new LongStickObject();
        // testStickA.physicsObject.angularVelocity = -2;
        // testStickA.physicsObject.position = new Point2d(20,0);
        // this.objects.push(testStickA);

        let testStick = new LongStickObject();
        testStick.physicsObject.angularVelocity = 2;
        // testStick.physicsObject.velocity = new Point2d(20, 0);
        this.objects.push(testStick);

        this.objects.map(
            (o) => {
                this.physicsManager.activeObjects.push(o.physicsObject);
                this.viewManager.viewObjects.push(o);
            }
        );

        this.lastTimeStamp = new Date().getTime();
        setTimeout(this.tick, this.physicsTimeStep*1000);
    }

    tick = () => {

        let newTime = new Date().getTime();
        let timePassed = newTime - this.lastTimeStamp;
        this.lastTimeStamp = newTime;

        this.viewManager.draw();
        
        this.physicsManager.step(this.physicsTimeStep);

        // console.log(timePassed);

        setTimeout(this.tick, this.physicsTimeStep*1000);
    }
}