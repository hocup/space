import { ObjectType } from '../shared/ObjectType';
import { Point2d } from '../shared/math2d/Point2d';

export class ServerGameObject {
    id: string = "";
    type: ObjectType;

    position: Point2d = new Point2d(0,0);
    velocity: Point2d = new Point2d(0,0);

    angularPosition: number = 0;
    angularVelocity: number = 0;

    mass: number = 300;

    constructor(){}
}