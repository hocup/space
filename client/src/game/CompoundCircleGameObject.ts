import { GameObject } from "./GameObject";

import { CompoundCircleCollider } from "../physics/classes/CompoundCircleCollider";
import { CircleCollider } from "../physics/classes/CircleCollider";
import { Point2d } from "../../../shared/math2d/Point2d";
import { ViewTransform } from "../display/ViewTransform";
import { CompoundCirclePhysicsObject } from "../physics/classes/CompoundCirclePhysicsObject";


export class CompoundCircleGameObject extends GameObject {
    physicsObject: CompoundCirclePhysicsObject;
    
    constructor(circleDefs: {pos: Point2d, radius: number}[]) {
        super(null);

        this.physicsObject = new CompoundCirclePhysicsObject();

        this.physicsObject.momentOfInertia = 0;
        this.physicsObject.collider = new CompoundCircleCollider();

        if(!circleDefs) {
            circleDefs = [];
        }

        for(let i = 0; i < circleDefs.length; i++) {
            this.physicsObject.collider.circles.push(new CircleCollider(circleDefs[i].radius, circleDefs[i].pos));
            this.physicsObject.collider.circleInitialOffsets.push(circleDefs[i].pos);

            this.physicsObject.momentOfInertia += Math.pow(circleDefs[i].radius,2)*Math.pow(circleDefs[i].pos.getLength(), 2);
            this.physicsObject.mass += Math.pow(circleDefs[i].radius,2);
        }

        // console.log(this.physicsObject.momentOfInertia);
        // console.log(this.physicsObject.mass);

        this.physicsObject.position = new Point2d(0,0);
        this.physicsObject.velocity = new Point2d(0,0);
    }

    draw(parent: any, transform: ViewTransform) {
        // Find the divs and update them

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
                parent.append(
                    $("<div "
                        + "id=\"gameobject-" + this.id + i 
                        + "\" style=\"top: " + topValue + "px; " 
                        + "left: " + leftValue + "px; " 
                        + "width: " + circle.radius*2 + "px; " 
                        + "height: " + circle.radius*2 + "px; " 
                        +" background-color:red; position: absolute; border-radius: 100%;\"></div>"));
            } else {
                let objectRef = $(objectDiv);
                
                objectRef.css("top", topValue + "px");
                objectRef.css("left", leftValue + "px");
            }
        }

    }
}