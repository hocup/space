
import { IPhysicsObject } from "../interfaces/IPhysicsObject";
import { Point2d } from "../../../../shared/math2d/Point2d";
import { CircleCollider } from "./CircleCollider";

export class CirclePhysicsObject implements IPhysicsObject {
    _position: Point2d;

    get position(): Point2d {
        return this._position;
    }

    set position(v: Point2d) {
        this._position = v;
        if(this.collider) {
            this.collider.center = v;
        }
    }

    velocity: Point2d;

    angularPosition: number = 0;
    angularVelocity: number = 0;

    mass: number;
    collider: CircleCollider;

    constructor(pos: Point2d = new Point2d(0,0), radius: number = 5, mass: number = 1) {
        this.collider = new CircleCollider(5, this.position);
        this.position = pos;
        this.velocity = new Point2d(0,0);
        
        this.mass = mass
    }

    applyImpulse(pos: Point2d, impulse: Point2d): void {
        //TODO: Handle off-center collisions
        
        this.velocity = this.velocity.add(impulse.scale(1/this.mass));
        
    }
}