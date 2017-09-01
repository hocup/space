
import { IPhysicsObject } from "../interfaces/IPhysicsObject";
import { Point2d } from "../../math2d/Point2d";
import { CircleCollider } from "./CircleCollider";

export class CircleObject implements IPhysicsObject {
    position: Point2d;
    velocity: Point2d;

    angularPosition: number = 0;
    angularVelocity: number = 0;

    mass: number;
    collider: CircleCollider;

    constructor(pos: Point2d = new Point2d(0,0), radius: number = 5, mass: number = 1) {
        this.position = pos;
        this.velocity = new Point2d(0,0);

        this.collider = new CircleCollider(5, this.position);
        this.mass = mass
    }
}