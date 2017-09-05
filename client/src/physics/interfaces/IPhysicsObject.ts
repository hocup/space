import { Point2d } from "../../math2d/Point2d";
import { BoundingBox } from "../classes/BoundingBox";
import { ICollider } from "./ICollider";

export interface IPhysicsObject {

    position: Point2d;
    velocity: Point2d;

    angularPosition: number;
    angularVelocity: number;

    mass: number;

    collider: ICollider;

    applyImpulse(pos: Point2d, impuse: Point2d): void;
}