import { IPhysicsObject } from "../interfaces/IPhysicsObject";
import { Point2d } from "../../../../shared/math2d/Point2d";
import { CompoundCircleCollider } from "./CompoundCircleCollider";
import { EventEmitter } from "../../game/EventEmitter";

export class CompoundCirclePhysicsObject implements IPhysicsObject {
    
    // collisionEmitter: EventEmitter<string>;

    _angularPosition: number = 0;
    get angularPosition(): number {
        return this._angularPosition;
    }
    set angularPosition(v: number) {
        if(Math.abs(this._angularPosition - v) > 0.001) {
            this.hasUpdate = true;
        }

        this.collider.setRotation(v);
        this._angularPosition = v;
        this.collider.updateCollider();
    }
    angularVelocity: number = 0;
    

    private _position: Point2d = new Point2d(0,0);
    get position() : Point2d {
        return this._position;
    }
    set position(v: Point2d) {
        if(this._position && !this._position.isEqual(v, 0.01)) {
            this.hasUpdate = true;
        }

        this.collider.setPosition(v);
        this._position = v;
        this.collider.updateCollider();
    }

    get heading(): Point2d {
        return new Point2d(Math.cos(this.angularPosition), Math.sin(this._angularPosition));
    }

    velocity: Point2d = new Point2d(0,0);

    mass: number = 1;
    momentOfInertia: number = 10;

    hasUpdate: boolean = false;

    collider: CompoundCircleCollider;

    applyImpulse(pos: Point2d, impulse: Point2d) {
        // Torque = F x r ==> need r and F (or at least )
        let r = pos.add(this.position.scale(-1));
        let angularImp = -impulse.crossProduct(r);
        
        this.angularVelocity += angularImp/this.momentOfInertia;
        
        this.velocity = this.velocity.add(impulse.scale(1/this.mass));

        if(impulse.getLength() > 0.01) {
            this.hasUpdate = true;
        }
    }
}