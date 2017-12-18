import { GameObject } from "./GameObject";
import { CompoundCircleCollider } from "../physics/classes/CompoundCircleCollider";
import { CircleCollider } from "../physics/classes/CircleCollider";
import { Point2d } from "../../../shared/math2d/Point2d";
import { ViewTransform } from "../display/ViewTransform";
import { CompoundCirclePhysicsObject } from "../physics/classes/CompoundCirclePhysicsObject";

export class TriangleObject extends GameObject {
    
    physicsObject: CompoundCirclePhysicsObject;
    
    constructor() {
        super(null);

        this.physicsObject = new CompoundCirclePhysicsObject();
        this.physicsObject.momentOfInertia = 1125; //TODO
        this.physicsObject.collider = new CompoundCircleCollider();

        for(let i = 0; i < 3; i++) {
            this.physicsObject.collider.circles.push(new CircleCollider(5,new Point2d(0,0)));
            this.physicsObject.collider.circleInitialOffsets.push(new Point2d(5*Math.cos(2*i*Math.PI/3), 5*Math.sin(2*i*Math.PI/3)));
        }

        this.physicsObject.position = new Point2d(0,0);
    }

    draw(parent: any, transform: ViewTransform) {
        // Find the divs and update them

        // console.log(this.id);
        for(let i =  0; i < this.physicsObject.collider.circles.length; i++) {
            let circle = this.physicsObject.collider.circles[i];

            let objectDiv = document.getElementById("gameobject-" + this.id + i);
            
            let screenPos = transform.transformPoint(circle.center);
            let cornerOffset = new Point2d(circle.getBoundingBox().height, circle.getBoundingBox().width);
            cornerOffset = cornerOffset.scale(-0.5).scale(transform.scale);
    
            screenPos = screenPos.add(cornerOffset);
    
            let topValue = screenPos.y;
            let leftValue = screenPos.x;
            
            if(!objectDiv) {
                parent.append($("<div id=\"gameobject-" + this.id + i + "\" style=\"top: " + topValue + "px; left: " + leftValue + "px; width: 10px; height: 10px; background-color:red; position: absolute; border-radius: 100%;\"></div>"));
            } else {
                let objectRef = $(objectDiv);
                
                objectRef.css("top", topValue + "px");
                objectRef.css("left", leftValue + "px");
            }
        }

    }
}