// GameManager manages the game state, takes care of the view manager and the physics manager
import { GameObject } from "./GameObject";
import { CircleObject } from "../physics/classes/CircleObject";
import { PhysicsManager } from "../physics/PhysicsManager";
import { ViewManager } from "../display/ViewManager";

export class GameManager {


    objects: GameObject[] = [];

    physicsManager: PhysicsManager;
    viewManager: ViewManager;

    physicsTimeStep: number = 25;
    lastTimeStamp: number;
    
    entry() {
        this.physicsManager = new PhysicsManager();
        this.viewManager = new ViewManager("viewContainer");

        for(let i = 0; i < 20; i++) {
            let newObject = new GameObject(null);
            newObject.physicsObject = new CircleObject();
            this.objects.push(newObject);
        }

        this.objects.map(
            (o) => {
                this.physicsManager.activeObjects.push(o.physicsObject);
                this.viewManager.viewObjects.push(o);
            }
        );

        this.lastTimeStamp = new Date().getTime();
        setTimeout(this.tick, this.physicsTimeStep);
    }

    tick = () => {

        let newTime = new Date().getTime();
        let timePassed = newTime - this.lastTimeStamp;
        this.lastTimeStamp = newTime;

        this.viewManager.draw();
        this.physicsManager.step(this.physicsTimeStep);

        setTimeout(this.tick, this.physicsTimeStep);
    }
}