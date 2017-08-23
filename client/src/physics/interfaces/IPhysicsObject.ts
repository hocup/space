import { Point2d } from "../../math2d/Point2d";
import { BoundingBox } from "../classes/BoundingBox";

export interface IPhysicsObject {

    position: Point2d;
    velocity: Point2d;

    angularPosition: number;
    angularVelocity: number;

    mass: number;

    getBoundingBox(): BoundingBox;
}