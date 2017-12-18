import { CompoundCircleGameObject } from "./CompoundCircleGameObject";
import { Point2d } from "../../../shared/math2d/Point2d";
import { InputState } from "./InputManager";
import { ObjectType } from "../../../shared/ObjectType";


export class PlayerShipObject extends CompoundCircleGameObject {
    objectType: ObjectType;
    private latestInput: InputState;

    private forwardThrust: number;
    private reverseThrust: number;
    private turnThrust: number;

    

    constructor() {
        let circles: {pos: Point2d, radius: number}[] = [];

        let radius: number = 6;

        for(let i = 0; i < 3; i++) {
            if(i > 0) {
                circles.push({pos: new Point2d(i * radius * 1.5, 0), radius: radius});
                circles.push({pos: new Point2d(-i * radius * 1.5, -2), radius: radius});
                circles.push({pos: new Point2d(-i * radius * 1.5, 2), radius: radius});
            } else {
                circles.push({pos: new Point2d(0,0), radius: radius});
            }
        }

        super(circles);

        this.forwardThrust = 1000;
        this.reverseThrust = -500;
        this.turnThrust = 2;
        this.objectType = ObjectType.PLAYER_SHIP_OBJECT;
    }

    step(dt:number) {
        if(this.latestInput) {
            // Handle input
            //TODO: Engines? Things of that nature?
            if(this.latestInput.state.playerForward) {
                // apply forward thrust
                this.physicsObject.applyImpulse(this.physicsObject.position, this.physicsObject.heading.scale(this.forwardThrust));
            }

            if(this.latestInput.state.playerBack) {
                this.physicsObject.applyImpulse(this.physicsObject.position, this.physicsObject.heading.scale(this.reverseThrust));
            }

            if(this.latestInput.state.playerTurnRight) {
                this.physicsObject.angularVelocity += this.turnThrust;
            }

            if(this.latestInput.state.playerTurnLeft) {
                this.physicsObject.angularVelocity -= this.turnThrust;
            }
        }
    }

    inputStateChanged(newInputState: InputState) {
        this.latestInput = newInputState;
    }
}