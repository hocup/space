import { ICollider } from "../interfaces/ICollider";
import { BoundingBox } from "./BoundingBox";
import { Point2d } from "../../math2d/Point2d";
import { ColliderTypes } from "./ColliderTypes";

export class CircleCollider implements ICollider {
    type: ColliderTypes = ColliderTypes.CIRCLE_COLLIDER;

    constructor(public radius: number, public center: Point2d) {}

    getBoundingBox() : BoundingBox {
        return new BoundingBox(
            this.center.x - this.radius,
            this.center.y - this.radius,
            this.center.x + this.radius,
            this.center.y + this.radius
        );
    }
}