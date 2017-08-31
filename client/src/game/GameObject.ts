import { LoggingManager } from "../logging/LoggingManager";
import { IPhysicsObject } from "../physics/interfaces/IPhysicsObject";

export class GameObject {

    id: string;
    physicsObject: IPhysicsObject;

    constructor(id: string) {
        if(!id) {
            this.id = "";
            let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
            for(let i = 0; i < 10; i++) {
                this.id += alphabet.substr(Math.floor(Math.random()*alphabet.length), 1);
            }
        } else {
            this.id = id;
        }
    }

    draw(parent: any) {
        // TODO: Fix type of parent
        // LoggingManager.log("Drawing object " + this.id)

        // Find the object's div by its id
        let objectRef = $("#gameobject-" + this.id);
        if(!objectRef) {
            parent.append($("<div id=\"" + this.id + "\" style=\"top: 100px; left: 100px; width: 10px; height: 10px; background-color:red; position: absolute;\"></div>"));
        }
    }
}