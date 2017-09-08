import { ICollider } from "../interfaces/ICollider";
import { ColliderTypes } from "./ColliderTypes";
import { BoundingBox } from "./BoundingBox";
import { CircleCollider } from "./CircleCollider";
import { Point2d } from "../../math2d/Point2d";

export class CompoundCircleCollider implements ICollider {
    type: ColliderTypes = ColliderTypes.COMPOUNT_CIRCLE_COLLIDER;

    circleInitialOffsets: Point2d[] = []; // Where the circles are when the collider is initialized
    circles: CircleCollider[] = [];

    currentPosition: Point2d = new Point2d(0,0);
    currentRotation: number = 0;
    circlesNeedUpdate: boolean = false;

    getBoundingBox(): BoundingBox {
        let bbout: BoundingBox = null;

        if(this.circles.length) {
            bbout = this.circles[0].getBoundingBox();
        }

        for(let i = 0; i < this.circles.length; i++) {
            let newbb = this.circles[i].getBoundingBox();
            bbout.minx = Math.min(bbout.minx, newbb.minx);
            bbout.miny = Math.min(bbout.miny, newbb.miny);
            bbout.maxx = Math.max(bbout.maxx, newbb.maxx);
            bbout.maxy = Math.max(bbout.maxy, newbb.maxy);
        }

        return bbout;
    }

    setPosition(p: Point2d) {
        let offset = this.currentPosition.add(p.scale(-1));
        if(offset.getLength() > 0.001){
            // Position needs update
            this.currentPosition = p;
            this.circlesNeedUpdate = true;
        }
    }

    setRotation(angle: number) {
        //todo: check for tiny rotations
        
        if(this.currentRotation != angle) {
            this.currentRotation = angle;
            this.circlesNeedUpdate = true;
        }
    }

    updateCollider() {
        
        for(let i = 0; i < this.circles.length; i++){
            if(this.circleInitialOffsets[i]){
                // First, rotate the initalized colliders
                this.circles[i].center = this.circleInitialOffsets[i].rotate(this.currentRotation);
                // Then, offset them
                this.circles[i].center = this.circles[i].center.add(this.currentPosition);
            }
        }

        this.circlesNeedUpdate = false;
    }
    
}