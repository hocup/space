import { Point2d } from "../../../../shared/math2d/Point2d";
import { BoundingBox } from "../classes/BoundingBox";
import { ICollider } from "./ICollider";

export interface IPhysicsObject {

    position: Point2d;
    velocity: Point2d;

    angularPosition: number;
    angularVelocity: number;

    mass: number;

    // This should be changed by the physics manager
    hasUpdate: boolean;

    collider: ICollider;

    // TODO: Decorator? Make this into a class? Gotta find a good way to generalize this function
    applyImpulse(pos: Point2d, impulse: Point2d): void;
}