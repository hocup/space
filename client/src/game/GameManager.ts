// GameManager manages the game state, takes care of the view manager and the physics manager
import { GameObject } from "./GameObject";
import { CircleObject } from "../physics/classes/CircleObject";
import { PhysicsManager } from "../physics/PhysicsManager";
import { ViewManager } from "../display/ViewManager";
import { Point2d } from "../math2d/Point2d";

export class GameManager {


    objects: GameObject[] = [];

    physicsManager: PhysicsManager;
    viewManager: ViewManager;

    physicsTimeStep: number = 0.025; // In seconds
    lastTimeStamp: number;
    
    entry() {
        this.physicsManager = new PhysicsManager();
        this.viewManager = new ViewManager("viewContainer");

        // for(let i = 0; i < 1; i++){
        for(let i = 0; i < 400; i++) {
            let newObject = new GameObject(null);
            newObject.physicsObject = new CircleObject();
            newObject.physicsObject.position = new Point2d( (i%20) * 30 + 40, 50 + 30 * (Math.floor(i/20)));
            newObject.physicsObject.velocity = new Point2d(50*Math.random(), 20*Math.random());
            this.objects.push(newObject);
        }

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