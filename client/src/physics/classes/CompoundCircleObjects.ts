import { IPhysicsObject } from "../interfaces/IPhysicsObject";
import { Point2d } from "../../math2d/Point2d";
import { CompoundCircleCollider } from "./CompoundCircleCollider";
import { EventEmitter } from "../../game/EventEmitter";

export class CompoundCircleObject implements IPhysicsObject {
    
    // collisionEmitter: EventEmitter<string>;

    _angularPosition: number;
    get angularPosition(): number {
        return this._angularPosition;
    }
    set angularPosition(v: number) {
        this._angularPosition = v;
    }
    angularVelocity: number;
    

    private _position: Point2d;
    get position() : Point2d {
        return this._position;
    }
    set position(v: Point2d) {
        this.collider.setPosition(v);
        this._position = v;
    }

    velocity: Point2d;

    mass: number;
    momentOfInertia: number;

    collider: CompoundCircleCollider;

    applyImpulse(pos: Point2d, impulse: Point2d) {
        // Torque = F x r ==> need r and F (or at least )
        let r = pos.add(this.position.scale(-1));
        let angularImp = -impulse.crossProduct(r);

        this.angularVelocity += angularImp/this.momentOfInertia;

        this.velocity = this.velocity.add(impulse.scale(1/this.mass));
    }
}