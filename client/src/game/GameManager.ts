// GameManager manages the game state, takes care of the view manager and the physics manager
import { GameObject } from "./GameObject";
import { CirclePhysicsObject } from "../physics/classes/CirclePhysicsObject";
import { PhysicsManager } from "../physics/PhysicsManager";
import { ViewManager } from "../display/ViewManager";
import { Point2d } from "../../../shared/math2d/Point2d";
import { TriangleObject } from "./TriangleObject";
import { SeedObject } from "./SeedObject";
import { LongStickObject } from "./LongStickObject";
import { InputManager, InputChangeEvent } from "./InputManager";
import { PlayerShipObject } from "./PlayerShipObject";

export class GameManager {

    objects: GameObject[] = [];

    physicsManager: PhysicsManager;
    viewManager: ViewManager;
    inputManager: InputManager;

    physicsTimeStep: number = 0.025; // In seconds
    lastTimeStamp: number;

    paused = false;
    
    entry() {
        this.physicsManager = new PhysicsManager();
        this.viewManager = new ViewManager("viewContainer");

        this.inputManager = new InputManager();

        this.inputManager.inputStateChanged.subscribe(
            (event: InputChangeEvent) => {
                console.log("input change", event);
                if(event.newState.state.togglePause) {
                    this.togglePause();
                }
            }
        );

        // // for(let i = 0; i < 1; i++){
        for(let i = 0; i < 300; i++) {
            let newObject = new GameObject(null);
            newObject.physicsObject = new CirclePhysicsObject();
            newObject.physicsObject.position = new Point2d( (i%20) * 30 + 40, 50 + 30 * (Math.floor(i/20)));
            newObject.physicsObject.velocity = new Point2d(50*Math.random(), 20*Math.random());
            newObject.physicsObject.mass = 400;
            this.objects.push(newObject);
        }

        let testBall = new GameObject(null);
        testBall.physicsObject = new CirclePhysicsObject();
        testBall.physicsObject.position = new Point2d(6*3, 9);
        testBall.physicsObject.mass = 5;
        this.objects.push(testBall);

        let testPlayer = new PlayerShipObject();
        this.inputManager.inputStateChanged.subscribe(
            (e: InputChangeEvent) => {
                testPlayer.inputStateChanged(e.newState);
            }
        );

        this.objects.push(testPlayer);
        this.viewManager.follow = testPlayer;

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

        this.viewManager.step(timePassed);

        this.viewManager.draw();
        
        this.physicsManager.step(this.physicsTimeStep);
        for(let i = 0; i < this.objects.length; i++) {
            this.objects[i].step(timePassed);
        }

        
        // console.log(timePassed);
        if(!this.paused) {
            setTimeout(this.tick, this.physicsTimeStep*1000);
        }
    }

    togglePause() {
        this.paused = !this.paused;

        if(!this.paused) {
            this.lastTimeStamp = new Date().getTime();
            this.tick();
        }
    }
}