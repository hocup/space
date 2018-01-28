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
import { NetworkManager } from "../network/NetworkManager";
import { ObjectType } from "../../../shared/ObjectType";

export class GameManager {

    objects: GameObject[] = [];

    playerObject: GameObject;

    physicsManager: PhysicsManager;
    viewManager: ViewManager;
    inputManager: InputManager;
    networkManager: NetworkManager;

    networkUpdate: GameObject[];

    physicsTimeStep: number = 0.025; // In seconds
    networkTimeStep: number = 0.07; // TODO
    lastTimeStamp: number;

    paused = false;
    
    entry() {
        this.physicsManager = new PhysicsManager();
        this.viewManager = new ViewManager("viewContainer");

        this.inputManager = new InputManager();

        this.inputManager.inputStateChanged.subscribe(
            (event: InputChangeEvent) => {
                // console.log("input change", event);
                if(event.newState.state.togglePause) {
                    this.togglePause();
                }
            }
        );

        this.networkManager = new NetworkManager();
        this.networkManager.establishConnection();

        this.networkManager.requestInitialState().then(
            (objs: GameObject[]) => {
                this.objects = this.objects.concat(objs);
                this.objects.map(
                    (o) => {
                        // console.log("Have an object", o)
                        this.physicsManager.activeObjects.push(o.physicsObject);
                        this.viewManager.viewObjects.push(o);
                    }
                );

                this.networkManager.serverObjectsStateUpdate.subscribe(
                    (objects: GameObject[]) => {
                        this.networkUpdate = objects;
                    }
                );
            }
        );


        let testPlayer = new PlayerShipObject();
        this.playerObject = testPlayer;
        // this.addObject(testPlayer);


        this.inputManager.inputStateChanged.subscribe(
            (e: InputChangeEvent) => {
                testPlayer.inputStateChanged(e.newState);
            }
        );

        this.networkManager.addObject(testPlayer);
        this.objects.push(testPlayer);

        this.viewManager.follow = testPlayer;

        this.lastTimeStamp = new Date().getTime();
        setTimeout(this.tick, this.physicsTimeStep*1000);
    }

    addObject(object: GameObject) {
        this.objects.push(object);
        this.networkManager.addObject(object);
        this.viewManager.viewObjects.push(object);
        this.physicsManager.activeObjects.push(object.physicsObject);
    }

    tick = () => {

        let newTime = new Date().getTime();
        let timePassed = newTime - this.lastTimeStamp;
        this.lastTimeStamp = newTime;

        this.viewManager.step(timePassed);

        this.viewManager.draw();
        
        if(this.networkUpdate) {
            for(let i in this.networkUpdate) {
                let no = this.networkUpdate[i];
                let o = this.objects.find(o => o.id == this.networkUpdate[i].id);
                
                if(this.playerObject && o && this.playerObject.id == o.id) {
                    // update for self, do nothing!
                } else if(o) {
                    
                    o.physicsObject.position = no.physicsObject.position;
                    o.physicsObject.velocity = no.physicsObject.velocity;
                    o.physicsObject.angularPosition = no.physicsObject.angularPosition;
                    o.physicsObject.angularVelocity = no.physicsObject.angularVelocity;
                } else {
                    
                    this.addObject(no);
                }
            }

            this.networkUpdate = null;
        }

        this.physicsManager.step(this.physicsTimeStep);
        for(let i = 0; i < this.objects.length; i++) {
            if(!this.objects[i]) {
                console.log("pausing");
                this.paused = true;
            }
            this.objects[i].step(timePassed);
        }

        this.networkManager.sendUpdate(this.objects.filter(o => o.physicsObject.hasUpdate));
        this.objects.map(
            (o) => {
                o.physicsObject.hasUpdate = false;
            }
        );

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