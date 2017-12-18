import { GameObject } from "../game/GameObject";
import { Point2d } from "../../../shared/math2d/Point2d";
import { ViewTransform } from "./ViewTransform";
import { IPhysicsObject } from "../physics/interfaces/IPhysicsObject";
import { ICollider } from "../physics/interfaces/ICollider";
// import * as $ from 'jquery';

export class ViewManager implements IPhysicsObject{
    transform: ViewTransform = new ViewTransform();
    follow: GameObject;

    viewObjects: GameObject[] = [];


    position: Point2d = new Point2d(0,0);
    velocity: Point2d = new Point2d(0,0);
    angularPosition: number = 0;
    angularVelocity: number = 0;
    mass: number = 1;
    collider: ICollider;
    applyImpulse(pos: Point2d, impulse: Point2d){
        //TODO?
//        this.velocity.add

    }

    constructor(public containerId:string) {
        console.log(this.containerId);
    }

    
    draw() {
        
        this.viewObjects.map(
            (o) =>  {o.draw($("#" + this.containerId), this.transform)}
        );
    }

    step(dt:number) {

        // Do a spring towards the followed object
        let k = 0.00007;
        let d = 2* Math.sqrt(k*this.mass); //0.02;

        let force: Point2d = this.follow.physicsObject.position
	    .add(this.position.scale(-1)).scale(k*0.5).add(this.velocity.scale(-d));
        this.velocity = this.velocity.add(force.scale(dt/this.mass));
        this.position = this.position.add(this.velocity.scale(dt));
 
        // this.transform.position.x = this.follow.physicsObject.position.x;
        // this.transform.position.y = this.follow.physicsObject.position.y;

        this.transform.position.x = this.position.x;
        this.transform.position.y = this.position.y;

    }
}
