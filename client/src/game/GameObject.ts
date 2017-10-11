import { LoggingManager } from "../logging/LoggingManager";
import { IPhysicsObject } from "../physics/interfaces/IPhysicsObject";
import { ViewTransform } from "../display/ViewTransform";
import { Point2d } from "../math2d/Point2d";

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

    draw(parent: any, transform: ViewTransform) {
        // TODO: Fix type of parent
        // LoggingManager.log("Drawing object " + this.id)

        // Find the object's div by its id
        let objectDiv = document.getElementById("gameobject-" + this.id);

        let screenPos = transform.transformPoint(this.physicsObject.position);
        let cornerOffset = new Point2d(this.physicsObject.collider.getBoundingBox().height, this.physicsObject.collider.getBoundingBox().width);
        cornerOffset = cornerOffset.scale(-0.5).scale(transform.scale);

        screenPos = screenPos.add(cornerOffset);

        let topValue = screenPos.y;
        let leftValue = screenPos.x;
        
        if(!objectDiv) {
            parent.append($("<div id=\"gameobject-" + this.id + "\" style=\"top: " + topValue + "px; left: " + leftValue + "px; width: 10px; height: 10px; background-color:red; position: absolute; border-radius: 100%;\"></div>"));
        } else {
            let objectRef = $(objectDiv);
            
            objectRef.css("top", topValue + "px");
            objectRef.css("left", leftValue + "px");
        }
    }

    step(dt: number) {
        
    }
}